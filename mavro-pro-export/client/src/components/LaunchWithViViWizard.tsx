import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Users, 
  Wand2, 
  Calendar, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  CheckCircle, 
  Target,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Image,
  Video,
  Type,
  Hash,
  Clock,
  Sparkles,
  TrendingUp,
  Eye,
  MessageSquare,
  Heart,
  Share2,
  BarChart3
} from 'lucide-react';

interface MediaFile {
  id: string;
  file: File;
  type: 'image' | 'video';
  preview: string;
  size: number;
}

interface Platform {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  selected: boolean;
  recommendations: {
    imageSize: string;
    videoLength: string;
    bestTime: string;
    optimalLength: number;
  };
}

interface ContentSuggestion {
  id: string;
  text: string;
  tone: 'professional' | 'casual' | 'exciting' | 'informative';
  hashtags: string[];
  engagement: string;
  platform: string;
}

interface LaunchWithViViWizardProps {
  isOpen: boolean;
  onClose: () => void;
  currentPersona?: string;
  onComplete?: (campaignData: any) => void;
}

const LaunchWithViViWizard: React.FC<LaunchWithViViWizardProps> = ({
  isOpen,
  onClose,
  currentPersona = 'karen',
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<MediaFile[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [generatedContent, setGeneratedContent] = useState<ContentSuggestion[]>([]);
  const [selectedContent, setSelectedContent] = useState<ContentSuggestion | null>(null);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const platforms: Platform[] = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: '#E4405F',
      selected: false,
      recommendations: {
        imageSize: '1080x1080',
        videoLength: '15-30s',
        bestTime: '6-9 AM, 7-9 PM',
        optimalLength: 125
      }
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: '#1877F2',
      selected: false,
      recommendations: {
        imageSize: '1200x630',
        videoLength: '1-2 min',
        bestTime: '1-3 PM',
        optimalLength: 40
      }
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      color: '#1DA1F2',
      selected: false,
      recommendations: {
        imageSize: '1024x512',
        videoLength: '15-45s',
        bestTime: '9 AM-12 PM',
        optimalLength: 280
      }
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      color: '#0077B5',
      selected: false,
      recommendations: {
        imageSize: '1200x627',
        videoLength: '30s-5 min',
        bestTime: '7-9 AM, 5-6 PM',
        optimalLength: 150
      }
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      color: '#FF0000',
      selected: false,
      recommendations: {
        imageSize: '1280x720',
        videoLength: '1-15 min',
        bestTime: '2-4 PM, 8-11 PM',
        optimalLength: 200
      }
    }
  ];

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
      completed: selectedPlatforms.some(p => p.selected)
    },
    {
      title: 'Create Content',
      description: 'AI-generated captions',
      icon: Wand2,
      completed: selectedContent !== null
    },
    {
      title: 'Schedule & Preview',
      description: 'Set timing and review',
      icon: Calendar,
      completed: scheduleDate && scheduleTime
    }
  ];

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const mediaFile: MediaFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          file,
          type: file.type.startsWith('image/') ? 'image' : 'video',
          preview: URL.createObjectURL(file),
          size: file.size
        };
        setUploadedFiles(prev => [...prev, mediaFile]);
      }
    });
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
      prev.length > 0 
        ? prev.map(p => p.id === platformId ? { ...p, selected: !p.selected } : p)
        : platforms.map(p => ({ ...p, selected: p.id === platformId }))
    );
  };

  const generateContent = () => {
    const selectedPlatformIds = selectedPlatforms.filter(p => p.selected).map(p => p.id);
    
    const suggestions: ContentSuggestion[] = [
      {
        id: '1',
        text: "🏡 Luxury living awaits in this stunning property! From the moment you step inside, you'll be captivated by the elegant design and premium finishes. Ready to make this your dream home?",
        tone: 'exciting',
        hashtags: ['#LuxuryRealEstate', '#DreamHome', '#PropertyForSale', '#RealEstateLife'],
        engagement: '85% above average',
        platform: 'instagram'
      },
      {
        id: '2',
        text: "This exceptional property offers the perfect blend of modern amenities and timeless elegance. With its prime location and thoughtful design, it represents an outstanding investment opportunity.",
        tone: 'professional',
        hashtags: ['#RealEstate', '#PropertyInvestment', '#LuxuryHomes', '#ModernDesign'],
        engagement: '72% above average',
        platform: 'linkedin'
      },
      {
        id: '3',
        text: "JUST LISTED! 🔥 This gorgeous home is everything you've been searching for. Don't miss out on this incredible opportunity!",
        tone: 'exciting',
        hashtags: ['#JustListed', '#NewListing', '#HomeForSale', '#RealEstate'],
        engagement: '91% above average',
        platform: 'facebook'
      }
    ];

    setGeneratedContent(suggestions);
  };

  const nextStep = () => {
    if (currentStep === 2 && selectedPlatforms.filter(p => p.selected).length === 0) {
      // Auto-generate content when moving to step 3
      generateContent();
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeLaunch = () => {
    const campaignData = {
      media: uploadedFiles,
      platforms: selectedPlatforms.filter(p => p.selected),
      content: selectedContent,
      schedule: {
        date: scheduleDate,
        time: scheduleTime
      },
      timestamp: new Date()
    };

    onComplete?.(campaignData);
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Upload className="w-12 h-12 text-[#ff6b6b] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Upload Media</h3>
              <p className="text-white/70">Add photos and videos for your campaign</p>
            </div>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`upload-area ${isDragging ? 'drag-over' : ''}`}
            >
              <div className="space-y-4">
                <div className="flex justify-center space-x-4">
                  <Image className="w-8 h-8 text-white/60" />
                  <Video className="w-8 h-8 text-white/60" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Drag & Drop Files</h4>
                  <p className="text-white/70 mb-4">Or click to browse</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="mavro-btn-primary"
                  >
                    Choose Files
                  </button>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />
            </div>

            {uploadedFiles.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="relative">
                    <img
                      src={file.preview}
                      alt="Upload preview"
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <div className="absolute top-1 right-1 bg-black/50 rounded-full p-1">
                      <button
                        onClick={() => setUploadedFiles(prev => prev.filter(f => f.id !== file.id))}
                        className="text-white/80 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
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
            <div className="text-center mb-6">
              <Users className="w-12 h-12 text-[#ff6b6b] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Select Platforms</h3>
              <p className="text-white/70">Choose where to publish your content</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {platforms.map((platform) => {
                const isSelected = selectedPlatforms.find(p => p.id === platform.id)?.selected || false;
                return (
                  <div
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#ff6b6b] bg-[#ff6b6b]/10'
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
                      {isSelected && <CheckCircle className="w-4 h-4 text-[#ff6b6b] ml-auto" />}
                    </div>
                    <div className="text-xs text-white/60 space-y-1">
                      <div>Image: {platform.recommendations.imageSize}</div>
                      <div>Video: {platform.recommendations.videoLength}</div>
                      <div>Best time: {platform.recommendations.bestTime}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Wand2 className="w-12 h-12 text-[#ff6b6b] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">AI-Generated Content</h3>
              <p className="text-white/70">Choose the perfect caption for your campaign</p>
            </div>

            {generatedContent.length === 0 ? (
              <div className="text-center py-8">
                <button
                  onClick={generateContent}
                  className="mavro-btn-primary flex items-center mx-auto"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Content
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {generatedContent.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    onClick={() => setSelectedContent(suggestion)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedContent?.id === suggestion.id
                        ? 'border-[#ff6b6b] bg-[#ff6b6b]/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Type className="w-4 h-4 text-white/60" />
                          <span className="text-xs text-white/60 capitalize">{suggestion.tone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-xs text-green-400">{suggestion.engagement}</span>
                        </div>
                      </div>
                      {selectedContent?.id === suggestion.id && (
                        <CheckCircle className="w-5 h-5 text-[#ff6b6b]" />
                      )}
                    </div>
                    <p className="text-white mb-3 text-sm">{suggestion.text}</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestion.hashtags.map((hashtag, index) => (
                        <span key={index} className="text-xs bg-white/10 px-2 py-1 rounded text-white/70">
                          {hashtag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Calendar className="w-12 h-12 text-[#ff6b6b] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Schedule & Preview</h3>
              <p className="text-white/70">Set your posting schedule and review</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Date</label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="mavro-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Time</label>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="mavro-input"
                />
              </div>
            </div>

            {selectedContent && (
              <div className="mavro-card p-4">
                <h4 className="font-semibold text-white mb-4">Campaign Preview</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Content:</span>
                    <span className="text-white">{selectedContent.text.substring(0, 50)}...</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Platforms:</span>
                    <span className="text-white">{selectedPlatforms.filter(p => p.selected).length} selected</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Media:</span>
                    <span className="text-white">{uploadedFiles.length} files</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Schedule:</span>
                    <span className="text-white">{scheduleDate} at {scheduleTime}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
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
                      <MessageSquare className="w-4 h-4 text-white/60 mx-auto mb-1" />
                      <div className="text-white">24</div>
                      <div className="text-white/60">Comments</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="max-w-2xl w-full mavro-card p-0 max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Launch with ViVi</h2>
            <p className="text-white/70 text-sm">AI-powered campaign creation</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step Progress */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-white/70">Step {currentStep} of {wizardSteps.length}</span>
            <span className="text-sm text-white/70">{Math.round((currentStep / wizardSteps.length) * 100)}% Complete</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {wizardSteps.map((step, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className={`wizard-step ${index + 1 <= currentStep ? 'active' : ''} ${step.completed ? 'completed' : ''}`}>
                  {step.completed ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                {index < wizardSteps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${index + 1 < currentStep ? 'bg-[#ff6b6b]' : 'bg-white/20'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="mavro-btn-secondary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          
          <button
            onClick={currentStep === 4 ? completeLaunch : nextStep}
            className="mavro-btn-primary flex items-center"
          >
            {currentStep === 4 ? (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Launch Campaign
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LaunchWithViViWizard;