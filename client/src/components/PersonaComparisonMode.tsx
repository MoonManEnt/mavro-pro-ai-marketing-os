import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, TrendingUp, DollarSign, Target, Eye, X, ArrowRight } from 'lucide-react';

interface PersonaComparisonModeProps {
  currentPersona: string;
  isVisible: boolean;
  onClose: () => void;
}

interface PersonaMetrics {
  persona: string;
  name: string;
  industry: string;
  avatar: string;
  metrics: {
    engagement: number;
    followers: number;
    revenue: string;
    leads: number;
    growth: string;
  };
  topPerformingContent: string[];
  strengths: string[];
  opportunities: string[];
}

export default function PersonaComparisonMode({ currentPersona, isVisible, onClose }: PersonaComparisonModeProps) {
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>([currentPersona]);
  const [comparisonMode, setComparisonMode] = useState<'metrics' | 'content' | 'strategies'>('metrics');

  const personaData: Record<string, PersonaMetrics> = {
    kemar: {
      persona: 'kemar',
      name: 'Kemar Hinds',
      industry: 'Professional Speaking',
      avatar: 'KH',
      metrics: {
        engagement: 87,
        followers: 12400,
        revenue: '$285K',
        leads: 234,
        growth: '+23%'
      },
      topPerformingContent: [
        'Leadership in Crisis Times',
        'Executive Presence Mastery',
        'Team Building Strategies'
      ],
      strengths: [
        'High-value speaking engagements',
        'Strong LinkedIn presence',
        'Expert thought leadership'
      ],
      opportunities: [
        'Expand to corporate training',
        'Develop online courses',
        'Build email newsletter'
      ]
    },
    karen: {
      persona: 'karen',
      name: 'Karen Thompson',
      industry: 'Real Estate',
      avatar: 'KT',
      metrics: {
        engagement: 92,
        followers: 8900,
        revenue: '$1.2M',
        leads: 89,
        growth: '+31%'
      },
      topPerformingContent: [
        'Luxury Home Tours',
        'Market Analysis Reports',
        'Investment Opportunities'
      ],
      strengths: [
        'High-value transactions',
        'Luxury market expertise',
        'Strong client relationships'
      ],
      opportunities: [
        'Expand to commercial properties',
        'Develop investor network',
        'Create market reports'
      ]
    },
    sarah: {
      persona: 'sarah',
      name: 'Sarah Martinez',
      industry: 'MedSpa',
      avatar: 'SM',
      metrics: {
        engagement: 88,
        followers: 15600,
        revenue: '$456K',
        leads: 456,
        growth: '+26%'
      },
      topPerformingContent: [
        'Before/After Transformations',
        'Skincare Tips & Routines',
        'Treatment Explanations'
      ],
      strengths: [
        'Visual content performance',
        'Client testimonials',
        'Treatment expertise'
      ],
      opportunities: [
        'Expand service offerings',
        'Develop skincare line',
        'Partner with influencers'
      ]
    },
    marco: {
      persona: 'marco',
      name: 'Marco Romano',
      industry: 'Restaurant',
      avatar: 'MR',
      metrics: {
        engagement: 91,
        followers: 6700,
        revenue: '$234K',
        leads: 178,
        growth: '+33%'
      },
      topPerformingContent: [
        'Authentic Italian Recipes',
        'Behind-the-Kitchen Stories',
        'Food Preparation Videos'
      ],
      strengths: [
        'Authentic storytelling',
        'Visual food content',
        'Local community engagement'
      ],
      opportunities: [
        'Expand catering services',
        'Develop cooking classes',
        'Create recipe cookbook'
      ]
    },
    alex: {
      persona: 'alex',
      name: 'Alex Chen',
      industry: 'Fitness Coaching',
      avatar: 'AC',
      metrics: {
        engagement: 93,
        followers: 18900,
        revenue: '$167K',
        leads: 567,
        growth: '+31%'
      },
      topPerformingContent: [
        'Transformation Stories',
        'Workout Demonstrations',
        'Nutrition Guidelines'
      ],
      strengths: [
        'High engagement rates',
        'Motivational content',
        'Community building'
      ],
      opportunities: [
        'Develop fitness app',
        'Create nutrition plans',
        'Partner with gyms'
      ]
    },
    david: {
      persona: 'david',
      name: 'David Wilson',
      industry: 'Auto Sales',
      avatar: 'DW',
      metrics: {
        engagement: 85,
        followers: 9800,
        revenue: '$567K',
        leads: 123,
        growth: '+27%'
      },
      topPerformingContent: [
        'Vehicle Showcases',
        'Buying Tips & Guides',
        'Customer Success Stories'
      ],
      strengths: [
        'High-value sales',
        'Customer testimonials',
        'Product expertise'
      ],
      opportunities: [
        'Expand to luxury vehicles',
        'Develop financing options',
        'Create buying guides'
      ]
    }
  };

  const handlePersonaToggle = (persona: string) => {
    setSelectedPersonas(prev => 
      prev.includes(persona) 
        ? prev.filter(p => p !== persona)
        : [...prev, persona].slice(0, 3) // Max 3 personas
    );
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'engagement': return TrendingUp;
      case 'followers': return Users;
      case 'revenue': return DollarSign;
      case 'leads': return Target;
      default: return Eye;
    }
  };

  const getIndustryColor = (industry: string) => {
    const colors = {
      'Professional Speaking': 'purple',
      'Real Estate': 'blue',
      'MedSpa': 'pink',
      'Restaurant': 'orange',
      'Fitness Coaching': 'green',
      'Auto Sales': 'red'
    };
    return colors[industry as keyof typeof colors] || 'gray';
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Persona Comparison</h2>
                <p className="text-purple-100 mt-1">Compare performance across different business personas</p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-purple-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Persona Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Personas to Compare (Max 3)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.values(personaData).map((persona) => (
                  <button
                    key={persona.persona}
                    onClick={() => handlePersonaToggle(persona.persona)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedPersonas.includes(persona.persona)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full bg-${getIndustryColor(persona.industry)}-500 flex items-center justify-center text-white font-bold`}>
                        {persona.avatar}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{persona.name}</p>
                        <p className="text-sm text-gray-600">{persona.industry}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Comparison Mode Tabs */}
            <div className="mb-6">
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                {[
                  { id: 'metrics', label: 'Metrics' },
                  { id: 'content', label: 'Content' },
                  { id: 'strategies', label: 'Strategies' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setComparisonMode(tab.id as any)}
                    className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                      comparisonMode === tab.id
                        ? 'bg-white text-purple-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Comparison Content */}
            <div className="max-h-96 overflow-y-auto">
              {comparisonMode === 'metrics' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedPersonas.map((personaKey) => {
                    const persona = personaData[personaKey];
                    return (
                      <div key={personaKey} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`w-10 h-10 rounded-full bg-${getIndustryColor(persona.industry)}-500 flex items-center justify-center text-white font-bold`}>
                            {persona.avatar}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{persona.name}</h4>
                            <p className="text-sm text-gray-600">{persona.industry}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {Object.entries(persona.metrics).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {React.createElement(getMetricIcon(key), {
                                  className: 'w-4 h-4 text-gray-500'
                                })}
                                <span className="text-sm text-gray-600 capitalize">{key}</span>
                              </div>
                              <span className="font-semibold text-gray-900">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {comparisonMode === 'content' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedPersonas.map((personaKey) => {
                    const persona = personaData[personaKey];
                    return (
                      <div key={personaKey} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`w-10 h-10 rounded-full bg-${getIndustryColor(persona.industry)}-500 flex items-center justify-center text-white font-bold`}>
                            {persona.avatar}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{persona.name}</h4>
                            <p className="text-sm text-gray-600">Top Performing Content</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {persona.topPerformingContent.map((content, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              <span className="text-sm text-gray-700">{content}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {comparisonMode === 'strategies' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedPersonas.map((personaKey) => {
                    const persona = personaData[personaKey];
                    return (
                      <div key={personaKey} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`w-10 h-10 rounded-full bg-${getIndustryColor(persona.industry)}-500 flex items-center justify-center text-white font-bold`}>
                            {persona.avatar}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{persona.name}</h4>
                            <p className="text-sm text-gray-600">Growth Strategies</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h5 className="text-sm font-medium text-green-600 mb-2">Strengths</h5>
                            <div className="space-y-1">
                              {persona.strengths.map((strength, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                  <span className="text-xs text-gray-700">{strength}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-orange-600 mb-2">Opportunities</h5>
                            <div className="space-y-1">
                              {persona.opportunities.map((opportunity, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                                  <span className="text-xs text-gray-700">{opportunity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Comparing {selectedPersonas.length} persona{selectedPersonas.length !== 1 ? 's' : ''}
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Close
                </button>
                <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2">
                  <span>Generate Report</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}