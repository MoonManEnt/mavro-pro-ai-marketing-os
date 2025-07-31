import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Search, 
  Filter, 
  Star, 
  Users, 
  Copy, 
  Edit, 
  Trash2, 
  Plus, 
  Clock, 
  TrendingUp,
  Eye,
  Heart,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { useAuth } from './Auth/AuthGuard';

interface TemplateLibraryProps {
  onUseTemplate: (template: any) => void;
  onCreateTemplate?: (template: any) => void;
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ 
  onUseTemplate, 
  onCreateTemplate 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'popular' | 'all' | 'mine'>('popular');
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch templates based on view mode
  const templatesQuery = useQuery({
    queryKey: ['/api/templates', viewMode, selectedCategory],
    queryFn: async () => {
      let url = '/api/templates';
      if (viewMode === 'popular') {
        url += '/popular';
      } else if (viewMode === 'mine') {
        url += '/my-templates';
      }
      
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      
      const response = await fetch(`${url}?${params}`, {
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Failed to fetch templates');
      return response.json();
    },
    enabled: viewMode !== 'mine' || !!user,
  });

  // Fetch categories
  const categoriesQuery = useQuery({
    queryKey: ['/api/templates/categories/list'],
  });

  // Use template mutation
  const useTemplateMutation = useMutation({
    mutationFn: async ({ templateId, name }: { templateId: number; name: string }) => {
      const response = await fetch(`/api/templates/${templateId}/use`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error('Failed to use template');
      return response.json();
    },
    onSuccess: (data) => {
      onUseTemplate(data.persona);
      queryClient.invalidateQueries({ queryKey: ['/api/personas/my-personas'] });
    },
  });

  // Delete template mutation
  const deleteTemplateMutation = useMutation({
    mutationFn: async (templateId: number) => {
      const response = await fetch(`/api/templates/${templateId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to delete template');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/templates'] });
    },
  });

  const handleUseTemplate = (template: any) => {
    const customName = prompt(`Enter a name for your persona (or press OK to use "${template.name}"):`);
    if (customName !== null) {
      useTemplateMutation.mutate({
        templateId: template.id,
        name: customName || template.name
      });
    }
  };

  const handleDeleteTemplate = (template: any) => {
    if (window.confirm(`Are you sure you want to delete the template "${template.name}"?`)) {
      deleteTemplateMutation.mutate(template.id);
    }
  };

  const filteredTemplates = templatesQuery.data?.templates?.filter((template: any) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSearch;
  }) || [];

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Healthcare': '🏥',
      'E-commerce': '🛍️',
      'Professional Services': '🎯',
      'Food & Beverage': '🍽️',
      'Fitness & Wellness': '💪',
      'Creative Services': '🎨',
      'Technology': '💻',
      'Education': '📚',
      'Finance': '💰',
      'Real Estate': '🏠'
    };
    return icons[category] || '📁';
  };

  const TemplateCard = ({ template }: { template: any }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-2xl">
              {template.icon || getCategoryIcon(template.category)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                {template.name}
              </h3>
              <p className="text-sm text-gray-500">{template.category}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {template.isSystemTemplate && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                System
              </span>
            )}
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Users className="w-4 h-4" />
              <span>{template.usageCount || 0}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {template.description}
        </p>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-500">Industry:</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{template.industry}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-500">Voice:</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{template.brandVoice}</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-500">Platforms:</span>
            <div className="flex flex-wrap gap-1">
              {template.socialPlatforms?.slice(0, 3).map((platform: string) => (
                <span key={platform} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                  {platform}
                </span>
              ))}
              {template.socialPlatforms?.length > 3 && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  +{template.socialPlatforms.length - 3}
                </span>
              )}
            </div>
          </div>

          {template.tags && template.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {template.tags.slice(0, 3).map((tag: string) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>
              {template.createdAt && new Date(template.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {viewMode === 'mine' && template.createdBy === user?.id && (
              <>
                <button
                  onClick={() => onCreateTemplate?.(template)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Edit template"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteTemplate(template)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete template"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={() => handleUseTemplate(template)}
              disabled={useTemplateMutation.isPending}
              className="flex items-center space-x-1 px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors text-sm"
            >
              <Copy className="w-3 h-3" />
              <span>Use</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-purple-600" />
            <span>Template Library</span>
          </h2>
          <p className="text-gray-600 mt-1">
            Choose from professionally designed persona templates
          </p>
        </div>
        
        {onCreateTemplate && (
          <button
            onClick={() => onCreateTemplate(null)}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Template</span>
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Categories</option>
            {categoriesQuery.data?.categories?.map((category: string) => (
              <option key={category} value={category}>
                {getCategoryIcon(category)} {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('popular')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'popular'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <TrendingUp className="w-4 h-4 inline mr-1" />
            Popular
          </button>
          <button
            onClick={() => setViewMode('all')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'all'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Eye className="w-4 h-4 inline mr-1" />
            All
          </button>
          {user && (
            <button
              onClick={() => setViewMode('mine')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'mine'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Heart className="w-4 h-4 inline mr-1" />
              Mine
            </button>
          )}
        </div>
      </div>

      {/* Templates Grid */}
      {templatesQuery.isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="animate-pulse">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
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
      ) : filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template: any) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery ? 'No templates found' : 'No templates available'}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchQuery 
              ? 'Try adjusting your search terms or filters'
              : 'Templates will appear here once they are created'
            }
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TemplateLibrary;