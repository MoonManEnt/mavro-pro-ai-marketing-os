import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface GrioModule {
  id: string;
  title: string;
  description: string;
  content?: string;
  level: string;
  category: string;
  xpReward: number;
  prerequisites: string[];
  estimatedTime?: number;
  videoUrl?: string;
  thumbnailUrl?: string;
  transcriptUrl?: string;
  targetPersonas: string[];
  industry?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface UserProgress {
  id: string;
  userId: string;
  moduleId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progressPercent: number;
  timeSpent: number;
  lastAccessedAt?: string;
  completedAt?: string;
  feedbackRating?: number;
  feedbackText?: string;
}

interface UserStats {
  id: string;
  userId: string;
  totalXp: number;
  currentRank: string;
  modulesCompleted: number;
  totalTimeSpent: number;
  currentStreak: number;
  longestStreak: number;
  lastLearningDate?: string;
  achievements: string[];
  favoriteCategories: string[];
}

interface ModuleWithProgress extends GrioModule {
  userProgress?: UserProgress;
  completed: boolean;
}

export const useGrioModules = (persona?: string, level?: string, category?: string) => {
  const queryClient = useQueryClient();
  
  // Fetch modules
  const { 
    data: modulesData, 
    isLoading: modulesLoading,
    error: modulesError 
  } = useQuery({
    queryKey: ['/api/grio/modules', { persona, level, category }],
    queryFn: () => apiRequest(`/api/grio/modules?${new URLSearchParams({
      ...(persona && { persona }),
      ...(level && { level }),
      ...(category && { category })
    }).toString()}`),
  });

  // Fetch user progress
  const { 
    data: progressData, 
    isLoading: progressLoading 
  } = useQuery({
    queryKey: ['/api/grio/progress'],
    queryFn: () => apiRequest('/api/grio/progress'),
  });

  // Complete module mutation
  const completeModuleMutation = useMutation({
    mutationFn: ({ moduleId, timeSpent, feedbackRating, feedbackText }: {
      moduleId: string;
      timeSpent?: number;
      feedbackRating?: number;
      feedbackText?: string;
    }) => {
      return apiRequest(`/api/grio/modules/${moduleId}/complete`, {
        method: 'POST',
        body: { timeSpent, feedbackRating, feedbackText }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/grio/progress'] });
      queryClient.invalidateQueries({ queryKey: ['/api/grio/modules'] });
    },
  });

  // Update progress mutation
  const updateProgressMutation = useMutation({
    mutationFn: ({ moduleId, status, progressPercent, timeSpent }: {
      moduleId: string;
      status?: string;
      progressPercent?: number;
      timeSpent?: number;
    }) => {
      return apiRequest(`/api/grio/modules/${moduleId}/progress`, {
        method: 'POST',
        body: { status, progressPercent, timeSpent }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/grio/progress'] });
    },
  });

  // Process data
  const modules: GrioModule[] = modulesData?.data?.modules || [];
  const userProgress: UserProgress[] = progressData?.data?.progress || [];
  const userStats: UserStats | undefined = progressData?.data?.stats;

  // Combine modules with progress
  const modulesWithProgress: ModuleWithProgress[] = modules.map(module => {
    const progress = userProgress.find(p => p.moduleId === module.id);
    return {
      ...module,
      userProgress: progress,
      completed: progress?.status === 'completed'
    };
  });

  // Calculate rank thresholds (simplified version)
  const getRankFromXP = (xp: number): string => {
    if (xp >= 2500) return 'Diamond';
    if (xp >= 2000) return 'Platinum';
    if (xp >= 1500) return 'Gold';
    if (xp >= 1000) return 'Silver';
    return 'Bronze';
  };

  const completeModule = async (moduleId: string, timeSpent?: number, feedbackRating?: number, feedbackText?: string) => {
    return completeModuleMutation.mutateAsync({
      moduleId,
      timeSpent,
      feedbackRating,
      feedbackText
    });
  };

  const updateProgress = async (moduleId: string, status?: string, progressPercent?: number, timeSpent?: number) => {
    return updateProgressMutation.mutateAsync({
      moduleId,
      status,
      progressPercent,
      timeSpent
    });
  };

  return {
    modules: modulesWithProgress,
    userStats,
    userProgress,
    xp: userStats?.totalXp || 0,
    userRank: userStats?.currentRank || 'Bronze',
    modulesCompleted: userStats?.modulesCompleted || 0,
    totalTimeSpent: userStats?.totalTimeSpent || 0,
    currentStreak: userStats?.currentStreak || 0,
    
    // Actions
    completeModule,
    updateProgress,
    
    // Loading states
    isLoading: modulesLoading || progressLoading,
    isCompleting: completeModuleMutation.isPending,
    isUpdating: updateProgressMutation.isPending,
    
    // Error states
    error: modulesError,
    
    // Utils
    getRankFromXP,
  };
};

export default useGrioModules;