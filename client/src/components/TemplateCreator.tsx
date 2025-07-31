import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X, Save, Plus, Trash2, Tag, Users, Target, Palette, Hash, Globe } from 'lucide-react';
import { SiInstagram, SiFacebook, SiLinkedin, SiYoutube, SiTiktok, SiPinterest, SiSnapchat } from 'react-icons/si';
import { SiX } from 'react-icons/si';
import { useAuth } from './Auth/AuthGuard';

interface TemplateCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: any) => void;
  editingTemplate?: any;
}

const TemplateCreator: React.FC<TemplateCreatorProps> = ({
  isOpen,
  onClose,
  onSave,
  editingTemplate
}) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    name: editingTemplate?.name || '',
    description: editingTemplate?.description || '',
    category: editingTemplate?.category || 'Professional Services',
    businessType: editingTemplate?.businessType || '',
    industry: editingTemplate?.industry || '',
    targetAudience: editingTemplate?.targetAudience || '',
    brandVoice: editingTemplate?.brandVoice || 'Professional',
    businessGoals: editingTemplate?.businessGoals || [],
    socialPlatforms: editingTemplate?.socialPlatforms || [],
    contentPreferences: editingTemplate?.contentPreferences || {
      contentTypes: [],
      postingFrequency: 'daily',
      preferredTimes: []
    },
    demographics: editingTemplate?.demographics || {
      ageRange: '25-54',
      location: 'Global',
      interests: []
    },
    tags: editingTemplate?.tags || [],
    icon: editingTemplate?.icon || '📁',
    isPublic: editingTemplate?.isPublic ?? true
  });

  const [newGoal, setNewGoal] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [newContentType, setNewContentType] = useState('');
  const [newTime, setNewTime] = useState('');

  const categories = [
    'Professional Services',
    'Healthcare',
    'E-commerce',
    'Food & Beverage',
    'Fitness & Wellness',
    'Creative Services',
    'Technology',
    'Education',
    'Finance',
    'Real Estate',
    'Entertainment',
    'Non-Profit',
    'Consulting',
    'Manufacturing',
    'Other'
  ];

  const brandVoices = [
    'Professional',
    'Friendly',
    'Casual',
    'Inspirational',
    'Authoritative',
    'Conversational',
    'Playful',
    'Trustworthy',
    'Innovative',
    'Empathetic'
  ];

  const socialPlatforms = [
    { id: 'instagram', name: 'Instagram', icon: SiInstagram, color: 'text-pink-600' },
    { id: 'facebook', name: 'Facebook', icon: SiFacebook, color: 'text-blue-600' },
    { id: 'linkedin', name: 'LinkedIn', icon: SiLinkedin, color: 'text-blue-700' },
    { id: 'twitter', name: 'X (Twitter)', icon: SiX, color: 'text-black' },
    { id: 'tiktok', name: 'TikTok', icon: SiTiktok, color: 'text-black' },
    { id: 'youtube', name: 'YouTube', icon: SiYoutube, color: 'text-red-600' },
    { id: 'pinterest', name: 'Pinterest', icon: SiPinterest, color: 'text-red-500' },
    { id: 'snapchat', name: 'Snapchat', icon: SiSnapchat, color: 'text-yellow-400' }
  ];

  const postingFrequencies = [
    { value: 'multiple-daily', label: 'Multiple times daily' },
    { value: 'daily', label: 'Daily' },
    { value: 'few-weekly', label: 'Few times per week' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'bi-weekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const commonEmojis = ['📁', '🏥', '🛍️', '🎯', '🍽️', '💪', '🎨', '💻', '📚', '💰', '🏠', '🎬', '❤️', '🔧', '🌟'];

  const createTemplateMutation = useMutation({
    mutationFn: async (templateData: any) => {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(templateData)
      });
      if (!response.ok) throw new Error('Failed to create template');
      return response.json();
    },
    onSuccess: (data) => {
      onSave(data.template);
      queryClient.invalidateQueries({ queryKey: ['/api/templates'] });
      onClose();
    }
  });

  const updateTemplateMutation = useMutation({
    mutationFn: async (templateData: any) => {
      const response = await fetch(`/api/templates/${editingTemplate.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(templateData)
      });
      if (!response.ok) throw new Error('Failed to update template');
      return response.json();
    },
    onSuccess: (data) => {
      onSave(data.template);
      queryClient.invalidateQueries({ queryKey: ['/api/templates'] });
      onClose();
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTemplate) {
      await updateTemplateMutation.mutateAsync(formData);
    } else {
      await createTemplateMutation.mutateAsync(formData);
    }
  };

  const addToArray = (field: string, value: string, setValue: (value: string) => void) => {
    if (value.trim()) {
      const current = formData[field as keyof typeof formData] as string[];
      if (!current.includes(value.trim())) {
        setFormData(prev => ({
          ...prev,
          [field]: [...current, value.trim()]
        }));
      }
      setValue('');
    }
  };

  const removeFromArray = (field: string, index: number) => {
    const current = formData[field as keyof typeof formData] as string[];
    setFormData(prev => ({
      ...prev,
      [field]: current.filter((_, i) => i !== index)
    }));
  };

  const togglePlatform = (platformId: string) => {
    setFormData(prev => ({
      ...prev,
      socialPlatforms: prev.socialPlatforms.includes(platformId)
        ? prev.socialPlatforms.filter(p => p !== platformId)
        : [...prev.socialPlatforms, platformId]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingTemplate ? 'Edit Template' : 'Create New Template'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Healthcare Professional"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Brief description of this template..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Type *
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessType}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Healthcare Provider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry *
                </label>
                <input
                  type="text"
                  required
                  value={formData.industry}
                  onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Healthcare"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand Voice
                </label>
                <select
                  value={formData.brandVoice}
                  onChange={(e) => setFormData(prev => ({ ...prev, brandVoice: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {brandVoices.map(voice => (
                    <option key={voice} value={voice}>{voice}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Audience
              </label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Describe the ideal audience for this persona..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-center"
                  placeholder="📁"
                />
                <div className="flex flex-wrap gap-2">
                  {commonEmojis.map(emoji => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, icon: emoji }))}
                      className="p-1 hover:bg-gray-100 rounded text-lg"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Business Goals */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Business Goals</h3>
            
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('businessGoals', newGoal, setNewGoal))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Add business goal..."
              />
              <button
                type="button"
                onClick={() => addToArray('businessGoals', newGoal, setNewGoal)}
                className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.businessGoals.map((goal, index) => (
                <span
                  key={index}
                  className="flex items-center space-x-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full"
                >
                  <Target className="w-3 h-3" />
                  <span>{goal}</span>
                  <button
                    type="button"
                    onClick={() => removeFromArray('businessGoals', index)}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Social Platforms */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Social Platforms</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {socialPlatforms.map(platform => {
                const IconComponent = platform.icon;
                const isSelected = formData.socialPlatforms.includes(platform.id);
                
                return (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => togglePlatform(platform.id)}
                    className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                      isSelected
                        ? 'bg-purple-50 border-purple-300 text-purple-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isSelected ? 'text-purple-600' : platform.color}`} />
                    <span className="text-sm font-medium">{platform.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Content Preferences</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Posting Frequency
                </label>
                <select
                  value={formData.contentPreferences.postingFrequency}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contentPreferences: {
                      ...prev.contentPreferences,
                      postingFrequency: e.target.value
                    }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {postingFrequencies.map(freq => (
                    <option key={freq.value} value={freq.value}>{freq.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content Types
              </label>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={newContentType}
                  onChange={(e) => setNewContentType(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('contentPreferences.contentTypes', newContentType, setNewContentType))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Add content type..."
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newContentType.trim()) {
                      const current = formData.contentPreferences.contentTypes;
                      if (!current.includes(newContentType.trim())) {
                        setFormData(prev => ({
                          ...prev,
                          contentPreferences: {
                            ...prev.contentPreferences,
                            contentTypes: [...current, newContentType.trim()]
                          }
                        }));
                      }
                      setNewContentType('');
                    }
                  }}
                  className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.contentPreferences.contentTypes.map((type, index) => (
                  <span
                    key={index}
                    className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                  >
                    <span>{type}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const current = formData.contentPreferences.contentTypes;
                        setFormData(prev => ({
                          ...prev,
                          contentPreferences: {
                            ...prev.contentPreferences,
                            contentTypes: current.filter((_, i) => i !== index)
                          }
                        }));
                      }}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Demographics */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Demographics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age Range
                </label>
                <input
                  type="text"
                  value={formData.demographics.ageRange}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    demographics: {
                      ...prev.demographics,
                      ageRange: e.target.value
                    }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., 25-54"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.demographics.location}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    demographics: {
                      ...prev.demographics,
                      location: e.target.value
                    }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Global, Local, US"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interests
              </label>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('demographics.interests', newInterest, setNewInterest))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Add interest..."
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newInterest.trim()) {
                      const current = formData.demographics.interests;
                      if (!current.includes(newInterest.trim())) {
                        setFormData(prev => ({
                          ...prev,
                          demographics: {
                            ...prev.demographics,
                            interests: [...current, newInterest.trim()]
                          }
                        }));
                      }
                      setNewInterest('');
                    }
                  }}
                  className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.demographics.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full"
                  >
                    <span>{interest}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const current = formData.demographics.interests;
                        setFormData(prev => ({
                          ...prev,
                          demographics: {
                            ...prev.demographics,
                            interests: current.filter((_, i) => i !== index)
                          }
                        }));
                      }}
                      className="ml-1 text-green-600 hover:text-green-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Tags</h3>
            
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('tags', newTag, setNewTag))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Add tag..."
              />
              <button
                type="button"
                onClick={() => addToArray('tags', newTag, setNewTag)}
                className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center space-x-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full"
                >
                  <Hash className="w-3 h-3" />
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeFromArray('tags', index)}
                    className="ml-1 text-gray-600 hover:text-gray-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Privacy Settings</h3>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isPublic"
                checked={formData.isPublic}
                onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublic" className="text-sm font-medium text-gray-700">
                Make this template public for others to use
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createTemplateMutation.isPending || updateTemplateMutation.isPending}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>
                {createTemplateMutation.isPending || updateTemplateMutation.isPending
                  ? 'Saving...'
                  : editingTemplate
                  ? 'Update Template'
                  : 'Create Template'
                }
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TemplateCreator;