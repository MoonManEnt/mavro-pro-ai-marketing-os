import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { 
  ChevronDown, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  ArrowLeft,
  X,
  Play,
  Upload,
  Calendar,
  BarChart3,
  Store,
  Wand2,
  Sparkles,
  MessageSquare,
  Users,
  TrendingUp,
  Target,
  Zap,
  CheckCircle,
  Image,
  Video,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Hash,
  Clock,
  Eye,
  Heart,
  Share2
} from 'lucide-react';

import profilesData from '../data/profiles.json';

const MainDashboard: React.FC = () => {
  const { currentPersona, setCurrentPersona, setUser, showTour, setShowTour } = useApp();
  const [currentTab, setCurrentTab] = useState<'plan' | 'track' | 'grow'>('plan');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [tourStep, setTourStep] = useState(1);
  const [showPersonaSelector, setShowPersonaSelector] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [currentSubTab, setCurrentSubTab] = useState('wizard');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [generatedContent, setGeneratedContent] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const profiles = profilesData.profiles;
  const currentProfile = profiles.find(p => p.id === currentPersona) || profiles[0];

  const wizardSteps = [
    {
      title: 'Upload Media',
      description: 'Add photos and videos',
      icon: Upload,
      completed: uploadedFiles.length > 0
    },
    {
      title: 'Select Platforms',
      description: 'Choose where to post',
      icon: Users,
      completed: selectedPlatforms.length > 0
    },
    {
      title: 'Create Content',
      description: 'Write your caption',
      icon: Wand2,
      completed: generatedContent.length > 0
    },
    {
      title: 'Schedule & Preview',
      description: 'Set timing and review',
      icon: Calendar,
      completed: scheduleDate && scheduleTime
    }
  ];

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E4405F' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877F2' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: '#1DA1F2' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0077B5' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: '#FF0000' }
  ];

  const nextTour = () => {
    if (tourStep < 8) {
      setTourStep(tourStep + 1);
    } else {
      setShowTour(false);
    }
  };

  const skipTour = () => {
    setShowTour(false);
  };

  const nextWizardStep = () => {
    if (wizardStep < 4) {
      setWizardStep(wizardStep + 1);
    } else {
      setWizardStep(1);
    }
  };

  const prevWizardStep = () => {
    if (wizardStep > 1) {
      setWizardStep(wizardStep - 1);
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const generateContent = () => {
    const sampleContent = `🏡 Luxury living awaits in this stunning property! From the moment you step inside, you'll be captivated by the elegant design and premium finishes. Ready to make this your dream home?

#LuxuryRealEstate #DreamHome #PropertyForSale #RealEstateLife`;
    setGeneratedContent(sampleContent);
  };

  const renderWizardStep = () => {
    switch (wizardStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Upload Media</h3>
              <p className="text-white/70 mb-6">Drag and drop or click to select photos and videos</p>
            </div>
            
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`upload-area ${isDragging ? 'drag-over' : ''}`}
            >
              <div className="text-center">
                <div className="flex justify-center space-x-4 mb-4">
                  <Image className="w-8 h-8 text-white/60" />
                  <Video className="w-8 h-8 text-white/60" />
                </div>
                <p className="text-white/70 mb-4">Drag and drop or click to select photos and videos</p>
                <button
                  onClick={() => document.getElementById('file-input')?.click()}
                  className="mavro-btn-primary"
                >
                  Choose Files
                </button>
                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                />
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="relative">
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="w-full h-16 bg-white/20 rounded mb-2 flex items-center justify-center">
                        {file.type.startsWith('image/') ? (
                          <Image className="w-6 h-6 text-white/60" />
                        ) : (
                          <Video className="w-6 h-6 text-white/60" />
                        )}
                      </div>
                      <p className="text-xs text-white/70 truncate">{file.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Select Platforms</h3>
              <p className="text-white/70 mb-6">Choose where to post your content</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  onClick={() => togglePlatform(platform.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPlatforms.includes(platform.id)
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                      style={{ backgroundColor: platform.color }}
                    >
                      <platform.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-white">{platform.name}</span>
                    {selectedPlatforms.includes(platform.id) && (
                      <CheckCircle className="w-4 h-4 text-orange-500 ml-auto" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Create Content</h3>
              <p className="text-white/70 mb-6">AI-generated content for your campaign</p>
            </div>
            
            {!generatedContent ? (
              <div className="text-center">
                <button
                  onClick={generateContent}
                  className="mavro-btn-primary flex items-center mx-auto"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Content
                </button>
              </div>
            ) : (
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white">Generated Content</h4>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-green-400">85% engagement</span>
                  </div>
                </div>
                <textarea
                  value={generatedContent}
                  onChange={(e) => setGeneratedContent(e.target.value)}
                  className="w-full h-32 bg-white/10 border border-white/20 rounded p-3 text-white placeholder-white/50 resize-none"
                  placeholder="Your generated content will appear here..."
                />
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Schedule & Preview</h3>
              <p className="text-white/70 mb-6">Set timing and review your campaign</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Date</label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded p-3 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Time</label>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded p-3 text-white"
                />
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-4">Campaign Preview</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Platforms:</span>
                  <span className="text-white">{selectedPlatforms.length} selected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Media:</span>
                  <span className="text-white">{uploadedFiles.length} files</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Content:</span>
                  <span className="text-white">{generatedContent ? 'Generated' : 'None'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Schedule:</span>
                  <span className="text-white">{scheduleDate && scheduleTime ? `${scheduleDate} at ${scheduleTime}` : 'Not set'}</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">Predicted Performance</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="text-center">
                    <Eye className="w-4 h-4 text-white/60 mx-auto mb-1" />
                    <div className="text-white">2.5K</div>
                    <div className="text-white/60">Views</div>
                  </div>
                  <div className="text-center">
                    <Heart className="w-4 h-4 text-white/60 mx-auto mb-1" />
                    <div className="text-white">180</div>
                    <div className="text-white/60">Likes</div>
                  </div>
                  <div className="text-center">
                    <Share2 className="w-4 h-4 text-white/60 mx-auto mb-1" />
                    <div className="text-white">24</div>
                    <div className="text-white/60">Shares</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-mavro-main min-h-screen">
      {/* Header */}
      <header className="mavro-header">
        <div className="mavro-container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mavro-logo">
                Mavro <span>Plus</span>
              </h1>
              <p className="text-sm text-white/60">Marketing OS</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Persona Selector */}
              <div 
                className="persona-selector"
                onClick={() => setShowPersonaSelector(!showPersonaSelector)}
              >
                <div className="persona-avatar">
                  {currentProfile?.name?.charAt(0) || 'K'}
                </div>
                <div className="text-left">
                  <div className="font-semibold">{currentProfile?.name}</div>
                  <div className="text-xs text-white/60">{currentProfile?.title}</div>
                </div>
                <ChevronDown className="w-4 h-4 ml-2" />
              </div>

              {/* Voice Toggle */}
              <div className={`voice-toggle ${voiceEnabled ? 'active' : ''}`}>
                {voiceEnabled ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
                <span>ViVi Voice: {voiceEnabled ? 'ON' : 'OFF'}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mavro-container py-8">
        {/* ViVi Assistant */}
        <div className="mavro-assistant-card">
          <div className="mavro-assistant-header">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="mavro-assistant-title">ViVi AI Assistant</h3>
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 text-white/60" />
                  {voiceEnabled && (
                    <div className="voice-wave">
                      <div className="bar"></div>
                      <div className="bar"></div>
                      <div className="bar"></div>
                      <div className="bar"></div>
                      <div className="bar"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <p className="mavro-assistant-message">
            Market trends show increased interest in {currentProfile?.industry.toLowerCase()} services. 
            Want me to create a targeted campaign?
          </p>
          
          <div className="mavro-assistant-actions">
            <button className="mavro-btn-primary">
              🔥 Let's Make Magic
            </button>
            <button className="mavro-btn-secondary">
              ✋ Not Right Now
            </button>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="mavro-tab-container">
          <button
            className={`mavro-tab ${currentTab === 'plan' ? 'active' : ''}`}
            onClick={() => setCurrentTab('plan')}
          >
            Plan
            <div className="text-xs text-white/60 mt-1">Schedule & Boost</div>
          </button>
          <button
            className={`mavro-tab ${currentTab === 'track' ? 'active' : ''}`}
            onClick={() => setCurrentTab('track')}
          >
            Track
            <div className="text-xs text-white/60 mt-1">Reminders & History</div>
          </button>
          <button
            className={`mavro-tab ${currentTab === 'grow' ? 'active' : ''}`}
            onClick={() => setCurrentTab('grow')}
          >
            Grow
            <div className="text-xs text-white/60 mt-1">Analytics & ViVi Store</div>
          </button>
        </div>

        {/* Plan Mode Content */}
        {currentTab === 'plan' && (
          <div className="mavro-tab-content">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Plan Mode</h2>
              <p className="text-white/70">Schedule your content and boost your reach</p>
            </div>

            {/* Sub Navigation */}
            <div className="mavro-sub-tab-container">
              <button
                className={`mavro-sub-tab ${currentSubTab === 'wizard' ? 'active' : ''}`}
                onClick={() => setCurrentSubTab('wizard')}
              >
                Wizard
              </button>
              <button
                className={`mavro-sub-tab ${currentSubTab === 'scheduler' ? 'active' : ''}`}
                onClick={() => setCurrentSubTab('scheduler')}
              >
                Scheduler
              </button>
              <button
                className={`mavro-sub-tab ${currentSubTab === 'studio' ? 'active' : ''}`}
                onClick={() => setCurrentSubTab('studio')}
              >
                Mavro AI Studio™
              </button>
              <button
                className={`mavro-sub-tab ${currentSubTab === 'memory' ? 'active' : ''}`}
                onClick={() => setCurrentSubTab('memory')}
              >
                Campaign Memory
              </button>
            </div>

            {/* Content Wizard */}
            {currentSubTab === 'wizard' && (
              <div className="mavro-wizard-container">
                <div className="mavro-wizard-header">
                  <h3 className="mavro-wizard-title">Content Wizard</h3>
                  <p className="mavro-wizard-subtitle">Step {wizardStep} of 4</p>
                </div>

                {/* Wizard Steps */}
                <div className="mavro-wizard-steps">
                  {wizardSteps.map((step, index) => (
                    <div key={index} className="mavro-wizard-step">
                      <div className={`mavro-wizard-step-number ${index + 1 <= wizardStep ? 'active' : ''}`}>
                        {step.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      <div className="mavro-wizard-step-title">{step.title}</div>
                      <div className="mavro-wizard-step-description">{step.description}</div>
                    </div>
                  ))}
                </div>

                {/* Wizard Content */}
                <div className="mb-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={wizardStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderWizardStep()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Wizard Navigation */}
                <div className="mavro-wizard-navigation">
                  <button
                    onClick={prevWizardStep}
                    disabled={wizardStep === 1}
                    className="mavro-btn-secondary flex items-center disabled:opacity-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </button>
                  <button
                    onClick={nextWizardStep}
                    className="mavro-btn-primary flex items-center"
                  >
                    {wizardStep === 4 ? 'Launch Campaign' : 'Next'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            )}

            {/* Other sub-tabs placeholder */}
            {currentSubTab !== 'wizard' && (
              <div className="mavro-section text-center py-12">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {currentSubTab.charAt(0).toUpperCase() + currentSubTab.slice(1)} Content
                </h3>
                <p className="text-white/70">Coming soon...</p>
              </div>
            )}
          </div>
        )}

        {/* Track Mode Content */}
        {currentTab === 'track' && (
          <div className="mavro-tab-content">
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-white/60 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-4">Track Mode</h3>
              <p className="text-white/70">Monitor your campaign performance and history</p>
            </div>
          </div>
        )}

        {/* Grow Mode Content */}
        {currentTab === 'grow' && (
          <div className="mavro-tab-content">
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-white/60 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-4">Grow Mode</h3>
              <p className="text-white/70">Analytics and ViVi Store for growth tools</p>
            </div>
          </div>
        )}
      </main>

      {/* Tour Modal */}
      {showTour && (
        <div className="tour-modal">
          <div className="tour-content">
            <div className="tour-step-indicator">Step {tourStep} of 8</div>
            <h3 className="tour-title">Welcome to Mavro Plus!</h3>
            <p className="tour-description">
              Hey there! I'm ViVi, your AI marketing assistant. I'm here to help you dominate your industry with smart marketing automation.
            </p>
            <div className="tour-actions">
              <button onClick={skipTour} className="mavro-btn-secondary">
                Skip Tour
              </button>
              <button onClick={nextTour} className="mavro-btn-primary">
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persona Selector Modal */}
      {showPersonaSelector && (
        <div className="tour-modal">
          <div className="tour-content">
            <div className="flex items-center justify-between mb-6">
              <h3 className="tour-title">Select Your Persona</h3>
              <button
                onClick={() => setShowPersonaSelector(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  onClick={() => {
                    setCurrentPersona(profile.id);
                    setShowPersonaSelector(false);
                  }}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    currentPersona === profile.id
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="persona-avatar mr-4">
                      {profile.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">{profile.name}</div>
                      <div className="text-sm text-white/70">{profile.title}</div>
                      <div className="text-xs text-white/50">{profile.industry}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainDashboard;