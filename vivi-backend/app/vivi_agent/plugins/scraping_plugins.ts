import type { PluginInit } from '../ViViAgentEnhanced';
import type { AgentContext } from '../ViViAgentEnhanced';

// Import scrapers
import BrightData from 'brightdata';
import Octoparse from 'octoparse-sdk';
import { chromium } from 'playwright';
import Apify from 'apify';

/**
 * BrightDataPlugin
 * Uses Bright Data’s residential proxy network to fetch dynamic page content at scale.
 */
export const BrightDataPlugin: PluginInit = (agent) => {
  agent.registerRule({
    id: 'scrape-01',
    name: 'Competitor Social Scrape (BrightData)',
    priority: 'medium',
    condition: async (ctx: AgentContext) => true,
    action: async (ctx: AgentContext) => {
      const proxy = new BrightData.ProxyClient({ token: process.env.BRIGHTDATA_TOKEN });
      const url = `https://www.facebook.com/search/people/?q=${ctx.persona.name}`;
      const html = await proxy.fetch(url);
      // parse competitor mentions, engagement metrics
      return { htmlSnippet: html.slice(0,200) };
    },
    autoExecuteThreshold: 0.9
  });
};

/**
 * OctoparsePlugin
 * Leverages Octoparse’s API to run pre-configured scraping flows for location-based data.
 */
export const OctoparsePlugin: PluginInit = (agent) => {
  agent.registerRule({
    id: 'scrape-02',
    name: 'Local Reviews Scrape (Octoparse)',
    priority: 'high',
    condition: async (ctx: AgentContext) => Boolean(ctx.geo.region),
    action: async (ctx: AgentContext) => {
      const client = new Octoparse.Client({ apiKey: process.env.OCTOPARSE_KEY });
      const taskId = 'local-reviews-task-id';
      const data = await client.runTask(taskId, { region: ctx.geo.region });
      return { reviewData: data.slice(0, 10) };
    },
    autoExecuteThreshold: 0.8
  });
};

/**
 * PlaywrightPlugin
 * Uses headless Chromium for custom JS-heavy page scraping and interaction.
 */
export const PlaywrightPlugin: PluginInit = (agent) => {
  agent.registerRule({
    id: 'scrape-03',
    name: 'Dynamic Content Scrape (Playwright)',
    priority: 'low',
    condition: async () => true,
    action: async (ctx: AgentContext) => {
      const browser = await chromium.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(`https://twitter.com/search?q=${encodeURIComponent(ctx.persona.industry)}`);
      const tweets = await page.$$eval('article', els => els.map(el => el.textContent).slice(0,5));
      await browser.close();
      return { tweets };
    },
    autoExecuteThreshold: 1.0
  });
};

/**
 * ApifyPlugin
 * Orchestrates actor runs on Apify platform for bespoke scraping workflows.
 */
export const ApifyPlugin: PluginInit = (agent) => {
  agent.registerRule({
    id: 'scrape-04',
    name: 'Custom Actor Scrape (Apify)',
    priority: 'medium',
    condition: async () => true,
    action: async (ctx: AgentContext) => {
      const run = await Apify.call('rmsj14/custom-actor', { query: ctx.persona.industry, location: ctx.geo.region });
      return { actorResults: run.outputData.slice(0,5) };
    },
    autoExecuteThreshold: 0.7
  });
};

/**
 * Helper to load all scraping plugins in one go
 */
export function loadScrapingPlugins(agent: any) {
  agent.loadPlugins(
    BrightDataPlugin,
    OctoparsePlugin,
    PlaywrightPlugin,
    ApifyPlugin
  );
}
