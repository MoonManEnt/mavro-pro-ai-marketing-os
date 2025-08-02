import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  Play, 
  CheckCircle2, 
  Lock,
  Star,
  Zap,
  TrendingUp,
  Filter,
  Grid,
  List,
  User,
  Award,
  Calendar,
  Target
} from 'lucide-react';
import { useGrioModules } from '@/hooks/useGrioModules';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const GrioAcademyPage = () => {
  const { toast } = useToast();
  const [selectedPersona, setSelectedPersona] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('journey');

  // Available personas for selection
  const personas = [
    'MedSpa Owner',
    'Real Estate Agent', 
    'Local Business Owner',
    'Content Creator',
    'Coach',
    'Consultant'
  ];

  const {
    modules,
    userStats,
    xp,
    userRank,
    modulesCompleted,
    totalTimeSpent,
    currentStreak,
    completeModule,
    updateProgress,
    isLoading,
    isCompleting,
    getRankFromXP
  } = useGrioModules(
    selectedPersona, 
    levelFilter === 'all' ? undefined : levelFilter, 
    categoryFilter === 'all' ? undefined : categoryFilter
  );

  // Demo mode - no default persona, user must select

  const handleCompleteModule = async (moduleId: string) => {
    try {
      const result = await completeModule(moduleId, 15); // Mock 15 minutes spent
      toast({
        title: "Module Completed! 🎉",
        description: `You earned ${result.data.xpGained || 100} XP!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete module. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleStartModule = async (moduleId: string) => {
    try {
      await updateProgress(moduleId, 'in_progress', 10);
      toast({
        title: "Module Started",
        description: "Your progress has been saved.",
      });
    } catch (error) {
      console.error('Error starting module:', error);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Diamond': return 'from-blue-400 to-purple-600';
      case 'Platinum': return 'from-gray-300 to-gray-500';
      case 'Gold': return 'from-yellow-400 to-yellow-600';
      case 'Silver': return 'from-gray-200 to-gray-400';
      case 'Bronze': return 'from-orange-400 to-orange-600';
      default: return 'from-gray-100 to-gray-300';
    }
  };

  const nextRankXP = () => {
    const currentXP = xp;
    if (currentXP < 1000) return 1000;
    if (currentXP < 1500) return 1500;
    if (currentXP < 2000) return 2000;
    if (currentXP < 2500) return 2500;
    return 3000;
  };

  const progressToNextRank = () => {
    const current = xp;
    const next = nextRankXP();
    const previous = current < 1000 ? 0 : current < 1500 ? 1000 : current < 2000 ? 1500 : current < 2500 ? 2000 : 2500;
    return ((current - previous) / (next - previous)) * 100;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl"
            >
              🎓
            </motion.div>
            <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {selectedPersona ? `Welcome back, ${selectedPersona}` : 'Welcome to Grio Academy'}
            </h1>
          </div>
          {selectedPersona && (
            <div className="text-center mb-4">
              <p className="text-lg text-gray-500">
                Personalized learning path for <span className="font-semibold text-purple-600">
                  {selectedPersona}
                </span>
              </p>
            </div>
          )}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master marketing skills with AI-powered personalized learning paths designed for your industry
          </p>
        </motion.div>

        {/* User Stats Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white/50 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Rank & XP */}
            <div className="text-center">
              <div className={`mx-auto w-20 h-20 rounded-full bg-gradient-to-br ${getRankColor(userRank)} flex items-center justify-center mb-3 shadow-lg`}>
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg">{userRank}</h3>
              <p className="text-sm text-gray-600">{xp.toLocaleString()} XP</p>
              <div className="mt-2">
                <Progress value={progressToNextRank()} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">
                  {nextRankXP() - xp} XP to {getRankFromXP(nextRankXP())}
                </p>
              </div>
            </div>

            {/* Modules Completed */}
            <div className="text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-3 shadow-lg">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg">{modulesCompleted}</h3>
              <p className="text-sm text-gray-600">Modules Completed</p>
            </div>

            {/* Time Spent */}
            <div className="text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center mb-3 shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg">{Math.round(totalTimeSpent / 60)}h</h3>
              <p className="text-sm text-gray-600">Learning Time</p>
            </div>

            {/* Current Streak */}
            <div className="text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center mb-3 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg">{currentStreak}</h3>
              <p className="text-sm text-gray-600">Day Streak</p>
            </div>
          </div>
        </motion.div>

        {/* Persona Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/50"
        >
          <h2 className="text-xl font-bold mb-4 text-center">
            {selectedPersona ? 
              `Currently learning as: ${selectedPersona}` : 
              'Choose Your Learning Path'
            }
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {personas.map((persona) => (
              <motion.button
                key={persona}
                onClick={() => setSelectedPersona(selectedPersona === persona ? '' : persona)}
                className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  selectedPersona === persona
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white/60 hover:bg-white/80 text-gray-700 border border-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {persona}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-sm rounded-2xl p-1">
            <TabsTrigger value="journey" className="rounded-xl">
              <Target className="w-4 h-4 mr-2" />
              My Journey
            </TabsTrigger>
            <TabsTrigger value="browse" className="rounded-xl">
              <BookOpen className="w-4 h-4 mr-2" />
              Browse Modules
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="rounded-xl">
              <Trophy className="w-4 h-4 mr-2" />
              Leaderboard
            </TabsTrigger>
          </TabsList>

          {/* My Learning Journey */}
          <TabsContent value="journey" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-white/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {selectedPersona ? `Continue Learning, ${selectedPersona}` : 'Select Your Learning Path'}
                  </CardTitle>
                  <CardDescription>
                    {selectedPersona ? 'Your personalized modules await' : 'Choose a persona above to see your customized modules'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!selectedPersona ? (
                    <div className="text-center py-8">
                      <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">
                        Choose Your Learning Path
                      </h3>
                      <p className="text-gray-500">
                        Select a persona above to see your personalized learning modules
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {modules
                        .filter(module => 
                          !module.completed && 
                          (module.targetPersonas.includes(selectedPersona) || module.targetPersonas.length === 0)
                        )
                        .slice(0, 3)
                        .map((module, index) => (
                        <motion.div
                          key={module.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-2">{module.title}</h3>
                              <p className="text-gray-600 text-sm mb-3">{module.description}</p>
                              <div className="flex items-center gap-2 mb-3">
                                <Badge className={getLevelColor(module.level)}>
                                  {module.level}
                                </Badge>
                                <Badge variant="outline">{module.category}</Badge>
                                {module.estimatedTime && (
                                  <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {module.estimatedTime}m
                                  </span>
                                )}
                              </div>
                              {module.userProgress && (
                                <Progress value={module.userProgress.progressPercent} className="mb-3" />
                              )}
                            </div>
                            <div className="ml-4">
                              {module.userProgress?.status === 'in_progress' ? (
                                <Button 
                                  onClick={() => handleCompleteModule(module.id)}
                                  disabled={isCompleting}
                                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                >
                                  <CheckCircle2 className="w-4 h-4 mr-2" />
                                  Complete
                                </Button>
                              ) : (
                                <Button 
                                  onClick={() => handleStartModule(module.id)}
                                  variant="outline"
                                  className="border-purple-200 hover:bg-purple-50"
                                >
                                  <Play className="w-4 h-4 mr-2" />
                                  Start
                                </Button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Browse All Modules */}
          <TabsContent value="browse" className="space-y-6">
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50"
            >
              <div className="flex flex-wrap items-center gap-4">
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Video Marketing">Video Marketing</SelectItem>
                    <SelectItem value="Content Creation">Content Creation</SelectItem>
                    <SelectItem value="AI Tools">AI Tools</SelectItem>
                    <SelectItem value="Social Media">Social Media</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2 ml-auto">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Modules Grid/List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
              }
            >
              {modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full bg-white/80 backdrop-blur-sm border-white/50 hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2 group-hover:text-purple-600 transition-colors">
                            {module.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getLevelColor(module.level)}>
                              {module.level}
                            </Badge>
                            <Badge variant="outline">{module.category}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          {module.completed ? (
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                          ) : module.userProgress?.status === 'in_progress' ? (
                            <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
                              <Clock className="w-4 h-4 text-yellow-800" />
                            </div>
                          ) : (
                            <Lock className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        {module.description}
                      </CardDescription>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {module.xpReward} XP
                          </span>
                          {module.estimatedTime && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {module.estimatedTime}m
                            </span>
                          )}
                        </div>
                      </div>

                      {module.userProgress && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{module.userProgress.progressPercent}%</span>
                          </div>
                          <Progress value={module.userProgress.progressPercent} />
                        </div>
                      )}

                      <div className="flex gap-2">
                        {module.completed ? (
                          <Button variant="outline" className="flex-1" disabled>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Completed
                          </Button>
                        ) : module.userProgress?.status === 'in_progress' ? (
                          <Button 
                            onClick={() => handleCompleteModule(module.id)}
                            disabled={isCompleting}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Complete
                          </Button>
                        ) : (
                          <Button 
                            onClick={() => handleStartModule(module.id)}
                            variant="outline"
                            className="flex-1 border-purple-200 hover:bg-purple-50"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Start Module
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Leaderboard */}
          <TabsContent value="leaderboard">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-white/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Global Leaderboard
                  </CardTitle>
                  <CardDescription>
                    See how you rank against other learners
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      Leaderboard Coming Soon
                    </h3>
                    <p className="text-gray-500">
                      Complete more modules to see your ranking among other learners
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* ViVi AI Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">💬 ViVi Suggests:</h3>
                  <p className="text-white/90">
                    Based on your {selectedPersona} persona and {userRank} rank, 
                    this week's top pick: <strong>"How to Create Better Reels"</strong> - 
                    Perfect for boosting your video marketing skills!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default GrioAcademyPage;