import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Copy, Eye, EyeOff, User, Target, Users, Calendar, Settings, BookOpen, Sparkles } from 'lucide-react';
import { SiInstagram, SiFacebook, SiX, SiLinkedin, SiTiktok, SiYoutube, SiPinterest, SiSnapchat } from 'react-icons/si';
import { useLocation } from 'wouter';
import PersonaCreator from '../components/PersonaCreator';
import TemplateLibrary from '../components/TemplateLibrary';
import TemplateCreator from '../components/TemplateCreator';
import { useAuth } from '../components/Auth/AuthGuard';

const PersonaManagement: React.FC = () => {
  // Check URL params for tab
  const urlParams = new URLSearchParams(window.location.search);
  const initialTab = urlParams.get('tab') === 'templates' ? 'templates' : 'personas';
  
  const [activeTab, setActiveTab] = useState<'personas' | 'templates'>(initialTab);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [editingPersona, setEditingPersona] = useState<any>(null);
  const [selectedPersona, setSelectedPersona] = useState<any>(null);
  const [isTemplateCreatorOpen, setIsTemplateCreatorOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();

  // Fetch user's personas
  const { data: myPersonas, isLoading: isLoadingMy } = useQuery({
    queryKey: ['/api/personas/my-personas'],
    enabled: !!user,
  });

  // Fetch sandbox personas
  const { data: sandboxPersonas, isLoading: isLoadingSandbox } = useQuery({
    queryKey: ['/api/personas/sandbox'],
  });

  // Create persona mutation
  const createPersonaMutation = useMutation({
    mutationFn: async (personaData: any) => {
      const response = await fetch('/api/personas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(personaData),
      });
      if (!response.ok) throw new Error('Failed to create persona');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/personas/my-personas'] });
      queryClient.invalidateQueries({ queryKey: ['/api/personas/sandbox'] });
    },
  });

  // Update persona mutation
  const updatePersonaMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await fetch(`/api/personas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update persona');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/personas/my-personas'] });
      queryClient.invalidateQueries({ queryKey: ['/api/personas/sandbox'] });
    },
  });

  // Delete persona mutation
  const deletePersonaMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/personas/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to delete persona');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/personas/my-personas'] });
      queryClient.invalidateQueries({ queryKey: ['/api/personas/sandbox'] });
    },
  });

  // Clone persona mutation
  const clonePersonaMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/personas/clone/${id}`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to clone persona');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/personas/my-personas'] });
    },
  });

  // Toggle sandbox status mutation
  const toggleSandboxMutation = useMutation({
    mutationFn: async ({ id, isSandbox }: { id: number; isSandbox: boolean }) => {
      const response = await fetch(`/api/personas/${id}/sandbox`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ isSandbox }),
      });
      if (!response.ok) throw new Error('Failed to toggle sandbox status');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/personas/my-personas'] });
      queryClient.invalidateQueries({ queryKey: ['/api/personas/sandbox'] });
    },
  });

  const handleCreatePersona = async (personaData: any) => {
    await createPersonaMutation.mutateAsync(personaData);
    setIsCreatorOpen(false);
    // Redirect to main dashboard after successful persona creation
    navigate('/');
  };

  const handleUpdatePersona = async (personaData: any) => {
    await updatePersonaMutation.mutateAsync({
      id: editingPersona.id,
      data: personaData,
    });
    setEditingPersona(null);
    setIsCreatorOpen(false);
  };

  const handleDeletePersona = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this persona?')) {
      await deletePersonaMutation.mutateAsync(id);
    }
  };

  const handleClonePersona = async (id: number) => {
    await clonePersonaMutation.mutateAsync(id);
  };

  const handleToggleSandbox = async (id: number, currentStatus: boolean) => {
    await toggleSandboxMutation.mutateAsync({ id, isSandbox: !currentStatus });
  };

  const openEditor = (persona: any) => {
    setEditingPersona(persona);
    setIsCreatorOpen(true);
  };

  const handleUseTemplate = (persona: any) => {
    // Template was used to create a persona, redirect to main dashboard
    navigate('/');
  };

  const handleCreateTemplate = (template: any) => {
    setEditingTemplate(template);
    setIsTemplateCreatorOpen(true);
  };

  const handleSaveTemplate = (template: any) => {
    setEditingTemplate(null);
    setIsTemplateCreatorOpen(false);
  };

  const getSocialPlatformIcon = (platform: string) => {
    const icons = {
      instagram: SiInstagram,
      facebook: SiFacebook,
      twitter: SiX,
      linkedin: SiLinkedin,
      tiktok: SiTiktok,
      youtube: SiYoutube,
      pinterest: SiPinterest,
      snapchat: SiSnapchat,
    };
    return icons[platform as keyof typeof icons] || User;
  };

  const getSocialPlatformColor = (platform: string) => {
    const colors = {
      instagram: 'text-pink-600',
      facebook: 'text-blue-600',
      twitter: 'text-black',
      linkedin: 'text-blue-700',
      tiktok: 'text-black',
      youtube: 'text-red-600',
      pinterest: 'text-red-500',
      snapchat: 'text-yellow-400',
    };
    return colors[platform as keyof typeof colors] || 'text-gray-600';
  };

  const PersonaCard = ({ persona, isOwner = false }: { persona: any; isOwner?: boolean }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{persona.name}</h3>
              <p className="text-sm text-gray-600">{persona.businessType}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {persona.isSandbox && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Sandbox
              </span>
            )}
            {isOwner && (
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => openEditor(persona)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Edit persona"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleToggleSandbox(persona.id, persona.isSandbox)}
                  className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                  title={persona.isSandbox ? 'Remove from sandbox' : 'Add to sandbox'}
                >
                  {persona.isSandbox ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDeletePersona(persona.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete persona"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
            {!isOwner && (
              <button
                onClick={() => handleClonePersona(persona.id)}
                className="p-1 text-gray-400 hover:text-purple-600 transition-colors"
                title="Clone persona"
              >
                <Copy className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Industry: {persona.industry}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Voice: {persona.brandVoice}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              Posts: {persona.contentPreferences?.postingFrequency || 'Daily'}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Target Audience:</p>
            <p className="text-sm text-gray-800 bg-gray-50 rounded-lg p-2">
              {persona.targetAudience}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Social Platforms:</p>
            <div className="flex flex-wrap gap-2">
              {persona.socialPlatforms?.map((platform: string) => {
                const Icon = getSocialPlatformIcon(platform);
                return (
                  <div key={platform} className="flex items-center space-x-1">
                    <Icon className={`w-4 h-4 ${getSocialPlatformColor(platform)}`} />
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Business Goals:</p>
            <div className="flex flex-wrap gap-1">
              {persona.businessGoals?.slice(0, 3).map((goal: string) => (
                <span key={goal} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                  {goal}
                </span>
              ))}
              {persona.businessGoals?.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{persona.businessGoals.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Persona Management</h1>
            <p className="text-gray-600 mt-1">
              Create and manage custom business personas and templates
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {activeTab === 'personas' && (
              <button
                onClick={() => setIsCreatorOpen(true)}
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Create Persona</span>
              </button>
            )}
            {activeTab === 'templates' && (
              <button
                onClick={() => setIsTemplateCreatorOpen(true)}
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Create Template</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg mb-8 w-fit">
          <button
            onClick={() => setActiveTab('personas')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'personas'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>My Personas</span>
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'templates'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Template Library</span>
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'personas' && (
          <>
            {/* My Personas Section */}
            {user && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">My Personas</h2>
                {isLoadingMy ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <div className="animate-pulse">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-24"></div>
                          <div className="h-3 bg-gray-200 rounded w-20"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : myPersonas?.personas?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myPersonas.personas.map((persona: any) => (
                  <PersonaCard key={persona.id} persona={persona} isOwner={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No personas yet</h3>
                <p className="text-gray-600 mb-4">
                  Create your first custom persona to start building sandbox examples
                </p>
                <button
                  onClick={() => setIsCreatorOpen(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create Your First Persona
                </button>
                </div>
              )}
              </div>
            )}

            {/* Sandbox Personas Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Public Sandbox Examples</h2>
              {isLoadingSandbox ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <div className="animate-pulse">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : sandboxPersonas?.personas?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sandboxPersonas.personas.map((persona: any) => (
                <PersonaCard key={persona.id} persona={persona} isOwner={false} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No public sandbox examples yet</h3>
                <p className="text-gray-600">
                  Public sandbox personas created by users will appear here for others to explore and clone
                </p>
              </div>
            )}
            </div>
        </>
      )}

      {activeTab === 'templates' && (
        <TemplateLibrary
          onUseTemplate={handleUseTemplate}
          onCreateTemplate={handleCreateTemplate}
        />
      )}
      </div>

      {/* Persona Creator Modal */}
      <PersonaCreator
        isOpen={isCreatorOpen}
        onClose={() => {
          setIsCreatorOpen(false);
          setEditingPersona(null);
        }}
        onSave={editingPersona ? handleUpdatePersona : handleCreatePersona}
        editingPersona={editingPersona}
      />

      {/* Template Creator Modal */}
      <TemplateCreator
        isOpen={isTemplateCreatorOpen}
        onClose={() => {
          setIsTemplateCreatorOpen(false);
          setEditingTemplate(null);
        }}
        onSave={handleSaveTemplate}
        editingTemplate={editingTemplate}
      />
    </div>
  );
};

export default PersonaManagement;