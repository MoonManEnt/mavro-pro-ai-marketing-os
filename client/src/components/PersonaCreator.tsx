import React, { useState } from 'react';
import { X, Plus, Save, User, Target, Mic, Calendar, Users, Lightbulb } from 'lucide-react';
import { SiInstagram, SiFacebook, SiX, SiLinkedin, SiTiktok, SiYoutube, SiPinterest, SiSnapchat } from 'react-icons/si';

interface PersonaCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (persona: any) => void;
  editingPersona?: any;
}

const PersonaCreator: React.FC<PersonaCreatorProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editingPersona 
}) => {
  const [formData, setFormData] = useState({
    name: editingPersona?.name || '',
    businessType: editingPersona?.businessType || '',
    industry: editingPersona?.industry || '',
    targetAudience: editingPersona?.targetAudience || '',
    brandVoice: editingPersona?.brandVoice || '',
    businessGoals: editingPersona?.businessGoals || [],
    socialPlatforms: editingPersona?.socialPlatforms || [],
    contentPreferences: editingPersona?.contentPreferences || {
      contentTypes: [],
      postingFrequency: 'daily',
      preferredTimes: []
    },
    demographics: editingPersona?.demographics || {
      ageRange: '',
      location: '',
      interests: []
    },
    isSandbox: editingPersona?.isSandbox || false
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const businessTypes = [
    'Keynote Speaker',
    'Real Estate Agent',
    'MedSpa Owner',
    'Restaurant Owner',
    'Fitness Coach',
    'Auto Dealer',
    'Consultant',
    'E-commerce Store',
    'Professional Services',
    'Creative Agency',
    'Healthcare Provider',
    'Education/Training',
    'Non-Profit',
    'Technology Company',
    'Other'
  ];

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Real Estate',
    'Food & Beverage',
    'Fitness & Wellness',
    'Automotive',
    'Beauty & Cosmetics',
    'Professional Services',
    'Entertainment',
    'Travel & Hospitality',
    'Retail',
    'Manufacturing',
    'Other'
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

  const contentTypes = [
    'Educational Posts',
    'Behind-the-Scenes',
    'Product Showcases',
    'Customer Testimonials',
    'Industry News',
    'Personal Stories',
    'How-To Guides',
    'Live Streams',
    'Polls & Questions',
    'User-Generated Content'
  ];

  const brandVoices = [
    'Professional',
    'Friendly',
    'Authoritative',
    'Casual',
    'Inspirational',
    'Humorous',
    'Educational',
    'Conversational'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleArrayToggle = (field: string, item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i: string) => i !== item)
        : [...prev[field], item]
    }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Persona name is required';
    }

    if (!formData.businessType) {
      newErrors.businessType = 'Business type is required';
    }

    if (!formData.industry) {
      newErrors.industry = 'Industry is required';
    }

    if (!formData.targetAudience.trim()) {
      newErrors.targetAudience = 'Target audience is required';
    }

    if (!formData.brandVoice) {
      newErrors.brandVoice = 'Brand voice is required';
    }

    if (formData.businessGoals.length === 0) {
      newErrors.businessGoals = 'At least one business goal is required';
    }

    if (formData.socialPlatforms.length === 0) {
      newErrors.socialPlatforms = 'At least one social platform is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving persona:', error);
      setErrors({ submit: 'Failed to save persona. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingPersona ? 'Edit Persona' : 'Create New Persona'}
                </h2>
                <p className="text-sm text-gray-600">
                  Build a custom business persona for live sandbox examples
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <User className="w-5 h-5 mr-2 text-purple-600" />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Persona Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Sarah Johnson"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type *
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => handleInputChange('businessType', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.businessType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select business type</option>
                  {businessTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.businessType && <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry *
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.industry ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
                {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Voice *
                </label>
                <select
                  value={formData.brandVoice}
                  onChange={(e) => handleInputChange('brandVoice', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.brandVoice ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select brand voice</option>
                  {brandVoices.map(voice => (
                    <option key={voice} value={voice}>{voice}</option>
                  ))}
                </select>
                {errors.brandVoice && <p className="text-red-500 text-sm mt-1">{errors.brandVoice}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience *
              </label>
              <textarea
                value={formData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.targetAudience ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe your target audience..."
              />
              {errors.targetAudience && <p className="text-red-500 text-sm mt-1">{errors.targetAudience}</p>}
            </div>
          </div>

          {/* Business Goals */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-600" />
              Business Goals *
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                'Increase Brand Awareness',
                'Generate Leads',
                'Drive Sales',
                'Build Community',
                'Educate Audience',
                'Share Expertise',
                'Network & Connect',
                'Showcase Products',
                'Customer Support',
                'Recruit Talent'
              ].map(goal => (
                <label key={goal} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.businessGoals.includes(goal)}
                    onChange={() => handleArrayToggle('businessGoals', goal)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">{goal}</span>
                </label>
              ))}
            </div>
            {errors.businessGoals && <p className="text-red-500 text-sm mt-1">{errors.businessGoals}</p>}
          </div>

          {/* Social Platforms */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2 text-purple-600" />
              Social Media Platforms *
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {socialPlatforms.map(platform => {
                const Icon = platform.icon;
                return (
                  <label key={platform.id} className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.socialPlatforms.includes(platform.id)}
                      onChange={() => handleArrayToggle('socialPlatforms', platform.id)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <Icon className={`w-5 h-5 ${platform.color}`} />
                    <span className="text-sm font-medium text-gray-700">{platform.name}</span>
                  </label>
                );
              })}
            </div>
            {errors.socialPlatforms && <p className="text-red-500 text-sm mt-1">{errors.socialPlatforms}</p>}
          </div>

          {/* Content Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-purple-600" />
              Content Preferences
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {contentTypes.map(type => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.contentPreferences.contentTypes.includes(type)}
                    onChange={() => {
                      const newTypes = formData.contentPreferences.contentTypes.includes(type)
                        ? formData.contentPreferences.contentTypes.filter(t => t !== type)
                        : [...formData.contentPreferences.contentTypes, type];
                      handleNestedChange('contentPreferences', 'contentTypes', newTypes);
                    }}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Posting Frequency
                </label>
                <select
                  value={formData.contentPreferences.postingFrequency}
                  onChange={(e) => handleNestedChange('contentPreferences', 'postingFrequency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="multiple-daily">Multiple times daily</option>
                  <option value="few-weekly">Few times a week</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>

          {/* Demographics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2 text-purple-600" />
              Target Demographics
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Range
                </label>
                <select
                  value={formData.demographics.ageRange}
                  onChange={(e) => handleNestedChange('demographics', 'ageRange', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select age range</option>
                  <option value="18-24">18-24</option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45-54">45-54</option>
                  <option value="55+">55+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Location
                </label>
                <input
                  type="text"
                  value={formData.demographics.location}
                  onChange={(e) => handleNestedChange('demographics', 'location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., United States, California, Global"
                />
              </div>
            </div>
          </div>

          {/* Sandbox Option */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="sandbox"
                checked={formData.isSandbox}
                onChange={(e) => handleInputChange('isSandbox', e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="sandbox" className="text-sm font-medium text-gray-700">
                Make this persona available as a public sandbox example
              </label>
            </div>
            <p className="text-sm text-gray-500 ml-7">
              Other users will be able to test and learn from this persona in demo mode
            </p>
          </div>

          {/* Submit */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800">{errors.submit}</p>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{editingPersona ? 'Updating...' : 'Creating...'}</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{editingPersona ? 'Update Persona' : 'Create Persona'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonaCreator;