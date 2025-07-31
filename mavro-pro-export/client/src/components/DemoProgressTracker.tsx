import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Trophy, Star, Target, Users, BarChart3, Globe, Settings, MessageCircle } from 'lucide-react';

interface DemoProgressTrackerProps {
  currentView: string;
  currentPersona: string;
  isVisible: boolean;
  onToggle: () => void;
}

interface ProgressItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  page: string;
  completed: boolean;
  points: number;
}

export default function DemoProgressTracker({ currentView, currentPersona, isVisible, onToggle }: DemoProgressTrackerProps) {
  const [visitedPages, setVisitedPages] = useState<string[]>(['dashboard']);
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const progressItems: ProgressItem[] = [
    {
      id: 'visit-dashboard',
      title: 'Explore Command Center',
      description: 'Navigate the main dashboard',
      icon: Target,
      page: 'dashboard',
      completed: true,
      points: 10
    },
    {
      id: 'visit-campaigns',
      title: 'View Campaigns',
      description: 'Check your marketing campaigns',
      icon: Target,
      page: 'campaigns',
      completed: visitedPages.includes('campaigns'),
      points: 15
    },
    {
      id: 'visit-analytics',
      title: 'Review Analytics',
      description: 'Analyze your performance metrics',
      icon: BarChart3,
      page: 'foursight',
      completed: visitedPages.includes('foursight'),
      points: 15
    },
    {
      id: 'visit-geosmart',
      title: 'Try GeoSmart',
      description: 'Explore geographic intelligence',
      icon: Globe,
      page: 'geosmart',
      completed: visitedPages.includes('geosmart'),
      points: 20
    },
    {
      id: 'visit-crm',
      title: 'Check CRM',
      description: 'Manage your customer relationships',
      icon: Users,
      page: 'crm',
      completed: visitedPages.includes('crm'),
      points: 15
    },
    {
      id: 'visit-reviews',
      title: 'Monitor Reviews',
      description: 'See customer feedback',
      icon: MessageCircle,
      page: 'reviews',
      completed: visitedPages.includes('reviews'),
      points: 15
    },
    {
      id: 'visit-settings',
      title: 'Configure Settings',
      description: 'Customize your preferences',
      icon: Settings,
      page: 'settings',
      completed: visitedPages.includes('settings'),
      points: 10
    }
  ];

  const totalPoints = progressItems.reduce((sum, item) => sum + item.points, 0);
  const earnedPoints = progressItems.filter(item => item.completed).reduce((sum, item) => sum + item.points, 0);
  const completionPercentage = Math.round((earnedPoints / totalPoints) * 100);

  // Track page visits
  useEffect(() => {
    if (!visitedPages.includes(currentView)) {
      setVisitedPages([...visitedPages, currentView]);
    }
  }, [currentView]);

  // Show celebration when milestones are reached
  useEffect(() => {
    if (completionPercentage >= 100 && !showCelebration) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [completionPercentage]);

  const getProgressLevel = () => {
    if (completionPercentage >= 100) return { level: 'Expert', color: 'purple', icon: Trophy };
    if (completionPercentage >= 75) return { level: 'Advanced', color: 'blue', icon: Star };
    if (completionPercentage >= 50) return { level: 'Intermediate', color: 'green', icon: Target };
    if (completionPercentage >= 25) return { level: 'Beginner', color: 'yellow', icon: Circle };
    return { level: 'Getting Started', color: 'gray', icon: Circle };
  };

  const progressLevel = getProgressLevel();

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 z-40"
      >
        <Trophy className="w-6 h-6" />
        <div className="absolute -top-2 -right-2 bg-white text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
          {completionPercentage}%
        </div>
      </button>
    );
  }

  return (
    <>
      {/* Progress Panel */}
      <div className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl p-6 w-80 z-40 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Demo Progress</h3>
          <button
            onClick={onToggle}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Progress Overview */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <progressLevel.icon className={`w-5 h-5 text-${progressLevel.color}-500`} />
              <span className={`text-sm font-medium text-${progressLevel.color}-600`}>
                {progressLevel.level}
              </span>
            </div>
            <span className="text-sm text-gray-600">{earnedPoints}/{totalPoints} points</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{completionPercentage}% Complete</p>
        </div>

        {/* Progress Items */}
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {progressItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0">
                {item.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                  {item.title}
                </p>
                <p className="text-xs text-gray-400">{item.description}</p>
              </div>
              <div className="flex-shrink-0">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.completed 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  +{item.points}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Next Steps */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            {completionPercentage >= 100 
              ? "🎉 You've explored all features! Ready to transform your marketing?"
              : "Continue exploring to unlock more features!"
            }
          </p>
        </div>
      </div>

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Demo Complete!</h2>
            <p className="text-gray-600 mb-6">
              You've explored all features of Mavro Pro. Ready to transform your marketing strategy?
            </p>
            <button
              onClick={() => setShowCelebration(false)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
            >
              Get Started Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}