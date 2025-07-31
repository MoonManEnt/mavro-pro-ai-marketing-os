import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Brain, Zap, TrendingUp, Target, Shield, Sparkles, Download, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface ViViAgent {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  isActive: boolean;
  isPremium: boolean;
  capabilities: string[];
  price: string;
}

const ViViAgentStore: React.FC = () => {
  const [agents, setAgents] = useState<ViViAgent[]>([
    {
      id: 'content-wizard',
      name: 'Content Wizard',
      description: 'Generate high-converting content across all platforms with AI-powered creativity',
      category: 'Content Creation',
      icon: Sparkles,
      isActive: true,
      isPremium: false,
      capabilities: ['Social Media Posts', 'Email Campaigns', 'Ad Copy', 'Video Scripts'],
      price: 'Free'
    },
    {
      id: 'trend-scout',
      name: 'Trend Scout',
      description: 'Monitor and analyze trending topics in your industry for maximum engagement',
      category: 'Analytics',
      icon: TrendingUp,
      isActive: true,
      isPremium: false,
      capabilities: ['Trend Analysis', 'Industry Insights', 'Competitor Monitoring', 'Opportunity Alerts'],
      price: 'Free'
    },
    {
      id: 'performance-optimizer',
      name: 'Performance Optimizer',
      description: 'Automatically optimize campaigns for maximum ROI and conversion rates',
      category: 'Optimization',
      icon: Target,
      isActive: false,
      isPremium: true,
      capabilities: ['Auto-Optimization', 'A/B Testing', 'Budget Management', 'Performance Alerts'],
      price: '$29/month'
    },
    {
      id: 'lead-magnet',
      name: 'Lead Magnet',
      description: 'Advanced lead scoring and nurturing with predictive analytics',
      category: 'Lead Generation',
      icon: Zap,
      isActive: false,
      isPremium: true,
      capabilities: ['Lead Scoring', 'Automated Nurturing', 'Conversion Prediction', 'CRM Integration'],
      price: '$49/month'
    },
    {
      id: 'brand-guardian',
      name: 'Brand Guardian',
      description: 'Protect and enhance your brand reputation across all digital channels',
      category: 'Brand Management',
      icon: Shield,
      isActive: false,
      isPremium: true,
      capabilities: ['Reputation Monitoring', 'Crisis Management', 'Brand Consistency', 'Sentiment Analysis'],
      price: '$39/month'
    },
    {
      id: 'ai-strategist',
      name: 'AI Strategist',
      description: 'Strategic planning and market analysis with advanced AI insights',
      category: 'Strategy',
      icon: Brain,
      isActive: false,
      isPremium: true,
      capabilities: ['Market Analysis', 'Strategic Planning', 'Competitive Intelligence', 'Growth Forecasting'],
      price: '$99/month'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Content Creation', 'Analytics', 'Optimization', 'Lead Generation', 'Brand Management', 'Strategy'];

  const toggleAgent = (agentId: string) => {
    setAgents(prev => 
      prev.map(agent => 
        agent.id === agentId ? { ...agent, isActive: !agent.isActive } : agent
      )
    );
  };

  const filteredAgents = agents.filter(agent => 
    selectedCategory === 'all' || agent.category === selectedCategory
  );

  const activeAgents = agents.filter(agent => agent.isActive);

  return (
    <Card className="vivi-agent-store glass-card border-white/20 bg-white/10">
      <CardHeader>
        <CardTitle className="text-white font-semibold flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center theme-bg-primary mr-2">
              <Brain className="w-4 h-4 text-white" />
            </div>
            ViVi Agent Store
          </div>
          <Badge variant="outline" className="text-mint-green border-mint-green/30 bg-mint-green/10">
            {activeAgents.length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "category-btn-active"
                  : "category-btn-inactive hover:bg-white/10"
              }
            >
              {category === 'all' ? 'All Agents' : category}
            </Button>
          ))}
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white/10 rounded-lg p-4 border transition-all hover:bg-white/15 ${
                agent.isActive ? 'border-mint-green/50' : 'border-white/20'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center theme-bg-primary">
                  <agent.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-medium text-sm">{agent.name}</h3>
                    <div className="flex items-center space-x-2">
                      {agent.isPremium && (
                        <Badge variant="outline" className="text-golden-yellow border-golden-yellow/30 bg-golden-yellow/10 text-xs">
                          Pro
                        </Badge>
                      )}
                      <Switch
                        checked={agent.isActive}
                        onCheckedChange={() => toggleAgent(agent.id)}
                        disabled={agent.isPremium && !agent.isActive}
                      />
                    </div>
                  </div>
                  <p className="text-white/70 text-xs mb-2 leading-relaxed">
                    {agent.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {agent.capabilities.slice(0, 2).map((capability) => (
                      <Badge
                        key={capability}
                        variant="outline"
                        className="text-sky-blue border-sky-blue/30 bg-sky-blue/10 text-xs"
                      >
                        {capability}
                      </Badge>
                    ))}
                    {agent.capabilities.length > 2 && (
                      <Badge
                        variant="outline"
                        className="text-white/60 border-white/30 bg-white/10 text-xs"
                      >
                        +{agent.capabilities.length - 2} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm font-medium">{agent.price}</span>
                    {agent.isPremium && !agent.isActive ? (
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-sunset-orange to-golden-yellow hover:from-sunset-orange/80 hover:to-golden-yellow/80 text-white text-xs"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Upgrade
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white/60 hover:text-white hover:bg-white/10 text-xs"
                      >
                        <Settings className="w-3 h-3 mr-1" />
                        Configure
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Active Agents Summary */}
        {activeAgents.length > 0 && (
          <div className="bg-white/10 rounded-lg p-4 border border-mint-green/30">
            <h3 className="text-white font-medium mb-2 flex items-center">
              <div className="w-6 h-6 rounded-full flex items-center justify-center theme-bg-primary mr-2">
                <Zap className="w-3 h-3 text-white" />
              </div>
              Active Agents
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {activeAgents.map((agent) => (
                <div key={agent.id} className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center theme-bg-primary">
                    <agent.icon className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white/80 text-sm">{agent.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ViViAgentStore;
