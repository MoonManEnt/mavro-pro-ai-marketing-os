import React, { useState, useCallback } from 'react';
import { Upload, Image, Video, FileText, Mail, Share2, Sparkles, Check, Calendar, Save, Play, Edit, X } from 'lucide-react';

// Wizard State Interface
interface WizardState {
  contentUploads: Array<{
    id: string;
    type: 'image' | 'video' | 'document';
    url: string;
    metadata: {
      name: string;
      size: number;
      duration?: number;
    };
  }>;
  platforms: Record<string, string[]>; // { platformName: [postTypes] }
  captions: Record<string, string>; // { platformName: captionText }
  audioSelections: Record<string, any>; // { platformName: audioFile }
  hashtags: Record<string, string[]>; // { platformName: [tags] }
  previews: Record<string, any>; // { platformName: previewData }
  campaignQueue: any[];
  savedWizards: Record<string, any>;
}

// Platform configurations
const PLATFORMS = {
  instagram: { name: 'Instagram', postTypes: ['Post', 'Reel', 'Story'], color: 'from-pink-500 to-purple-600' },
  x: { name: 'X (Twitter)', postTypes: ['Post', 'Thread'], color: 'from-gray-800 to-black' },
  linkedin: { name: 'LinkedIn', postTypes: ['Post', 'Article'], color: 'from-blue-600 to-blue-800' },
  tiktok: { name: 'TikTok', postTypes: ['Video', 'Slideshow'], color: 'from-black to-gray-800' },
  facebook: { name: 'Facebook', postTypes: ['Post', 'Story', 'Reel'], color: 'from-blue-500 to-blue-700' },
  youtube: { name: 'YouTube', postTypes: ['Video', 'Short', 'Community'], color: 'from-red-500 to-red-700' }
};

export default function MarvroMagicStudioWizard() {
  const [currentCard, setCurrentCard] = useState(1);
  const [wizardState, setWizardState] = useState<WizardState>({
    contentUploads: [],
    platforms: {},
    captions: {},
    audioSelections: {},
    hashtags: {},
    previews: {},
    campaignQueue: [],
    savedWizards: {}
  });
  const [showCelebration, setShowCelebration] = useState(false);

  // Card 1: Content Upload & Platform Configuration
  const renderCard1 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-3">Content Upload & Platform Setup</h2>
        <p className="text-gray-600 text-lg">Choose your creative assets and target platforms</p>
      </div>

      {/* Upload Builder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[
          { icon: Share2, title: 'Social Media Post', desc: 'Create engaging social content', gradient: 'from-blue-500 to-indigo-600' },
          { icon: Video, title: 'Video Script Builder', desc: 'Generate video scripts & storyboards', gradient: 'from-purple-500 to-pink-600' },
          { icon: Mail, title: 'Email Campaigns', desc: 'Design email marketing campaigns', gradient: 'from-green-500 to-emerald-600' },
          { icon: FileText, title: 'Blog Articles', desc: 'Write comprehensive blog content', gradient: 'from-orange-500 to-amber-600' }
        ].map((item) => (
          <div key={item.title} className="relative group cursor-pointer">
            <div className="bg-gradient-to-br from-white to-gray-50/50 border border-gray-200 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black tracking-tight text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Zone */}
      <div className="bg-gradient-to-br from-white to-blue-50/30 border-2 border-dashed border-blue-300 rounded-3xl p-12 text-center shadow-2xl transition-all duration-300 hover:border-blue-400 hover:shadow-3xl">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Upload className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-black tracking-tight text-gray-900 mb-4">Drag & Drop Your Creative Assets</h3>
        <p className="text-gray-600 mb-6">Upload images, videos, or documents to get started</p>
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all duration-300">
          Browse Files
        </button>
      </div>

      {/* Platform Selection */}
      <div className="bg-gradient-to-br from-white to-gray-50/50 border border-gray-200 rounded-3xl p-8 shadow-2xl">
        <h3 className="text-2xl font-black tracking-tight text-gray-900 mb-6">Select Target Platforms</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(PLATFORMS).map(([key, platform]) => (
            <div key={key} className="relative group cursor-pointer">
              <div className={`bg-gradient-to-br ${platform.color} text-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105`}>
                <h4 className="font-bold text-lg">{platform.name}</h4>
                <div className="mt-2 flex flex-wrap gap-1">
                  {platform.postTypes.map((type) => (
                    <span key={type} className="text-xs bg-white/20 px-2 py-1 rounded-lg">{type}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Card 2: AI-Powered Caption & Audio/Hashtag Builder
  const renderCard2 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-3">AI Content Generation</h2>
        <p className="text-gray-600 text-lg">Generate captions, select audio, and optimize hashtags</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Caption Builder */}
        <div className="bg-gradient-to-br from-white to-purple-50/30 border border-purple-200 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mr-4 shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-black tracking-tight text-gray-900">AI Caption Builder</h3>
          </div>
          <textarea
            className="w-full h-40 p-4 border border-gray-300 rounded-2xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="ViVi AI will generate compelling captions here..."
          />
          <button className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all duration-300">
            Regenerate Caption
          </button>
        </div>

        {/* Audio Selector */}
        <div className="bg-gradient-to-br from-white to-green-50/30 border border-green-200 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mr-4 shadow-lg">
              <Play className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-black tracking-tight text-gray-900">Audio Selector</h3>
          </div>
          <div className="space-y-3">
            {['Trending Pop Beat', 'Motivational Corporate', 'Chill Lo-fi Vibes'].map((audio) => (
              <div key={audio} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <span className="font-medium">{audio}</span>
                <button className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg hover:scale-105 transition-all duration-300">
                  <Play className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hashtag Module */}
      <div className="bg-gradient-to-br from-white to-orange-50/30 border border-orange-200 rounded-3xl p-8 shadow-2xl">
        <h3 className="text-2xl font-black tracking-tight text-gray-900 mb-6">Hashtag Optimization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-lg mb-4">Trending Tags (TrendTap™)</h4>
            <div className="flex flex-wrap gap-2">
              {['#marketing', '#socialmedia', '#contentcreator', '#business', '#entrepreneur'].map((tag) => (
                <span key={tag} className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-xl font-medium shadow-lg">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Custom Tags</h4>
            <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Add your custom hashtags..."
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Card 3: Scaled Content Preview
  const renderCard3 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-3">Content Previews</h2>
        <p className="text-gray-600 text-lg">See how your content will look across platforms</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(PLATFORMS).slice(0, 6).map(([key, platform]) => (
          <div key={key} className="bg-gradient-to-br from-white to-gray-50/50 border border-gray-200 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black tracking-tight text-gray-900">{platform.name}</h3>
              <button className="w-8 h-8 rounded-xl bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white shadow-lg hover:scale-105 transition-all duration-300">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            
            {/* Platform-specific preview mockup */}
            <div className={`aspect-square ${key === 'x' ? 'aspect-video' : ''} bg-gradient-to-br ${platform.color} rounded-2xl mb-4 flex items-center justify-center text-white font-bold shadow-lg`}>
              Content Preview
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600 line-clamp-2">Sample caption text for {platform.name} will appear here with proper formatting...</p>
              <div className="flex flex-wrap gap-1">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-lg">#sample</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-lg">#hashtag</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Card 4: Publish, Schedule & Save Options
  const renderCard4 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-3">Publish & Schedule</h2>
        <p className="text-gray-600 text-lg">Choose how to deploy your content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { 
            title: 'Post Now', 
            desc: 'Publish immediately across all platforms', 
            icon: Share2, 
            gradient: 'from-green-500 to-emerald-600',
            action: () => handlePublish('now')
          },
          { 
            title: 'Add to Campaign', 
            desc: 'Queue with other content for batch publishing', 
            icon: Check, 
            gradient: 'from-blue-500 to-indigo-600',
            action: () => handlePublish('campaign')
          },
          { 
            title: 'Schedule for Later', 
            desc: 'Set specific date and time for publishing', 
            icon: Calendar, 
            gradient: 'from-purple-500 to-pink-600',
            action: () => handlePublish('schedule')
          },
          { 
            title: 'Save for Later', 
            desc: 'Save progress and return to complete later', 
            icon: Save, 
            gradient: 'from-orange-500 to-amber-600',
            action: () => handleSave()
          }
        ].map((option) => (
          <div key={option.title} className="relative group cursor-pointer" onClick={option.action}>
            <div className="bg-gradient-to-br from-white to-gray-50/50 border border-gray-200 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                <option.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black tracking-tight text-gray-900 mb-3">{option.title}</h3>
              <p className="text-gray-600">{option.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Saved Wizards Panel */}
      {Object.keys(wizardState.savedWizards).length > 0 && (
        <div className="bg-gradient-to-br from-white to-gray-50/50 border border-gray-200 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-black tracking-tight text-gray-900 mb-6">Saved Wizards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(wizardState.savedWizards).map(([id, wizard]) => (
              <div key={id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div>
                  <h4 className="font-bold">Saved Wizard</h4>
                  <p className="text-sm text-gray-600">Created: {new Date().toLocaleDateString()}</p>
                </div>
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all duration-300">
                  Resume
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Handle publishing actions
  const handlePublish = (type: 'now' | 'campaign' | 'schedule') => {
    if (type === 'now') {
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        resetWizard();
      }, 3000);
    } else if (type === 'campaign') {
      setWizardState(prev => ({
        ...prev,
        campaignQueue: [...prev.campaignQueue, { id: Date.now(), ...prev }]
      }));
      resetWizard();
    } else if (type === 'schedule') {
      // Handle scheduling logic
      resetWizard();
    }
  };

  // Handle save for later
  const handleSave = () => {
    const wizardId = `wizard_${Date.now()}`;
    setWizardState(prev => ({
      ...prev,
      savedWizards: { ...prev.savedWizards, [wizardId]: { ...prev } }
    }));
  };

  // Reset wizard to initial state
  const resetWizard = () => {
    setCurrentCard(1);
    setWizardState({
      contentUploads: [],
      platforms: {},
      captions: {},
      audioSelections: {},
      hashtags: {},
      previews: {},
      campaignQueue: [],
      savedWizards: wizardState.savedWizards // Preserve saved wizards
    });
  };

  // Celebration animation
  const CelebrationModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl p-12 max-w-md mx-4 text-center shadow-3xl">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
          <Check className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-4">🎉 Posts Are Live!</h2>
        <p className="text-gray-600 text-lg">Your content has been successfully published across all selected platforms.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header with Breadcrumb Navigation */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black tracking-tight mb-6">Marvo Magic Studio™</h1>
          
          {/* Breadcrumb Stepper */}
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg cursor-pointer transition-all duration-300 ${
                    step === currentCard
                      ? 'bg-white text-purple-600 scale-110'
                      : step < currentCard
                      ? 'bg-green-500 text-white hover:scale-105'
                      : 'bg-white/20 text-white/70 hover:bg-white/30'
                  }`}
                  onClick={() => setCurrentCard(step)}
                >
                  {step < currentCard ? <Check className="w-6 h-6" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-8 h-1 rounded-full ml-4 ${
                    step < currentCard ? 'bg-green-500' : 'bg-white/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        {currentCard === 1 && renderCard1()}
        {currentCard === 2 && renderCard2()}
        {currentCard === 3 && renderCard3()}
        {currentCard === 4 && renderCard4()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12">
          <button
            onClick={() => setCurrentCard(Math.max(1, currentCard - 1))}
            disabled={currentCard === 1}
            className={`px-8 py-4 rounded-2xl font-bold shadow-lg transition-all duration-300 ${
              currentCard === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-gray-600 to-gray-800 text-white hover:scale-105'
            }`}
          >
            Previous
          </button>

          <button
            onClick={() => setCurrentCard(Math.min(4, currentCard + 1))}
            disabled={currentCard === 4}
            className={`px-8 py-4 rounded-2xl font-bold shadow-lg transition-all duration-300 ${
              currentCard === 4
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105'
            }`}
          >
            {currentCard === 4 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>

      {/* Celebration Modal */}
      {showCelebration && <CelebrationModal />}
    </div>
  );
}