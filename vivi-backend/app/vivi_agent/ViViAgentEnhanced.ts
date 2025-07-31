import { EventEmitter } from 'events';
import type { OpenAI } from 'openai';
import NodeCache from 'node-cache';
import pino from 'pino';

// ——————————————————————————————————————————
// Core Interfaces & Types
// ——————————————————————————————————————————
export interface PersonaContext {
  id: string;
  name: string;
  industry: string;
  toneProfile?: Record<string, any>;
}

export interface GeoContext {
  country?: string;
  region?: string;
  events?: Array<{ name: string; date: string }>;
}

export interface MetricsContext {
  engagement: number;
  previousEngagement?: number;
  optimalPostingTimes?: number[];
  sentimentScore?: number;
  competitorMetrics?: Record<string, any>;
}

export type Trend = { topic: string; relevance: number };

export interface Review {
  id: string;
  isNew: boolean;
  sentiment: number;
  content: string;
}

export interface ViViConfig {
  openaiClient: OpenAI;
  cacheTTL?: number;          // seconds
  autonomyLevel?: number;     // 0.0–1.0
}

// Decision yielded by the agent
export interface Decision {
  id: string;
  ruleId: string;
  action: string;
  confidence: number;
  autoExecuted: boolean;
  timestamp: string;
  payload: any;
  rationale?: string;        // For explainability
}

// ——————————————————————————————————————————
// Rule Engine Types & Plugins
// ——————————————————————————————————————————
export interface Rule {
  id: string;
  name: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  condition: (ctx: AgentContext) => Promise<boolean>;
  action: (ctx: AgentContext) => Promise<any>;
  autoExecuteThreshold?: number;
}

type PluginInit = (agent: ViViAgent) => Promise<void> | void;

// Core and advanced plugins
import { TrendTapPlugin, GeoSmartPlugin, PerformancePlugin, ReviewPlugin, SchedulePlugin, SentimentPlugin, CompetitorPlugin, ABTestingPlugin } from './plugins';
import { SelfLearningPluginEnhanced } from './plugins/SelfLearningPluginEnhanced';

// ——————————————————————————————————————————
// Agent Context
// ——————————————————————————————————————————
export class AgentContext {
  persona!: PersonaContext;
  geo!: GeoContext;
  metrics!: MetricsContext;
  trends: Trend[] = [];
  reviews: Review[] = [];

  private cache = new NodeCache();

  getCached<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }
  setCache<T>(key: string, val: T, ttl?: number) {
    this.cache.set(key, val, ttl);
  }
}

// ——————————————————————————————————————————
// Main Agent
// ——————————————————————————————————————————
export class ViViAgent extends EventEmitter {
  private config: ViViConfig;
  private logger = pino({ name: 'ViViAgent', level: 'info' });
  private context = new AgentContext();
  private rules: Rule[] = [];
  private decisionHistory: Decision[] = [];

  constructor(config: ViViConfig) {
    super();
    this.config = { cacheTTL: 300, autonomyLevel: 0.7, ...config };
  }

  /** Load all feature plugins */
  async loadPlugins(...plugins: PluginInit[]) {
    for (const init of plugins) {
      try {
        await init(this);
        this.logger.info(`Plugin loaded: ${init.name}`);
      } catch (err: any) {
        this.logger.warn(`Plugin ${init.name} failed: ${err.message}`);
      }
    }
  }

  /** Register a rule in the engine */
  registerRule(rule: Rule) {
    this.rules.push(rule);
    this.rules.sort((a, b) => {
      const weight = { critical: 4, high: 3, medium: 2, low: 1 };
      return weight[b.priority] - weight[a.priority];
    });
    this.logger.debug(`Rule registered: ${rule.name}`);
  }

  /** Bulk context setter */
  setContext(ctx: Partial<AgentContext>) {
    Object.assign(this.context, ctx);
    this.logger.debug('Context updated', ctx);
  }

  /** Core execution cycle */
  async runCycle(): Promise<Decision[]> {
    const results: Decision[] = [];
    for (const rule of this.rules) {
      let ok = false;
      try {
        ok = await rule.condition(this.context);
      } catch (err: any) {
        this.logger.error({ err }, `Condition error: ${rule.name}`);
      }
      if (!ok) continue;

      const confidence = this.getConfidence(rule.priority);
      const autoEx = confidence >= (rule.autoExecuteThreshold ?? this.config.autonomyLevel!);
      const decision: Decision = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
        ruleId: rule.id,
        action: rule.name,
        confidence,
        autoExecuted: autoEx,
        timestamp: new Date().toISOString(),
        payload: {}
      };

      if (autoEx) {
        try {
          decision.payload = await rule.action(this.context);
        } catch (err: any) {
          this.logger.error({ err }, `Action error: ${rule.name}`);
          decision.payload = { error: err.message };
        }
      }

      this.decisionHistory.push(decision);
      this.emit('decision', decision);
      results.push(decision);
    }
    return results;
  }

  /** Caching wrapper for OpenAI calls */
  async callOpenAI(prompt: string, opts?: any): Promise<string> {
    const key = `openai:${prompt}`;
    const cached = this.context.getCached<string>(key);
    if (cached) return cached;
    const resp = await this.config.openaiClient.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: prompt }],
      ...opts
    });
    const text = resp.choices?.[0]?.message?.content || '';
    this.context.setCache(key, text, this.config.cacheTTL);
    return text;
  }

  /** Confidence mapping */
  private getConfidence(prio: Rule['priority']): number {
    return { critical: 0.9, high: 0.75, medium: 0.5, low: 0.3 }[prio];
  }

  getHistory(): readonly Decision[] { return this.decisionHistory; }
  getContext(): Readonly<AgentContext> { return this.context; }
}

// ——————————————————————————————————————————
// Factory to spin up the full-featured ViVi agent
// ——————————————————————————————————————————
export async function createDefaultViViAgent(config: ViViConfig): Promise<ViViAgent> {
  const agent = new ViViAgent(config);
  await agent.loadPlugins(
    TrendTapPlugin,
    GeoSmartPlugin,
    PerformancePlugin,
    ReviewPlugin,
    SchedulePlugin,
    SentimentPlugin,
    CompetitorPlugin,
    ABTestingPlugin,
    SelfLearningPluginEnhanced
  );
  return agent;
}
