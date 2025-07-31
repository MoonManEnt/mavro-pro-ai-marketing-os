import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, Target, Zap, Star, Crown, Medal, Gift, TrendingUp, Calendar, CheckCircle, Lock } from 'lucide-react';

interface GamifiedUserProgressProps {
  currentPersona: string;
  isVisible: boolean;
  onClose: () => void;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  category: 'content' | 'engagement' | 'growth' | 'consistency' | 'innovation';
}

interface UserLevel {
  level: number;
  title: string;
  minXP: number;
  maxXP: number;
  perks: string[];
  badge: string;
}

const GamifiedUserProgress: React.FC<GamifiedUserProgressProps> = ({
  currentPersona,
  isVisible,
  onClose
}) => {
  const [currentXP, setCurrentXP] = useState(2850);
  const [currentLevel, setCurrentLevel] = useState<UserLevel | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [dailyStreak, setDailyStreak] = useState(12);
  const [weeklyGoal, setWeeklyGoal] = useState({ current: 7, target: 10 });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showLevelUp, setShowLevelUp] = useState(false);

  const levels: UserLevel[] = [
    { level: 1, title: 'Rookie', minXP: 0, maxXP: 500, perks: ['Basic templates'], badge: '🌱' },
    { level: 2, title: 'Apprentice', minXP: 500, maxXP: 1000, perks: ['Basic templates', 'Analytics'], badge: '📈' },
    { level: 3, title: 'Specialist', minXP: 1000, maxXP: 2000, perks: ['Advanced templates', 'Analytics', 'Scheduling'], badge: '🎯' },
    { level: 4, title: 'Expert', minXP: 2000, maxXP: 3500, perks: ['All templates', 'Advanced analytics', 'Auto-posting'], badge: '⭐' },
    { level: 5, title: 'Master', minXP: 3500, maxXP: 5500, perks: ['Custom templates', 'AI insights', 'Priority support'], badge: '🏆' },
    { level: 6, title: 'Grandmaster', minXP: 5500, maxXP: 8000, perks: ['Early access', 'Custom branding', 'Advanced AI'], badge: '👑' },
    { level: 7, title: 'Legend', minXP: 8000, maxXP: 999999, perks: ['All features', 'Beta access', 'VIP support'], badge: '🌟' }
  ];

  const getPersonaAchievements = (): Achievement[] => {
    const baseAchievements: Achievement[] = [
      {
        id: 'first_post',
        title: 'First Steps',
        description: 'Created your first social media post',
        icon: Target,
        rarity: 'common',
        points: 50,
        unlocked: true,
        unlockedAt: new Date('2025-01-10'),
        progress: 1,
        maxProgress: 1,
        category: 'content'
      },
      {
        id: 'daily_streak_7',
        title: 'Week Warrior',
        description: 'Post consistently for 7 days',
        icon: Calendar,
        rarity: 'rare',
        points: 200,
        unlocked: true,
        unlockedAt: new Date('2025-01-12'),
        progress: 7,
        maxProgress: 7,
        category: 'consistency'
      },
      {
        id: 'viral_post',
        title: 'Viral Sensation',
        description: 'Get 1000+ engagements on a single post',
        icon: Zap,
        rarity: 'epic',
        points: 500,
        unlocked: false,
        progress: 750,
        maxProgress: 1000,
        category: 'engagement'
      },
      {
        id: 'ai_expert',
        title: 'AI Whisperer',
        description: 'Use AI suggestions 50 times',
        icon: Star,
        rarity: 'rare',
        points: 300,
        unlocked: true,
        unlockedAt: new Date('2025-01-13'),
        progress: 50,
        maxProgress: 50,
        category: 'innovation'
      },
      {
        id: 'engagement_master',
        title: 'Engagement Master',
        description: 'Maintain 85%+ engagement rate for a month',
        icon: Trophy,
        rarity: 'legendary',
        points: 1000,
        unlocked: false,
        progress: 21,
        maxProgress: 30,
        category: 'engagement'
      }
    ];

    // Add persona-specific achievements
    const personaAchievements = {
      kemar: [
        {
          id: 'keynote_booking',
          title: 'Stage Ready',
          description: 'Book your first keynote through social media',
          icon: Award,
          rarity: 'epic' as const,
          points: 750,
          unlocked: false,
          progress: 0,
          maxProgress: 1,
          category: 'growth' as const
        },
        {
          id: 'thought_leader',
          title: 'Thought Leader',
          description: 'Get featured in 5 industry publications',
          icon: Crown,
          rarity: 'legendary' as const,
          points: 1500,
          unlocked: false,
          progress: 2,
          maxProgress: 5,
          category: 'growth' as const
        }
      ],
      karen: [
        {
          id: 'first_sale',
          title: 'Deal Closer',
          description: 'Close your first sale from social media lead',
          icon: Medal,
          rarity: 'epic' as const,
          points: 800,
          unlocked: true,
          unlockedAt: new Date('2025-01-11'),
          progress: 1,
          maxProgress: 1,
          category: 'growth' as const
        },
        {
          id: 'luxury_specialist',
          title: 'Luxury Specialist',
          description: 'Sell 10 luxury properties',
          icon: Crown,
          rarity: 'legendary' as const,
          points: 2000,
          unlocked: false,
          progress: 6,
          maxProgress: 10,
          category: 'growth' as const
        }
      ],
      sarah: [
        {
          id: 'wellness_guru',
          title: 'Wellness Guru',
          description: 'Help 100 clients achieve their beauty goals',
          icon: Gift,
          rarity: 'epic' as const,
          points: 900,
          unlocked: false,
          progress: 67,
          maxProgress: 100,
          category: 'growth' as const
        },
        {
          id: 'transformation_master',
          title: 'Transformation Master',
          description: 'Share 50 amazing before/after results',
          icon: Star,
          rarity: 'rare' as const,
          points: 400,
          unlocked: true,
          unlockedAt: new Date('2025-01-09'),
          progress: 50,
          maxProgress: 50,
          category: 'content' as const
        }
      ],
      marco: [
        {
          id: 'foodie_favorite',
          title: 'Foodie Favorite',
          description: 'Get 500 food lovers following your content',
          icon: TrendingUp,
          rarity: 'rare' as const,
          points: 350,
          unlocked: true,
          unlockedAt: new Date('2025-01-08'),
          progress: 500,
          maxProgress: 500,
          category: 'engagement' as const
        },
        {
          id: 'michelin_mention',
          title: 'Michelin Mention',
          description: 'Get featured by a food critic or guide',
          icon: Crown,
          rarity: 'legendary' as const,
          points: 2500,
          unlocked: false,
          progress: 0,
          maxProgress: 1,
          category: 'growth' as const
        }
      ],
      alex: [
        {
          id: 'fitness_influencer',
          title: 'Fitness Influencer',
          description: 'Inspire 1000 people to start their fitness journey',
          icon: Trophy,
          rarity: 'epic' as const,
          points: 1200,
          unlocked: false,
          progress: 432,
          maxProgress: 1000,
          category: 'engagement' as const
        },
        {
          id: 'transformation_coach',
          title: 'Transformation Coach',
          description: 'Help 25 clients achieve major transformations',
          icon: Medal,
          rarity: 'rare' as const,
          points: 500,
          unlocked: false,
          progress: 18,
          maxProgress: 25,
          category: 'growth' as const
        }
      ],
      david: [
        {
          id: 'sales_champion',
          title: 'Sales Champion',
          description: 'Sell 100 vehicles through social media leads',
          icon: Trophy,
          rarity: 'epic' as const,
          points: 1000,
          unlocked: false,
          progress: 43,
          maxProgress: 100,
          category: 'growth' as const
        },
        {
          id: 'customer_favorite',
          title: 'Customer Favorite',
          description: 'Maintain 4.9+ star rating with 100+ reviews',
          icon: Star,
          rarity: 'rare' as const,
          points: 400,
          unlocked: true,
          unlockedAt: new Date('2025-01-07'),
          progress: 100,
          maxProgress: 100,
          category: 'engagement' as const
        }
      ]
    };

    const currentPersonaAchievements = personaAchievements[currentPersona as keyof typeof personaAchievements] || [];
    return [...baseAchievements, ...currentPersonaAchievements];
  };

  useEffect(() => {
    setAchievements(getPersonaAchievements());
    
    // Find current level
    const level = levels.find(l => currentXP >= l.minXP && currentXP < l.maxXP);
    setCurrentLevel(level || levels[0]);
  }, [currentPersona, currentXP]);

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRarityBorder = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'border-gray-300';
      case 'rare': return 'border-blue-300';
      case 'epic': return 'border-purple-300';
      case 'legendary': return 'border-yellow-300';
      default: return 'border-gray-300';
    }
  };

  const filteredAchievements = achievements.filter(achievement => 
    selectedCategory === 'all' || achievement.category === selectedCategory
  );

  const totalPoints = achievements.reduce((sum, achievement) => 
    sum + (achievement.unlocked ? achievement.points : 0), 0
  );

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                    {currentLevel?.badge}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Level {currentLevel?.level} {currentLevel?.title}</h2>
                    <p className="text-purple-100">
                      {currentXP} XP • {totalPoints} Points • {unlockedCount}/{achievements.length} Achievements
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-white hover:text-purple-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Progress Bar */}
              {currentLevel && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-purple-100 mb-2">
                    <span>Level {currentLevel.level}</span>
                    <span>{currentLevel.level < 7 ? `Next: Level ${currentLevel.level + 1}` : 'Max Level'}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${((currentXP - currentLevel.minXP) / (currentLevel.maxXP - currentLevel.minXP)) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-900">{dailyStreak}</div>
                      <div className="text-sm text-green-700">Day Streak</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-900">{weeklyGoal.current}/{weeklyGoal.target}</div>
                      <div className="text-sm text-blue-700">Weekly Goal</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-900">{totalPoints}</div>
                      <div className="text-sm text-purple-700">Total Points</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievement Categories */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Achievements</h3>
                  <div className="flex space-x-2">
                    {['all', 'content', 'engagement', 'growth', 'consistency', 'innovation'].map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === category
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredAchievements.map((achievement) => {
                    const IconComponent = achievement.icon;
                    const rarityColor = getRarityColor(achievement.rarity);
                    const rarityBorder = getRarityBorder(achievement.rarity);
                    
                    return (
                      <motion.div
                        key={achievement.id}
                        className={`border-2 rounded-xl p-4 transition-all ${rarityBorder} ${
                          achievement.unlocked ? 'bg-white' : 'bg-gray-50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            achievement.unlocked ? rarityColor : 'bg-gray-200 text-gray-400'
                          }`}>
                            {achievement.unlocked ? (
                              <IconComponent className="w-6 h-6" />
                            ) : (
                              <Lock className="w-6 h-6" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className={`font-semibold ${
                                achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                              }`}>
                                {achievement.title}
                              </h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${rarityColor}`}>
                                {achievement.rarity}
                              </span>
                            </div>
                            
                            <p className={`text-sm mb-2 ${
                              achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                              {achievement.description}
                            </p>
                            
                            {/* Progress Bar */}
                            {!achievement.unlocked && (
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>Progress</span>
                                  <span>{achievement.progress}/{achievement.maxProgress}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                                  />
                                </div>
                              </div>
                            )}
                            
                            {/* Unlocked Info */}
                            {achievement.unlocked && achievement.unlockedAt && (
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>Unlocked {achievement.unlockedAt.toLocaleDateString()}</span>
                                <span className="font-medium text-green-600">+{achievement.points} XP</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GamifiedUserProgress;