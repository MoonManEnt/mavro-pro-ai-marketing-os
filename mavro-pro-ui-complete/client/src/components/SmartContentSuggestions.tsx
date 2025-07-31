import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, TrendingUp, Target, MessageSquare, Hash, Clock, Users, BarChart3 } from 'lucide-react';

interface SmartContentSuggestionsProps {
  currentPersona: string;
  currentView: string;
  selectedPlatforms: string[];
  onSuggestionSelect: (suggestion: ContentSuggestion) => void;
}

interface ContentSuggestion {
  id: string;
  type: 'trending' | 'evergreen' | 'engagement' | 'conversion';
  title: string;
  content: string;
  hashtags: string[];
  platform: string;
  engagement: string;
  timeToPost: string;
  rationale: string;
  icon: React.ElementType;
  color: string;
}

export default function SmartContentSuggestions({
  currentPersona,
  currentView,
  selectedPlatforms,
  onSuggestionSelect
}: SmartContentSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const generatePersonaSuggestions = (): ContentSuggestion[] => {
    const suggestionsByPersona = {
      kemar: [
        {
          id: '1',
          type: 'trending' as const,
          title: 'Leadership in 2025',
          content: 'The future of leadership isn\'t about having all the answers—it\'s about asking the right questions. What question changed your perspective today?',
          hashtags: ['#leadership', '#futureofwork', '#growth', '#mindset'],
          platform: 'LinkedIn',
          engagement: '87%',
          timeToPost: '9:00 AM',
          rationale: 'Leadership content performs 3x better on LinkedIn mornings',
          icon: TrendingUp,
          color: 'purple'
        },
        {
          id: '2',
          type: 'engagement' as const,
          title: 'Speaking Success Story',
          content: 'Just wrapped an incredible keynote for 500 executives. The standing ovation wasn\'t for perfect slides—it was for authentic connection.',
          hashtags: ['#publicspeaking', '#keynote', '#success', '#authentic'],
          platform: 'Instagram',
          engagement: '92%',
          timeToPost: '7:30 PM',
          rationale: 'Success stories drive 40% more engagement in evenings',
          icon: Target,
          color: 'blue'
        },
        {
          id: '3',
          type: 'conversion' as const,
          title: 'Booking Q2 Speaking',
          content: 'Q2 speaking calendar is filling up fast! If you\'re planning a leadership retreat or corporate event, let\'s connect.',
          hashtags: ['#corporatetraining', '#leadership', '#booking', '#events'],
          platform: 'Twitter',
          engagement: '76%',
          timeToPost: '11:00 AM',
          rationale: 'Business development posts convert best mid-morning',
          icon: MessageSquare,
          color: 'green'
        }
      ],
      karen: [
        {
          id: '4',
          type: 'trending' as const,
          title: 'Luxury Market Trends',
          content: 'High-end buyers are prioritizing smart home features and sustainable luxury. Are you showcasing these in your listings?',
          hashtags: ['#luxuryrealestate', '#smarthome', '#sustainability', '#trends'],
          platform: 'LinkedIn',
          engagement: '89%',
          timeToPost: '8:00 AM',
          rationale: 'Real estate professionals are most active early morning',
          icon: TrendingUp,
          color: 'blue'
        },
        {
          id: '5',
          type: 'engagement' as const,
          title: 'Million Dollar Listing',
          content: 'JUST SOLD: This $2.3M waterfront estate in 14 days! The secret? Understanding what luxury buyers truly value.',
          hashtags: ['#justsold', '#luxuryrealestate', '#waterfront', '#success'],
          platform: 'Instagram',
          engagement: '94%',
          timeToPost: '6:00 PM',
          rationale: 'Property showcases perform best during evening scroll time',
          icon: Target,
          color: 'gold'
        },
        {
          id: '6',
          type: 'conversion' as const,
          title: 'Free Market Analysis',
          content: 'Thinking of selling? I\'m offering complimentary market analyses this week. DM me your address!',
          hashtags: ['#marketanalysis', '#realestate', '#freevaluation', '#selling'],
          platform: 'Facebook',
          engagement: '78%',
          timeToPost: '2:00 PM',
          rationale: 'Lead generation posts convert best mid-afternoon',
          icon: MessageSquare,
          color: 'blue'
        }
      ],
      sarah: [
        {
          id: '7',
          type: 'trending' as const,
          title: 'Anti-Aging Breakthrough',
          content: 'New peptide therapy is revolutionizing skincare. 94% of clients see visible results in 3 weeks. Science meets beauty.',
          hashtags: ['#antiaging', '#peptides', '#skincare', '#medspa'],
          platform: 'Instagram',
          engagement: '91%',
          timeToPost: '7:00 PM',
          rationale: 'Beauty content peaks during evening self-care hours',
          icon: TrendingUp,
          color: 'pink'
        },
        {
          id: '8',
          type: 'engagement' as const,
          title: 'Transformation Tuesday',
          content: 'Sarah, 45, after 3 months of our signature facial program. "I feel like myself again, but better." This is why we do what we do.',
          hashtags: ['#transformation', '#beforeandafter', '#confidence', '#glowup'],
          platform: 'Instagram',
          engagement: '96%',
          timeToPost: '12:00 PM',
          rationale: 'Transformation content performs best at lunch break',
          icon: Target,
          color: 'purple'
        },
        {
          id: '9',
          type: 'conversion' as const,
          title: 'Spring Refresh Package',
          content: 'Ready for spring? Book our "Fresh Start" package this week and save 25%. Limited spots available.',
          hashtags: ['#springrefresh', '#medspa', '#promotion', '#booking'],
          platform: 'Facebook',
          engagement: '82%',
          timeToPost: '3:00 PM',
          rationale: 'Promotional posts drive bookings in mid-afternoon',
          icon: MessageSquare,
          color: 'green'
        }
      ],
      marco: [
        {
          id: '10',
          type: 'trending' as const,
          title: 'Authentic Italian Cuisine',
          content: 'Real Italian food isn\'t about complicated recipes—it\'s about respect for ingredients. Tonight\'s special: simple, perfect, nonna-approved.',
          hashtags: ['#authentic', '#italian', '#nonna', '#simplicity'],
          platform: 'Instagram',
          engagement: '88%',
          timeToPost: '5:30 PM',
          rationale: 'Food content performs best during dinner planning hours',
          icon: TrendingUp,
          color: 'orange'
        },
        {
          id: '11',
          type: 'engagement' as const,
          title: 'Behind the Kitchen',
          content: 'Watch me hand-roll 200 pieces of gnocchi for tonight\'s service. This is passion. This is tradition. This is amore.',
          hashtags: ['#handmade', '#gnocchi', '#passion', '#tradition'],
          platform: 'TikTok',
          engagement: '93%',
          timeToPost: '2:00 PM',
          rationale: 'Behind-the-scenes content drives engagement afternoons',
          icon: Target,
          color: 'red'
        },
        {
          id: '12',
          type: 'conversion' as const,
          title: 'Private Dining Experience',
          content: 'Experience true Italian hospitality. Private dining for 2-12 guests. Reserve your table for an unforgettable evening.',
          hashtags: ['#privatedining', '#italian', '#experience', '#reservation'],
          platform: 'Facebook',
          engagement: '79%',
          timeToPost: '4:00 PM',
          rationale: 'Restaurant bookings convert best late afternoon',
          icon: MessageSquare,
          color: 'gold'
        }
      ],
      alex: [
        {
          id: '13',
          type: 'trending' as const,
          title: 'Home Fitness Revolution',
          content: 'You don\'t need a gym to transform your life. Just 20 minutes, bodyweight, and determination. Who\'s ready to start?',
          hashtags: ['#homeworkout', '#fitness', '#transformation', '#motivation'],
          platform: 'Instagram',
          engagement: '90%',
          timeToPost: '6:00 AM',
          rationale: 'Fitness motivation peaks during morning workout hours',
          icon: TrendingUp,
          color: 'green'
        },
        {
          id: '14',
          type: 'engagement' as const,
          title: 'Client Success Story',
          content: 'Mark lost 30 pounds in 3 months with our virtual coaching program. "Alex didn\'t just change my body—he changed my mindset."',
          hashtags: ['#transformation', '#success', '#coaching', '#mindset'],
          platform: 'LinkedIn',
          engagement: '87%',
          timeToPost: '8:00 AM',
          rationale: 'Success stories inspire morning motivation',
          icon: Target,
          color: 'blue'
        },
        {
          id: '15',
          type: 'conversion' as const,
          title: 'Free Fitness Assessment',
          content: 'Ready to transform? I\'m offering 5 free fitness assessments this week. Let\'s create your personalized plan.',
          hashtags: ['#freeconsultation', '#fitness', '#personaltraining', '#assessment'],
          platform: 'Facebook',
          engagement: '81%',
          timeToPost: '7:00 PM',
          rationale: 'Health commitment decisions peak in evenings',
          icon: MessageSquare,
          color: 'orange'
        }
      ],
      david: [
        {
          id: '16',
          type: 'trending' as const,
          title: 'Electric Vehicle Future',
          content: 'The auto industry is at a tipping point. Electric isn\'t just the future—it\'s the present. Are you ready for the revolution?',
          hashtags: ['#electricvehicles', '#future', '#automotive', '#innovation'],
          platform: 'LinkedIn',
          engagement: '85%',
          timeToPost: '9:00 AM',
          rationale: 'Industry insights perform best during business hours',
          icon: TrendingUp,
          color: 'blue'
        },
        {
          id: '17',
          type: 'engagement' as const,
          title: 'Luxury Car Showcase',
          content: 'Just delivered this stunning 2024 Tesla Model S Plaid. 0-60 in 1.99 seconds. The future of luxury is here.',
          hashtags: ['#tesla', '#luxury', '#performance', '#delivery'],
          platform: 'Instagram',
          engagement: '92%',
          timeToPost: '7:00 PM',
          rationale: 'Luxury showcases perform best during evening browsing',
          icon: Target,
          color: 'red'
        },
        {
          id: '18',
          type: 'conversion' as const,
          title: 'Test Drive Event',
          content: 'This Saturday: Exclusive test drive event for our latest electric models. Experience the future of driving.',
          hashtags: ['#testdrive', '#event', '#electric', '#experience'],
          platform: 'Facebook',
          engagement: '77%',
          timeToPost: '1:00 PM',
          rationale: 'Event promotions convert best early afternoon',
          icon: MessageSquare,
          color: 'green'
        }
      ]
    };

    return suggestionsByPersona[currentPersona as keyof typeof suggestionsByPersona] || [];
  };

  useEffect(() => {
    const personaSuggestions = generatePersonaSuggestions();
    setSuggestions(personaSuggestions);
  }, [currentPersona, selectedPlatforms]);

  const refreshSuggestions = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuggestions(generatePersonaSuggestions());
    setIsRefreshing(false);
  };

  const filteredSuggestions = selectedType === 'all' 
    ? suggestions 
    : suggestions.filter(s => s.type === selectedType);

  const suggestionTypes = [
    { id: 'all', label: 'All', icon: Lightbulb },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'engagement', label: 'Engagement', icon: Users },
    { id: 'conversion', label: 'Conversion', icon: Target }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Smart Suggestions</h3>
            <p className="text-sm text-gray-600">AI-powered content ideas for your audience</p>
          </div>
        </div>
        
        <button
          onClick={refreshSuggestions}
          disabled={isRefreshing}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6">
        {suggestionTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                selectedType === type.id
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{type.label}</span>
            </button>
          );
        })}
      </div>

      {/* Suggestions Grid */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredSuggestions.map((suggestion) => {
            const Icon = suggestion.icon;
            return (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${suggestion.color}-100`}>
                    <Icon className={`w-6 h-6 text-${suggestion.color}-600`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">{suggestion.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <BarChart3 className="w-4 h-4" />
                          <span>{suggestion.engagement}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{suggestion.timeToPost}</span>
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{suggestion.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Hash className="w-4 h-4 text-gray-400" />
                        <div className="flex space-x-1">
                          {suggestion.hashtags.map((tag, index) => (
                            <span key={index} className="text-sm text-purple-600">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => onSuggestionSelect(suggestion)}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
                      >
                        Use This
                      </button>
                    </div>
                    
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Why this works:</span> {suggestion.rationale}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}