from typing import Dict, List, Any, Optional
from datetime import datetime
import json
from loguru import logger
from openai import OpenAI
from pydantic import BaseModel
import asyncio
from ..models import PersonaContext, GeoContext, MetricsContext

class Trend(BaseModel):
    topic: str
    relevance: float

class Review(BaseModel):
    id: str
    is_new: bool
    sentiment: float
    content: str

class Decision(BaseModel):
    id: str
    rule_id: str
    action: str
    confidence: float
    auto_executed: bool
    timestamp: str
    payload: Dict[str, Any]
    rationale: Optional[str] = None

class Rule(BaseModel):
    id: str
    name: str
    priority: str  # 'critical', 'high', 'medium', 'low'
    auto_execute_threshold: Optional[float] = None

class AgentContext:
    def __init__(self):
        self.persona: Optional[PersonaContext] = None
        self.geo: Optional[GeoContext] = None
        self.metrics: Optional[MetricsContext] = None
        self.trends: List[Trend] = []
        self.reviews: List[Review] = []
        self._cache: Dict[str, Any] = {}

    def get_cached(self, key: str) -> Any:
        return self._cache.get(key)

    def set_cache(self, key: str, value: Any, ttl: Optional[int] = None):
        self._cache[key] = value

class ViViAgent:
    def __init__(self, openai_client: OpenAI, autonomy_level: float = 0.7):
        self.openai_client = openai_client
        self.autonomy_level = autonomy_level
        self.context = AgentContext()
        self.rules: List[Dict[str, Any]] = []
        self.decision_history: List[Decision] = []
        
        self._load_default_plugins()

    def _load_default_plugins(self):
        """Load default ViVi agent plugins"""
        self.register_rule({
            'id': 'seo-01',
            'name': 'Local SEO Audit',
            'priority': 'high',
            'condition': self._seo_condition,
            'action': self._seo_action,
            'auto_execute_threshold': 0.9
        })
        
        self.register_rule({
            'id': 'scrape-01',
            'name': 'Social Media Analysis',
            'priority': 'medium',
            'condition': self._scraping_condition,
            'action': self._scraping_action,
            'auto_execute_threshold': 0.8
        })
        
        self.register_rule({
            'id': 'content-01',
            'name': 'Content Recommendations',
            'priority': 'medium',
            'condition': self._content_condition,
            'action': self._content_action,
            'auto_execute_threshold': 0.7
        })

    def register_rule(self, rule: Dict[str, Any]):
        """Register a new rule with the agent"""
        self.rules.append(rule)
        priority_weights = {'critical': 4, 'high': 3, 'medium': 2, 'low': 1}
        self.rules.sort(key=lambda r: priority_weights.get(r['priority'], 0), reverse=True)
        logger.debug(f"Rule registered: {rule['name']}")

    def set_context(self, persona: PersonaContext, geo: GeoContext, metrics: MetricsContext):
        """Set the agent context"""
        self.context.persona = persona
        self.context.geo = geo
        self.context.metrics = metrics
        logger.debug("Context updated")

    async def run_cycle(self) -> List[Decision]:
        """Execute a complete agent cycle"""
        results = []
        
        for rule in self.rules:
            try:
                if not await rule['condition']():
                    continue
                
                confidence = self._get_confidence(rule['priority'])
                auto_execute = confidence >= rule.get('auto_execute_threshold', self.autonomy_level)
                
                decision = Decision(
                    id=f"{int(datetime.now().timestamp())}-{rule['id']}",
                    rule_id=rule['id'],
                    action=rule['name'],
                    confidence=confidence,
                    auto_executed=auto_execute,
                    timestamp=datetime.now().isoformat(),
                    payload={}
                )
                
                if auto_execute:
                    try:
                        decision.payload = await rule['action']()
                    except Exception as e:
                        logger.error(f"Action error for {rule['name']}: {str(e)}")
                        decision.payload = {'error': str(e)}
                
                self.decision_history.append(decision)
                results.append(decision)
                
            except Exception as e:
                logger.error(f"Rule execution error for {rule['name']}: {str(e)}")
        
        return results

    async def call_openai(self, prompt: str, **kwargs) -> str:
        """Make OpenAI API call with caching"""
        cache_key = f"openai:{hash(prompt)}"
        cached = self.context.get_cached(cache_key)
        if cached:
            return cached
        
        try:
            response = await asyncio.to_thread(
                self.openai_client.chat.completions.create,
                model='gpt-4o-mini',
                messages=[{'role': 'system', 'content': prompt}],
                **kwargs
            )
            text = response.choices[0].message.content or ''
            self.context.set_cache(cache_key, text, 300)  # 5 min cache
            return text
        except Exception as e:
            logger.error(f"OpenAI API error: {str(e)}")
            return f"Error: {str(e)}"

    def _get_confidence(self, priority: str) -> float:
        """Map priority to confidence score"""
        return {'critical': 0.9, 'high': 0.75, 'medium': 0.5, 'low': 0.3}.get(priority, 0.5)

    async def _seo_condition(self) -> bool:
        return bool(self.context.geo and self.context.geo.region)

    async def _scraping_condition(self) -> bool:
        return bool(self.context.persona and self.context.persona.industry)

    async def _content_condition(self) -> bool:
        return bool(self.context.persona and self.context.metrics)

    async def _seo_action(self) -> Dict[str, Any]:
        """Perform SEO analysis"""
        if not self.context.persona or not self.context.geo:
            return {'error': 'Missing context for SEO analysis'}
        
        prompt = f"""
        Analyze local SEO opportunities for a {self.context.persona.industry} business 
        named {self.context.persona.name} in {self.context.geo.region}.
        
        Provide specific recommendations for:
        1. Local keyword optimization
        2. Google My Business improvements
        3. Local citation opportunities
        4. Competitor analysis insights
        
        Format as JSON with recommendations array.
        """
        
        analysis = await self.call_openai(prompt)
        
        current_ranks = {
            self.context.persona.name: 5,
            'Competitor A': 2,
            'Competitor B': 4,
            'Competitor C': 1
        }
        
        return {
            'analysis': analysis,
            'current_ranks': current_ranks,
            'recommendations': [
                'Focus on primary category keywords',
                'Generate more customer reviews',
                'Optimize Google My Business listing'
            ]
        }

    async def _scraping_action(self) -> Dict[str, Any]:
        """Perform social media and web scraping analysis"""
        if not self.context.persona:
            return {'error': 'Missing persona context'}
        
        prompt = f"""
        Analyze social media trends and competitor activity for the {self.context.persona.industry} industry.
        Focus on content themes, engagement patterns, and market opportunities.
        
        Provide insights on:
        1. Trending topics in the industry
        2. Competitor content strategies
        3. Engagement optimization opportunities
        4. Market gaps to exploit
        
        Format as JSON with actionable insights.
        """
        
        analysis = await self.call_openai(prompt)
        
        return {
            'analysis': analysis,
            'trending_topics': [
                {'topic': 'sustainability', 'relevance': 0.8},
                {'topic': 'digital transformation', 'relevance': 0.7},
                {'topic': 'customer experience', 'relevance': 0.9}
            ],
            'competitor_insights': {
                'avg_engagement': 0.05,
                'posting_frequency': '2-3 times per week',
                'top_content_types': ['educational', 'behind-the-scenes', 'customer stories']
            }
        }

    async def _content_action(self) -> Dict[str, Any]:
        """Generate content recommendations"""
        if not self.context.persona or not self.context.metrics:
            return {'error': 'Missing context for content generation'}
        
        prompt = f"""
        Generate content recommendations for {self.context.persona.name}, 
        a {self.context.persona.industry} business.
        
        Current engagement: {self.context.metrics.engagement}
        
        Provide:
        1. 3 blog post ideas with titles and outlines
        2. 5 social media post concepts
        3. Email marketing subject lines
        4. Content calendar suggestions
        
        Format as JSON with structured recommendations.
        """
        
        recommendations = await self.call_openai(prompt)
        
        return {
            'recommendations': recommendations,
            'optimal_posting_times': [9, 12, 17, 19],  # Mock data
            'content_performance_prediction': 0.75
        }

    def get_history(self) -> List[Decision]:
        """Get decision history"""
        return self.decision_history

    def get_context(self) -> AgentContext:
        """Get current context"""
        return self.context
