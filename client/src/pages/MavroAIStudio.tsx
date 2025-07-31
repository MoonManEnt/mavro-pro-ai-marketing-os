import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
// Note: ViVi integration will be connected when ViVi context is available
import {
  Wand2,
  Sparkles,
  Brain,
  Zap,
  Target,
  TrendingUp,
  Image,
  Video,
  FileText,
  MessageSquare,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Play,
  Pause,
  Download,
  Share,
  Copy,
  RefreshCw,
  Settings,
  BarChart3,
  Calendar,
  Clock,
  Check,
  Globe,
  Hash,
  Plus,
  X,
  ArrowLeft,
  Home
} from 'lucide-react';

interface ContentProject {
  id: string;
  title: string;
  type: 'image' | 'video' | 'text' | 'campaign';
  status: 'draft' | 'generating' | 'ready' | 'published';
  platform: string[];
  progress: number;
  createdAt: string;
  preview?: string;
}

interface StudioTemplate {
  id: string;
  name: string;
  category: 'social' | 'blog' | 'ad' | 'email' | 'video';
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

const MavroAIStudio = () => {
  // AI Studio Wizard State
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [activePlatformView, setActivePlatformView] = useState<string | 'all'>('all');
  const [savedContent, setSavedContent] = useState<Array<{id: string, content: string, platforms: string[], template: string}>>([]);
  const [tone, setTone] = useState('professional');
  const [contentLength, setContentLength] = useState('medium');
  const [creativity, setCreativity] = useState(70);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [customHashtag, setCustomHashtag] = useState('');
  const [showHashtagInput, setShowHashtagInput] = useState(false);
  const [selectedAIGenerators, setSelectedAIGenerators] = useState<string[]>([]);
  const [generatedMedia, setGeneratedMedia] = useState<Array<{id: string, type: 'image'|'video', url: string, generator: string, prompt: string}>>([]);
  const [mediaPrompt, setMediaPrompt] = useState('');

  // Wizard Steps Configuration
  const wizardSteps = [
    { id: 1, title: 'Choose Template', subtitle: 'Select content type', active: currentStep === 1 },
    { id: 2, title: 'Configure AI', subtitle: 'Set tone and style', active: currentStep === 2 },
    { id: 3, title: 'Create Content', subtitle: 'AI content generation', active: currentStep === 3 },
    { id: 4, title: 'AI Media Studio', subtitle: 'Generate visuals & video', active: currentStep === 4 },
    { id: 5, title: 'Review & Export', subtitle: 'Finalize your content', active: currentStep === 5 },
  ];

  // Generate platform-specific hashtags
  const generateHashtags = (platforms: string[], template: string, tone: string) => {
    const hashtagBank = {
      instagram: ['#InstaContent', '#VisualStory', '#Creative', '#Engagement', '#Brand', '#Growth', '#Community', '#Discover'],
      facebook: ['#SocialMedia', '#Business', '#Marketing', '#Content', '#Community', '#Professional', '#Growth', '#Engagement'],
      twitter: ['#Twitter', '#SocialMedia', '#Trending', '#Content', '#Marketing', '#Business', '#Growth', '#Community'],
      linkedin: ['#LinkedIn', '#Professional', '#Business', '#Networking', '#Career', '#Industry', '#Leadership', '#Growth'],
      youtube: ['#YouTube', '#Video', '#Content', '#Creator', '#Education', '#Entertainment', '#Viral', '#Subscribe']
    };

    const templateHashtags = {
      'social-post': ['#SocialPost', '#Content', '#Marketing', '#Brand'],
      'ad-creative': ['#Advertising', '#Marketing', '#Campaign', '#Business'],
      'blog-article': ['#Blog', '#Article', '#Content', '#Writing'],
      'video-script': ['#Video', '#Script', '#Content', '#Creator'],
      'email-campaign': ['#Email', '#Marketing', '#Campaign', '#Newsletter'],
      'product-description': ['#Product', '#Description', '#Sales', '#Marketing']
    };

    const toneHashtags = {
      professional: ['#Professional', '#Business', '#Quality'],
      casual: ['#Casual', '#Friendly', '#Relatable'],
      authoritative: ['#Expert', '#Authority', '#Leadership'],
      creative: ['#Creative', '#Innovation', '#Inspiration'],
      inspirational: ['#Inspiration', '#Motivation', '#Success']
    };

    let generatedHashtags: string[] = [];

    // Add platform-specific hashtags
    platforms.forEach(platform => {
      const platformTags = hashtagBank[platform as keyof typeof hashtagBank] || [];
      generatedHashtags.push(...platformTags.slice(0, 2));
    });

    // Add template-specific hashtags
    const templateTags = templateHashtags[template as keyof typeof templateHashtags] || [];
    generatedHashtags.push(...templateTags.slice(0, 2));

    // Add tone-specific hashtags
    const toneTags = toneHashtags[tone as keyof typeof toneHashtags] || [];
    generatedHashtags.push(...toneTags.slice(0, 1));

    // Remove duplicates and limit to 10 hashtags
    return [...new Set(generatedHashtags)].slice(0, 10);
  };

  // Mock ViVi integration for demo
  const generateContent = async (prompt: string, options: any) => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate adaptive hashtags
    const generatedHashtags = generateHashtags(options.platforms || [], options.template || '', options.tone || 'professional');
    setHashtags(generatedHashtags);
    
    setIsGenerating(false);
    return `AI-generated content for: "${prompt}"\n\nThis is a sample response generated by Mavro AI Studio. The content has been optimized for ${options.platforms?.join(', ') || 'selected platforms'} with a ${options.tone || 'professional'} tone.`;
  };

  // Hashtag management functions
  const addCustomHashtag = () => {
    if (customHashtag.trim() && !hashtags.includes(customHashtag.trim())) {
      const formattedHashtag = customHashtag.startsWith('#') ? customHashtag : `#${customHashtag}`;
      setHashtags([...hashtags, formattedHashtag]);
      setCustomHashtag('');
      setShowHashtagInput(false);
    }
  };

  const removeHashtag = (tagToRemove: string) => {
    setHashtags(hashtags.filter(tag => tag !== tagToRemove));
  };

  const regenerateHashtags = () => {
    if (selectedTemplate && selectedPlatforms.length > 0) {
      const newHashtags = generateHashtags(selectedPlatforms, selectedTemplate, tone);
      setHashtags(newHashtags);
    }
  };
  const [projects, setProjects] = useState<ContentProject[]>([
    {
      id: '1',
      title: 'Q1 Marketing Campaign',
      type: 'campaign',
      status: 'ready',
      platform: ['instagram', 'facebook', 'linkedin'],
      progress: 100,
      createdAt: '2025-01-18T10:00:00Z',
      preview: 'Transform your business with AI-powered marketing solutions...'
    },
    {
      id: '2',
      title: 'Product Launch Video',
      type: 'video',
      status: 'generating',
      platform: ['youtube', 'instagram'],
      progress: 67,
      createdAt: '2025-01-18T09:30:00Z'
    },
    {
      id: '3',
      title: 'Weekly Newsletter',
      type: 'text',
      status: 'draft',
      platform: ['email'],
      progress: 25,
      createdAt: '2025-01-18T08:15:00Z'
    }
  ]);

  const studioTemplates: StudioTemplate[] = [
    {
      id: 'social-post',
      name: 'Social Media Post',
      category: 'social',
      description: 'Engaging posts optimized for social platforms',
      icon: <MessageSquare className="w-6 h-6" />,
      gradient: 'from-pink-500 to-violet-600'
    },
    {
      id: 'ad-creative',
      name: 'Ad Creative',
      category: 'ad',
      description: 'High-converting ad copy and visuals',
      icon: <Target className="w-6 h-6" />,
      gradient: 'from-orange-500 to-red-600'
    },
    {
      id: 'blog-article',
      name: 'Blog Article',
      category: 'blog',
      description: 'SEO-optimized long-form content',
      icon: <FileText className="w-6 h-6" />,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'video-script',
      name: 'Video Script',
      category: 'video',
      description: 'Compelling scripts for video content',
      icon: <Video className="w-6 h-6" />,
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'email-campaign',
      name: 'Email Campaign',
      category: 'email',
      description: 'Personalized email sequences',
      icon: <MessageSquare className="w-6 h-6" />,
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'product-description',
      name: 'Product Description',
      category: 'text',
      description: 'Persuasive product descriptions',
      icon: <Sparkles className="w-6 h-6" />,
      gradient: 'from-yellow-500 to-orange-600'
    }
  ];

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, 
      color: 'bg-gradient-to-r from-pink-500 to-purple-600', 
      activeColor: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white',
      borderColor: 'border-pink-500' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, 
      color: 'bg-blue-600', 
      activeColor: 'bg-blue-600 text-white',
      borderColor: 'border-blue-600' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, 
      color: 'bg-black', 
      activeColor: 'bg-black text-white',
      borderColor: 'border-black' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, 
      color: 'bg-blue-700', 
      activeColor: 'bg-blue-700 text-white',
      borderColor: 'border-blue-700' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, 
      color: 'bg-red-600', 
      activeColor: 'bg-red-600 text-white',
      borderColor: 'border-red-600' }
  ];

  // Navigation Functions
  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleGenerateContent = async () => {
    if (!prompt.trim() || !selectedTemplate) return;

    try {
      const result = await generateContent(prompt, {
        template: selectedTemplate,
        platforms: selectedPlatforms,
        tone,
        length: contentLength
      });

      setGeneratedContent(result);
      
      // Save the generated content
      const contentId = Date.now().toString();
      setSavedContent(prev => [...prev, {
        id: contentId,
        content: result,
        platforms: selectedPlatforms,
        template: selectedTemplate
      }]);
      
      nextStep(); // Move to AI media step
    } catch (error) {
      console.error('Generation error:', error);
    }
  };

  const handleAddMoreCreatives = () => {
    // Reset to step 1 but keep saved content
    setCurrentStep(1);
    setSelectedTemplate(null);
    setPrompt('');
    setGeneratedContent('');
    // Don't reset selectedPlatforms or savedContent - keep them for building multiple creatives
  };

  const getStatusColor = (status: ContentProject['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-500';
      case 'generating': return 'bg-yellow-500';
      case 'ready': return 'bg-green-500';
      case 'published': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: ContentProject['type']) => {
    switch (type) {
      case 'image': return Image;
      case 'video': return Video;
      case 'text': return FileText;
      case 'campaign': return Target;
      default: return FileText;
    }
  };

  // Platform-specific content format definitions
  const platformFormats = {
    instagram: [
      { type: 'Feed Post', aspectRatio: '1:1', description: 'Square format for main feed' },
      { type: 'Feed Post', aspectRatio: '4:5', description: 'Portrait format for main feed' },
      { type: 'Carousel Post', aspectRatio: '1:1', description: 'Multiple slides, square format' },
      { type: 'Story', aspectRatio: '9:16', description: 'Vertical, 15s max per slide' },
      { type: 'Reel', aspectRatio: '9:16', description: 'Vertical, up to 90s TikTok-style' },
      { type: 'IGTV/Video', aspectRatio: '16:9', description: 'Horizontal longer-form video' },
    ],
    facebook: [
      { type: 'Image Post', aspectRatio: '1.91:1', description: 'Optimized for feed display' },
      { type: 'Image Post', aspectRatio: '4:5', description: 'Portrait format for feed' },
      { type: 'Video Post', aspectRatio: '16:9', description: 'Landscape video format' },
      { type: 'Video Post', aspectRatio: '1:1', description: 'Square video format' },
      { type: 'Carousel Post', aspectRatio: '1:1', description: '2-10 mixed media cards' },
      { type: 'Story', aspectRatio: '9:16', description: 'Vertical, 20s max' },
    ],
    twitter: [
      { type: 'Text Tweet', aspectRatio: 'text', description: 'Up to 280 characters' },
      { type: 'Image Tweet', aspectRatio: '16:9', description: 'Single or up to 4 images' },
      { type: 'Video Tweet', aspectRatio: '16:9', description: 'Up to 2m 20s' },
    ],
    linkedin: [
      { type: 'Image Post', aspectRatio: '1:1', description: 'Square professional format' },
      { type: 'Image Post', aspectRatio: '1.91:1', description: 'Landscape professional format' },
      { type: 'Video Post', aspectRatio: '16:9', description: 'Horizontal, up to 10 min' },
    ],
    tiktok: [
      { type: 'Short-Form Video', aspectRatio: '9:16', description: 'Vertical, 15-60s' },
    ],
    youtube: [
      { type: 'Shorts', aspectRatio: '9:16', description: 'Vertical, ≤60s' },
      { type: 'Standard Video', aspectRatio: '16:9', description: 'Horizontal, any length' },
    ],
  };

  const renderPlatformPreviews = (platformId: string, content: string) => {
    const formats = platformFormats[platformId as keyof typeof platformFormats] || [];
    
    return formats.map((format, index) => (
      <div key={index} className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl border border-white border-opacity-30 overflow-hidden shadow-lg">
        {/* Format Header */}
        <div className="px-4 py-3 bg-white bg-opacity-10 border-b border-white border-opacity-20">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">{format.type}</h4>
            <span className="text-sm text-gray-600 font-medium">{format.aspectRatio}</span>
          </div>
          <p className="text-xs text-gray-700 mt-1">{format.description}</p>
        </div>
        
        {/* Content Preview */}
        <div className="p-4">
          {format.aspectRatio === 'text' ? (
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-800">{content.slice(0, 280)}</p>
                <div className="text-xs text-gray-500 mt-2">
                  {content.length}/280 characters
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Visual Content Preview */}
              <div className={`bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center border border-purple-200 ${
                format.aspectRatio === '9:16' ? 'aspect-[9/16] max-h-64' :
                format.aspectRatio === '16:9' ? 'aspect-video' :
                format.aspectRatio === '4:5' ? 'aspect-[4/5] max-h-64' :
                format.aspectRatio === '1.91:1' ? 'aspect-[1.91/1]' :
                'aspect-square max-h-64'
              }`}>
                {format.type.includes('Video') || format.type.includes('Reel') || format.type.includes('Shorts') ? (
                  <div className="text-center">
                    <Play className="w-10 h-10 text-purple-600 mx-auto mb-2" />
                    <span className="text-sm text-purple-600 font-medium">Video Preview</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <Image className="w-10 h-10 text-purple-600 mx-auto mb-2" />
                    <span className="text-sm text-purple-600 font-medium">Image Preview</span>
                  </div>
                )}
              </div>
              
              {/* Content Text */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-800 leading-relaxed">{content}</p>
                <div className="text-xs text-gray-500 mt-2">
                  AI-generated content for "{format.type}". This is a sample response generated by Mavro AI Studio. The content has been optimized for {platformId === 'instagram' ? 'Instagram' : platformId === 'facebook' ? 'Facebook' : platformId === 'twitter' ? 'Twitter/X' : platformId === 'linkedin' ? 'LinkedIn' : platformId === 'tiktok' ? 'TikTok' : 'YouTube'} engagement.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900">
      {/* Header */}
      <div className="px-8 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Wand2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Mavro AI Studio</h1>
              <p className="text-white text-opacity-80">Create professional content with AI-powered assistance</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <a href="/landing" className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-lg hover:bg-opacity-30 transition-all duration-200">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Landing</span>
            </a>
            <button className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-lg hover:bg-opacity-30 transition-all duration-200">
              Last 30 days
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200">
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="px-8 pb-8">
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          {/* Step Progress */}
          <div className="mb-12">
            <div className="max-w-5xl mx-auto">
              {/* Step Indicators Container */}
              <div className="relative">
                {/* Progress Bar - positioned to align with step centers */}
                <div className="absolute top-8 left-0 w-full h-1 bg-white bg-opacity-20 rounded-full" style={{ left: '8%', width: '84%' }}>
                  <div 
                    className="h-full bg-white transition-all duration-500 rounded-full"
                    style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                  />
                </div>
                
                {/* Step Indicators */}
                <div className="flex items-start justify-between w-full relative z-10">
                  {wizardSteps.map((step, index) => (
                    <div key={step.id} className="flex flex-col items-center" style={{ width: '160px' }}>
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shadow-lg transition-all duration-300 ${
                        step.id < currentStep ? 'bg-white text-purple-600 scale-110' : 
                        step.id === currentStep ? 'bg-white text-purple-600 scale-110' : 
                        'bg-white bg-opacity-20 text-white border-2 border-white border-opacity-30'
                      }`}>
                        {step.id < currentStep ? <Check className="w-5 h-5" /> : step.id}
                      </div>
                      <div className="text-center mt-3 px-1">
                        <p className={`text-sm font-semibold leading-tight ${
                          step.id <= currentStep ? 'text-white' : 'text-white text-opacity-60'
                        }`}>
                          {step.title}
                        </p>
                        <p className={`text-xs mt-1 leading-tight ${
                          step.id <= currentStep ? 'text-white text-opacity-80' : 'text-white text-opacity-40'
                        }`}>
                          {step.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-lg">
        {/* Step 1: Choose Template */}
        {currentStep === 1 && (
          <div className="px-8 py-6 space-y-8">
            <div className="text-center">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Template</h4>
              <p className="text-gray-600">Select the type of content you want to create</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {studioTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedTemplate === template.id
                      ? 'border-purple-400 bg-purple-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${template.gradient} flex items-center justify-center text-white`}>
                      {template.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{template.category}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{template.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Configure AI */}
        {currentStep === 2 && (
          <div className="px-8 py-6 space-y-8">
            <div className="text-center">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Configure AI Settings</h4>
              <p className="text-gray-600">Fine-tune how your content will be generated</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-8">
              {/* Target Platforms */}
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <label className="text-xl font-bold text-gray-900">Target Platforms</label>
                </div>
                <div className="flex flex-wrap gap-3">
                  {platforms.map((platform) => {
                    const Icon = platform.icon;
                    const isSelected = selectedPlatforms.includes(platform.id);
                    return (
                      <button
                        key={platform.id}
                        onClick={() => {
                          setSelectedPlatforms(prev =>
                            isSelected
                              ? prev.filter(p => p !== platform.id)
                              : [...prev, platform.id]
                          );
                        }}
                        className={`flex items-center space-x-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                          isSelected 
                            ? `${platform.color} text-white border-transparent shadow-lg` 
                            : "border-gray-200 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{platform.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* AI Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-lg">
                  <label className="text-lg font-bold text-gray-900 mb-4 block">Tone & Style</label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="w-full h-12 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl text-gray-900 font-medium hover:border-purple-300 focus:border-purple-400 transition-all duration-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-xl border-2 border-purple-200 shadow-xl">
                      <SelectItem value="professional" className="focus:bg-gradient-to-r focus:from-purple-50 focus:to-blue-50 rounded-lg m-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <div>
                            <div className="font-medium">Professional</div>
                            <div className="text-xs text-gray-500">Formal, business-focused tone</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="casual" className="focus:bg-gradient-to-r focus:from-purple-50 focus:to-blue-50 rounded-lg m-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div>
                            <div className="font-medium">Casual & Friendly</div>
                            <div className="text-xs text-gray-500">Approachable, conversational tone</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="authoritative" className="focus:bg-gradient-to-r focus:from-purple-50 focus:to-blue-50 rounded-lg m-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div>
                            <div className="font-medium">Authoritative</div>
                            <div className="text-xs text-gray-500">Expert, confident tone</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="creative" className="focus:bg-gradient-to-r focus:from-purple-50 focus:to-blue-50 rounded-lg m-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                          <div>
                            <div className="font-medium">Creative & Fun</div>
                            <div className="text-xs text-gray-500">Playful, engaging tone</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="inspirational" className="focus:bg-gradient-to-r focus:from-purple-50 focus:to-blue-50 rounded-lg m-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div>
                            <div className="font-medium">Inspirational</div>
                            <div className="text-xs text-gray-500">Motivating, uplifting tone</div>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-lg">
                  <label className="text-lg font-bold text-gray-900 mb-4 block">Content Length</label>
                  <Select value={contentLength} onValueChange={setContentLength}>
                    <SelectTrigger className="w-full h-12 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl text-gray-900 font-medium hover:border-blue-300 focus:border-blue-400 transition-all duration-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-xl border-2 border-blue-200 shadow-xl">
                      <SelectItem value="short" className="focus:bg-gradient-to-r focus:from-blue-50 focus:to-purple-50 rounded-lg m-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div>
                            <div className="font-medium">Short (50-100 words)</div>
                            <div className="text-xs text-gray-500">Quick, concise content</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="medium" className="focus:bg-gradient-to-r focus:from-blue-50 focus:to-purple-50 rounded-lg m-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <div>
                            <div className="font-medium">Medium (100-300 words)</div>
                            <div className="text-xs text-gray-500">Balanced detail and brevity</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="long" className="focus:bg-gradient-to-r focus:from-blue-50 focus:to-purple-50 rounded-lg m-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <div>
                            <div className="font-medium">Long (300+ words)</div>
                            <div className="text-xs text-gray-500">Detailed, comprehensive content</div>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Creativity Level */}
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-lg">
                <label className="text-lg font-bold text-gray-900 mb-4 block">Creativity Level</label>
                <div className="space-y-6">
                  <div className="relative px-2">
                    {/* Custom Slider Track */}
                    <div className="w-full h-2 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-full shadow-inner">
                      <div 
                        className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 shadow-lg"
                        style={{ width: `${creativity}%` }}
                      />
                    </div>
                    
                    {/* Custom Slider Thumb */}
                    <div 
                      className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white border-4 border-purple-500 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-all duration-200"
                      style={{ left: `${creativity}%` }}
                    />
                    
                    {/* Hidden input for functionality */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={creativity}
                      onChange={(e) => setCreativity(Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  
                  {/* Labels and Percentage */}
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600 font-medium">Conservative</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl shadow-lg">
                      <Brain className="w-4 h-4" />
                      <span className="font-bold text-lg">{creativity}%</span>
                      <span className="text-sm opacity-90">Creative</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600 font-medium">Creative</span>
                      <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="text-center">
                    <p className="text-xs text-gray-500 italic">
                      {creativity < 30 ? "More structured, predictable content" : 
                       creativity < 70 ? "Balanced creativity with structure" : 
                       "Highly creative, innovative content"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Adaptive Hashtag Selection */}
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Hash className="w-5 h-5 text-white" />
                    </div>
                    <label className="text-xl font-bold text-gray-900">Adaptive Hashtags</label>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={regenerateHashtags}
                      className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                    >
                      <RefreshCw className="w-4 h-4 inline mr-1" />
                      Regenerate
                    </button>
                    <button
                      onClick={() => setShowHashtagInput(!showHashtagInput)}
                      className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-all duration-200"
                    >
                      <Plus className="w-4 h-4 inline mr-1" />
                      Add Custom
                    </button>
                  </div>
                </div>

                {/* Custom Hashtag Input */}
                {showHashtagInput && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                    <div className="flex space-x-2">
                      <Input
                        type="text"
                        value={customHashtag}
                        onChange={(e) => setCustomHashtag(e.target.value)}
                        placeholder="Enter custom hashtag (without #)"
                        className="flex-1 border-2 border-gray-200 rounded-lg"
                        onKeyPress={(e) => e.key === 'Enter' && addCustomHashtag()}
                      />
                      <Button onClick={addCustomHashtag} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                        Add
                      </Button>
                    </div>
                  </div>
                )}

                {/* Hashtag Display */}
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 min-h-[60px] p-3 bg-gray-50 rounded-xl border-2 border-gray-200">
                    {hashtags.length > 0 ? (
                      hashtags.map((hashtag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                        >
                          <span>{hashtag}</span>
                          <button
                            onClick={() => removeHashtag(hashtag)}
                            className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm italic">Hashtags will be generated automatically when you create content</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-600">
                    AI will automatically generate hashtags based on your selected platforms, content type, and tone. You can add custom hashtags or regenerate suggestions.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Create Content */}
        {currentStep === 3 && (
          <div className="px-8 py-6 space-y-8">
            <div className="text-center">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Create Your Content</h4>
              <p className="text-gray-600">Describe what you want to create and let AI do the work</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 shadow-lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <label className="text-xl font-bold text-gray-900">Content Prompt</label>
                </div>
                
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your content idea in detail... For example: 'Create an engaging Instagram post about the benefits of morning workouts for busy professionals, include tips and motivational language'"
                  className="w-full h-48 px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 resize-none text-lg leading-relaxed transition-all duration-200"
                />
                
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Selected: {selectedTemplate ? studioTemplates.find(t => t.id === selectedTemplate)?.name : 'None'} 
                    {selectedPlatforms.length > 0 && ` • ${selectedPlatforms.length} platform${selectedPlatforms.length > 1 ? 's' : ''}`}
                  </div>
                  <Button
                    onClick={handleGenerateContent}
                    disabled={!prompt.trim() || !selectedTemplate || isGenerating}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-5 h-5 mr-2" />
                        Generate Content
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: AI Media Studio */}
        {currentStep === 4 && (
          <div className="px-8 py-6 space-y-8">
            <div className="text-center">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">ViVi AI Media Studio</h4>
              <p className="text-gray-600">Generate professional visuals and videos with popular AI content creators</p>
            </div>

            <div className="max-w-6xl mx-auto space-y-8">
              {/* AI Generator Selection */}
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <label className="text-xl font-bold text-gray-900">Select AI Generators</label>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {/* VEO (Google) */}
                  <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-400 cursor-pointer transition-all duration-200 bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="flex items-center space-x-3 mb-2">
                      <Video className="w-6 h-6 text-blue-600" />
                      <h3 className="font-bold text-gray-900">VEO</h3>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">Google's video generation AI</p>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Video • 1080p • 60s max</span>
                    </div>
                  </div>

                  {/* Sora (OpenAI) */}
                  <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-400 cursor-pointer transition-all duration-200 bg-gradient-to-br from-green-50 to-blue-50">
                    <div className="flex items-center space-x-3 mb-2">
                      <Video className="w-6 h-6 text-green-600" />
                      <h3 className="font-bold text-gray-900">Sora</h3>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">OpenAI's video generation AI</p>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Video • 1080p • 60s max</span>
                    </div>
                  </div>

                  {/* Runway ML */}
                  <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-400 cursor-pointer transition-all duration-200 bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="flex items-center space-x-3 mb-2">
                      <Video className="w-6 h-6 text-purple-600" />
                      <h3 className="font-bold text-gray-900">Runway</h3>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">Professional video AI suite</p>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Video • 4K • 30s max</span>
                    </div>
                  </div>

                  {/* DALL-E 3 */}
                  <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-400 cursor-pointer transition-all duration-200 bg-gradient-to-br from-orange-50 to-red-50">
                    <div className="flex items-center space-x-3 mb-2">
                      <Image className="w-6 h-6 text-orange-600" />
                      <h3 className="font-bold text-gray-900">DALL-E 3</h3>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">OpenAI's image generator</p>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Images • 1024x1024 • HD</span>
                    </div>
                  </div>

                  {/* Midjourney */}
                  <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-400 cursor-pointer transition-all duration-200 bg-gradient-to-br from-indigo-50 to-purple-50">
                    <div className="flex items-center space-x-3 mb-2">
                      <Image className="w-6 h-6 text-indigo-600" />
                      <h3 className="font-bold text-gray-900">Midjourney</h3>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">Artistic AI image generation</p>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Images • Ultra HD • Artistic</span>
                    </div>
                  </div>

                  {/* Stable Diffusion */}
                  <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-400 cursor-pointer transition-all duration-200 bg-gradient-to-br from-teal-50 to-blue-50">
                    <div className="flex items-center space-x-3 mb-2">
                      <Image className="w-6 h-6 text-teal-600" />
                      <h3 className="font-bold text-gray-900">Stable Diffusion</h3>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">Open-source image AI</p>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Images • Customizable</span>
                    </div>
                  </div>

                  {/* Pika Labs */}
                  <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-400 cursor-pointer transition-all duration-200 bg-gradient-to-br from-pink-50 to-red-50">
                    <div className="flex items-center space-x-3 mb-2">
                      <Video className="w-6 h-6 text-pink-600" />
                      <h3 className="font-bold text-gray-900">Pika Labs</h3>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">Text-to-video generation</p>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Video • 720p • 3s max</span>
                    </div>
                  </div>

                  {/* Leonardo AI */}
                  <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-400 cursor-pointer transition-all duration-200 bg-gradient-to-br from-yellow-50 to-orange-50">
                    <div className="flex items-center space-x-3 mb-2">
                      <Image className="w-6 h-6 text-yellow-600" />
                      <h3 className="font-bold text-gray-900">Leonardo AI</h3>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">Production-ready AI art</p>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Images • Commercial use</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Media Generation Prompt */}
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Wand2 className="w-5 h-5 text-white" />
                  </div>
                  <label className="text-xl font-bold text-gray-900">Visual Description</label>
                </div>
                
                <textarea
                  value={mediaPrompt}
                  onChange={(e) => setMediaPrompt(e.target.value)}
                  placeholder="Describe the visuals you want to create... For example: 'A professional businesswoman in a modern office, looking confident while using a laptop, natural lighting, corporate atmosphere, high quality cinematography'"
                  className="w-full h-32 px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 resize-none text-lg leading-relaxed transition-all duration-200 mb-4"
                />

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Based on: {generatedContent ? 'Generated content' : 'No content generated yet'}
                  </div>
                  <Button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Media
                  </Button>
                </div>
              </div>

              {/* Generated Media Preview */}
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Play className="w-6 h-6 text-purple-600" />
                  <span>ViVi Generated Media</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Demo Generated Content */}
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 border border-purple-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <Video className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-purple-800">VEO Video</span>
                    </div>
                    <div className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center mb-3">
                      <Play className="w-12 h-12 text-white opacity-70" />
                    </div>
                    <p className="text-sm text-gray-700">Professional business scene - 15s</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <Image className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">DALL-E Image</span>
                    </div>
                    <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center mb-3">
                      <Image className="w-12 h-12 text-gray-500" />
                    </div>
                    <p className="text-sm text-gray-700">Hero image - 1024x1024</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <Video className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800">Sora Video</span>
                    </div>
                    <div className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center mb-3">
                      <Play className="w-12 h-12 text-white opacity-70" />
                    </div>
                    <p className="text-sm text-gray-700">Cinematic sequence - 30s</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Review & Export */}
        {currentStep === 5 && (
          <div className="px-8 py-6 space-y-8">
            <div className="text-center">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Review & Export</h4>
              <p className="text-gray-600">Your content is ready! Review and export to your platforms</p>
            </div>

            <div className="max-w-6xl mx-auto">
              {/* Platform Selection Tabs */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-3 mb-4">
                  {/* Show All Button */}
                  <button
                    onClick={() => setActivePlatformView('all')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 border-2 ${
                      activePlatformView === 'all'
                        ? 'bg-gray-800 text-white border-gray-800'
                        : 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-700'
                    }`}
                  >
                    <Globe className="w-4 h-4" />
                    <span className="font-medium">Show All</span>
                  </button>

                  {/* Platform Buttons */}
                  {selectedPlatforms.map((platformId) => {
                    const platform = platforms.find(p => p.id === platformId);
                    if (!platform) return null;
                    const Icon = platform.icon;
                    const isActive = activePlatformView === platformId;
                    
                    return (
                      <button
                        key={platformId}
                        onClick={() => setActivePlatformView(isActive ? 'all' : platformId)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 border-2 ${
                          isActive
                            ? `${platform.activeColor} ${platform.borderColor} shadow-lg transform scale-105`
                            : 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-700 hover:shadow-md'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                        <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-700'}`}>
                          {platform.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Add More Creatives Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleAddMoreCreatives}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Zap className="w-5 h-5" />
                    <span>Add More Creatives</span>
                  </button>
                </div>
              </div>

              {/* Platform Content Sections */}
              <div className="space-y-8">
                {activePlatformView === 'all' 
                  ? selectedPlatforms.map((platformId) => {
                      const platform = platforms.find(p => p.id === platformId);
                      if (!platform) return null;
                      
                      return (
                        <div key={platformId} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-20 overflow-hidden shadow-lg">
                          {/* Platform Section Header */}
                          <div className="px-6 py-4 bg-white bg-opacity-10 border-b border-white border-opacity-20">
                            <div className="flex items-center space-x-3">
                              <platform.icon className="w-5 h-5 text-white" />
                              <h3 className="text-lg font-semibold text-white">{platform.name} Previews</h3>
                            </div>
                          </div>
                          
                          {/* Platform Content Grid */}
                          <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {renderPlatformPreviews(platformId, generatedContent)}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : (() => {
                      const platform = platforms.find(p => p.id === activePlatformView);
                      if (!platform) return null;
                      
                      return (
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-20 overflow-hidden shadow-lg">
                          {/* Platform Section Header */}
                          <div className={`px-6 py-4 border-b border-white border-opacity-20 ${platform.activeColor}`}>
                            <div className="flex items-center space-x-3">
                              <platform.icon className="w-5 h-5 text-white" />
                              <h3 className="text-lg font-semibold text-white">{platform.name} Previews</h3>
                            </div>
                          </div>
                          
                          {/* Platform Content Grid */}
                          <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {renderPlatformPreviews(activePlatformView, generatedContent)}
                            </div>
                          </div>
                        </div>
                      );
                    })()
                }
                
                {/* Show saved content count if any */}
                {savedContent.length > 0 && (
                  <div className="text-center py-4">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                      <Check className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {savedContent.length} creative{savedContent.length !== 1 ? 's' : ''} ready for export
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-20 p-6 shadow-lg">
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                    <Download className="w-5 h-5 mr-2" />
                    Export Content
                  </Button>
                  <Button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                    <Zap className="w-5 h-5 mr-2" />
                    Build Campaign
                  </Button>
                  <Button className="px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm text-white border border-white border-opacity-30 hover:bg-opacity-30 font-semibold rounded-xl transition-all duration-200">
                    <Copy className="w-5 h-5 mr-2" />
                    Copy to Clipboard
                  </Button>
                  <Button className="px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm text-white border border-white border-opacity-30 hover:bg-opacity-30 font-semibold rounded-xl transition-all duration-200">
                    <Share className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

          {/* Navigation Footer */}
          <div className="px-8 py-6 bg-white bg-opacity-95 backdrop-blur-sm border-t border-white border-opacity-20 rounded-b-xl">
        <div className="flex items-center justify-between">
          <button 
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 font-medium transition-all duration-200 rounded-lg ${
              currentStep === 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            ← Previous Step
          </button>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => {
                setCurrentStep(1);
                setSelectedTemplate(null);
                setPrompt('');
                setSelectedPlatforms([]);
                setGeneratedContent('');
                setSavedContent([]);
                setActivePlatformView('all');
              }}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 font-medium transition-all duration-200 rounded-lg"
            >
              Reset All
            </button>
            <button 
              onClick={currentStep === 5 ? () => console.log('Export content') : nextStep}
              disabled={
                (currentStep === 1 && !selectedTemplate) ||
                (currentStep === 3 && !prompt.trim())
              }
              className="px-8 py-3 font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === 5 ? 'Complete' : 'Continue →'}
            </button>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default MavroAIStudio;