import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/components/Auth/AuthGuard';

export interface CustomPersona {
  id: number;
  userId: number;
  name: string;
  businessType: string;
  industry: string;
  targetAudience: string;
  brandVoice: string;
  businessGoals: string[];
  socialPlatforms: string[];
  contentPreferences: {
    contentTypes: string[];
    postingFrequency: string;
    preferredTimes: string[];
  };
  demographics: {
    ageRange: string;
    location: string;
    interests: string[];
  };
  avatar?: string;
  isActive: boolean;
  isSandbox: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useCustomPersonas = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get user's personas
  const myPersonas = useQuery({
    queryKey: ['/api/personas/my-personas'],
    enabled: !!user,
  });

  // Get public sandbox personas
  const sandboxPersonas = useQuery({
    queryKey: ['/api/personas/sandbox'],
  });

  // Create persona
  const createPersona = useMutation({
    mutationFn: async (personaData: Partial<CustomPersona>) => {
      const response = await fetch('/api/personas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(personaData),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create persona');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/personas/my-personas'] });
      queryClient.invalidateQueries({ queryKey: ['/api/personas/sandbox'] });
    },
  });

  // Update persona
  const updatePersona = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<CustomPersona> }) => {
      const response = await fetch(`/api/personas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update persona');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/personas/my-personas'] });
      queryClient.invalidateQueries({ queryKey: ['/api/personas/sandbox'] });
    },
  });

  // Delete persona
  const deletePersona = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/personas/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete persona');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/personas/my-personas'] });
      queryClient.invalidateQueries({ queryKey: ['/api/personas/sandbox'] });
    },
  });

  // Clone persona
  const clonePersona = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/personas/clone/${id}`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to clone persona');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/personas/my-personas'] });
    },
  });

  // Toggle sandbox status
  const toggleSandbox = useMutation({
    mutationFn: async ({ id, isSandbox }: { id: number; isSandbox: boolean }) => {
      const response = await fetch(`/api/personas/${id}/sandbox`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ isSandbox }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to toggle sandbox status');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/personas/my-personas'] });
      queryClient.invalidateQueries({ queryKey: ['/api/personas/sandbox'] });
    },
  });

  // Get specific persona
  const getPersona = (id: number) => {
    return useQuery({
      queryKey: ['/api/personas', id],
      queryFn: async () => {
        const response = await fetch(`/api/personas/${id}`, {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch persona');
        }
        return response.json();
      },
    });
  };

  return {
    myPersonas,
    sandboxPersonas,
    createPersona,
    updatePersona,
    deletePersona,
    clonePersona,
    toggleSandbox,
    getPersona,
  };
};

export default useCustomPersonas;