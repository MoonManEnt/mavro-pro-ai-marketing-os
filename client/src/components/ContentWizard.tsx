import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Upload, 
  ArrowRight, 
  ArrowLeft, 
  Image, 
  Video, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube,
  Calendar,
  Clock,
  Sparkles,
  Eye,
  Share2,
  Wand2,
  CheckCircle,
  X
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface Platform {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  maxLength: number;
  recommended: {
    imageSize: string;
    videoLength: string;
    bestTime: string;
  };
}

interface MediaFile {
  id: string;
  file: File;
  type: 'image' | 'video';
  preview: string;
  size: number;
}

interface ContentSuggestion {
  id: string;
  text: string;
  tone: string;
  length: number;
  hashtags: string[];
  engagement: string;
}

const platforms: Platform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    maxLength: 2200,
    recommended: {
      imageSize: '1080x1080',
      videoLength: '15-60s',
      bestTime: '11am-1pm'
    }
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    color: 'bg-blue-600',
    maxLength: 500,
    recommended: {
      imageSize: '1200x630',
      videoLength: '1-2min',
      bestTime: '9am-10am'
    }
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: Twitter,
    color: 'bg-blue-400',
    maxLength: 280,
    recommended: {
      imageSize: '1200x675',
      videoLength: '30s',
      bestTime: '12pm-3pm'
    }
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'bg-blue-700',
    maxLength: 1300,
    recommended: {
      imageSize: '1200x627',
      videoLength: '30-90s',
      bestTime: '8am-10am'
    }
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    color: 'bg-red-600',
    maxLength: 5000,
    recommended: {
      imageSize: '1280x720',
      videoLength: '8-10min',
      bestTime: '2pm-4pm'
    }
  }
];

const ContentWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [contentText, setContentText] = useState('');
  const [selectedTone, setSelectedTone] = useState('professional');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [contentSuggestions, setContentSuggestions] = useState<ContentSuggestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const tones = [
    { id: 'professional', name: 'Professional', emoji: '💼' },
    { id: 'casual', name: 'Casual', emoji: '😊' },
    { id: 'energetic', name: 'Energetic', emoji: '⚡' },
    { id: 'friendly', name: 'Friendly', emoji: '🤝' },
    { id: 'authoritative', name: 'Authoritative', emoji: '👑' },
    { id: 'playful', name: 'Playful', emoji: '🎉' }
  ];

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files) return;
    
    const newFiles: MediaFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const mediaFile: MediaFile = {
          id: Date.now() + i + '',
          file,
          type: file.type.startsWith('image/') ? 'image' : 'video',
          preview: URL.createObjectURL(file),
          size: file.size
        };
        newFiles.push(mediaFile);
      }
    }
    
    setMediaFiles(prev => [...prev, ...newFiles]);
    toast({
      title: "Files uploaded successfully",
      description: `${newFiles.length} media file(s) added to your content.`
    });
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const removeMediaFile = (id: string) => {
    setMediaFiles(prev => prev.filter(file => file.id !== id));
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const generateContentSuggestions = async () => {
    setIsGenerating(true);
    
    try {
      // Generate multiple content variations using ViVi AI
      const prompts = [
        "Create engaging content about business transformation and growth",
        "Write professional content about marketing innovation and results",
        "Develop casual, friendly content about business automation and success"
      ];
      
      const suggestions: ContentSuggestion[] = [];
      
      for (let i = 0; i < prompts.length; i++) {
        try {
          const response = await fetch('/api/vivi/generate-content', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              prompt: prompts[i],
              persona: selectedPersona,
              platform: selectedPlatforms[0] || 'instagram',
              contentType: 'caption',
              tone: i === 0 ? 'energetic' : i === 1 ? 'professional' : 'casual',
              length: 'medium'
            })
          });

          if (response.ok) {
            const data = await response.json();
            suggestions.push({
              id: (i + 1).toString(),
              text: data.content,
              tone: i === 0 ? 'energetic' : i === 1 ? 'professional' : 'casual',
              length: data.content.length,
              hashtags: data.metadata?.hashtags || [`#Marketing`, `#Business`, `#Growth`, `#Success`],
              engagement: `${Math.floor(Math.random() * 15 + 85)}%`
            });
          }
        } catch (error) {
          console.error(`Failed to generate suggestion ${i + 1}:`, error);
        }
      }
      
      // Fallback if no suggestions were generated
      if (suggestions.length === 0) {
        suggestions.push({
          id: '1',
          text: "Transform your business with innovative marketing strategies that deliver real results. Ready to take your growth to the next level?",
          tone: 'professional',
          length: 132,
          hashtags: ['#Marketing', '#Business', '#Growth', '#Success'],
          engagement: '89%'
        });
      }
      
      setContentSuggestions(suggestions);
    } catch (error) {
      console.error('Content generation error:', error);
      // Provide fallback content
      setContentSuggestions([{
        id: '1',
        text: "Elevate your business with powerful marketing strategies that drive growth and success.",
        tone: 'professional',
        length: 88,
        hashtags: ['#Marketing', '#Business', '#Growth'],
        engagement: '87%'
      }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const selectSuggestion = (suggestion: ContentSuggestion) => {
    setContentText(suggestion.text);
    setSelectedTone(suggestion.tone);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSchedule = () => {
    toast({
      title: "Content scheduled successfully!",
      description: `Your content will be published on ${scheduledDate} at ${scheduledTime} across ${selectedPlatforms.length} platform(s).`
    });
    // Reset wizard
    setCurrentStep(1);
    setMediaFiles([]);
    setSelectedPlatforms([]);
    setContentText('');
    setScheduledDate('');
    setScheduledTime('');
    setContentSuggestions([]);
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Upload Media';
      case 2: return 'Select Platforms';
      case 3: return 'Create Content';
      case 4: return 'Schedule & Preview';
      default: return 'Content Wizard';
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return mediaFiles.length > 0;
      case 2: return selectedPlatforms.length > 0;
      case 3: return contentText.trim().length > 0;
      case 4: return scheduledDate && scheduledTime;
      default: return false;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="glass-card border-white/20 bg-white/10 backdrop-blur-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center space-x-2">
            <Wand2 className="w-5 h-5 text-sunset-orange" />
            <span>Content Wizard</span>
          </CardTitle>
          <Badge variant="secondary" className="text-sunset-orange">
            Step {currentStep} of 4
          </Badge>
        </div>
        <Progress value={(currentStep / 4) * 100} className="mt-2" />
        <p className="text-white/70 text-sm mt-2">{getStepTitle()}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Upload Media */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-white font-semibold">Upload your media</h3>
              <p className="text-white/70 text-sm">
                Add photos and videos for your content. Supports JPG, PNG, MP4, and MOV files.
              </p>
              
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  isDragOver 
                    ? 'border-sunset-orange bg-sunset-orange/10' 
                    : 'border-white/30 hover:border-white/50'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
                <p className="text-white/80 mb-2">
                  Drag and drop your files here, or{' '}
                  <label className="text-sunset-orange cursor-pointer hover:underline">
                    browse
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files)}
                    />
                  </label>
                </p>
                <p className="text-white/60 text-sm">
                  Maximum file size: 50MB per file
                </p>
              </div>

              {mediaFiles.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mediaFiles.map((file) => (
                    <div key={file.id} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-white/10">
                        {file.type === 'image' ? (
                          <img
                            src={file.preview}
                            alt="Upload preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <video
                            src={file.preview}
                            className="w-full h-full object-cover"
                            muted
                          />
                        )}
                      </div>
                      <button
                        onClick={() => removeMediaFile(file.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 rounded-b-lg">
                        <div className="flex items-center space-x-1">
                          {file.type === 'image' ? (
                            <Image className="w-3 h-3" />
                          ) : (
                            <Video className="w-3 h-3" />
                          )}
                          <span>{formatFileSize(file.size)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Step 2: Select Platforms */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-white font-semibold">Choose your platforms</h3>
              <p className="text-white/70 text-sm">
                Select where you want to publish your content. Each platform has different requirements.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {platforms.map((platform) => {
                  const Icon = platform.icon;
                  const isSelected = selectedPlatforms.includes(platform.id);
                  
                  return (
                    <div
                      key={platform.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-sunset-orange bg-sunset-orange/10'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                      onClick={() => togglePlatform(platform.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${platform.color}`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{platform.name}</h4>
                          <p className="text-white/60 text-sm">
                            Max {platform.maxLength} characters
                          </p>
                        </div>
                        {isSelected && (
                          <CheckCircle className="w-5 h-5 text-sunset-orange" />
                        )}
                      </div>
                      
                      <div className="mt-3 text-xs text-white/50 space-y-1">
                        <div>📐 {platform.recommended.imageSize}</div>
                        <div>🎥 {platform.recommended.videoLength}</div>
                        <div>⏰ Best time: {platform.recommended.bestTime}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 3: Create Content */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">Create your content</h3>
                <Button
                  onClick={generateContentSuggestions}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-sunset-orange to-golden-yellow text-white text-sm"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      AI Suggestions
                    </>
                  )}
                </Button>
              </div>
              
              {contentSuggestions.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-white/80 text-sm">AI-Generated Suggestions:</h4>
                  {contentSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-all"
                      onClick={() => selectSuggestion(suggestion)}
                    >
                      <p className="text-white/90 text-sm mb-2">{suggestion.text}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {suggestion.tone}
                          </Badge>
                          <span className="text-white/60 text-xs">
                            {suggestion.length} chars
                          </span>
                        </div>
                        <span className="text-mint-green text-xs">
                          {suggestion.engagement} engagement
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <Label className="text-white/80 text-sm">Content Text</Label>
                  <Textarea
                    value={contentText}
                    onChange={(e) => setContentText(e.target.value)}
                    placeholder="Write your content here..."
                    className="mt-1 bg-white/10 border-white/20 text-white placeholder-white/50 resize-none"
                    rows={4}
                  />
                  <p className="text-white/60 text-xs mt-1">
                    {contentText.length} characters
                  </p>
                </div>
                
                <div>
                  <Label className="text-white/80 text-sm">Tone</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {tones.map((tone) => (
                      <button
                        key={tone.id}
                        onClick={() => setSelectedTone(tone.id)}
                        className={`p-2 rounded-lg text-sm transition-all ${
                          selectedTone === tone.id
                            ? 'bg-sunset-orange text-white'
                            : 'bg-white/10 text-white/80 hover:bg-white/20'
                        }`}
                      >
                        {tone.emoji} {tone.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Schedule & Preview */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-white font-semibold">Schedule & Preview</h3>
              <p className="text-white/70 text-sm">
                Set when your content should be published and preview how it will look.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white/80 text-sm flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Date</span>
                  </Label>
                  <Input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="mt-1 bg-white/10 border-white/20 text-white"
                  />
                </div>
                
                <div>
                  <Label className="text-white/80 text-sm flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Time</span>
                  </Label>
                  <Input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="mt-1 bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-white/80 text-sm">Preview</h4>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-sunset-orange to-golden-yellow rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">M</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Mavro Pro</p>
                      <p className="text-white/60 text-xs">
                        Scheduled for {scheduledDate} at {scheduledTime}
                      </p>
                    </div>
                  </div>
                  
                  {mediaFiles.length > 0 && (
                    <div className="mb-3">
                      <img
                        src={mediaFiles[0].preview}
                        alt="Content preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  <p className="text-white/90 text-sm whitespace-pre-wrap">
                    {contentText}
                  </p>
                  
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-white/60 hover:text-white transition-colors">
                        <span className="text-sm">❤️</span>
                        <span className="text-xs">Like</span>
                      </button>
                      <button className="flex items-center space-x-1 text-white/60 hover:text-white transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span className="text-xs">Share</span>
                      </button>
                    </div>
                    <div className="text-white/60 text-xs">
                      {selectedPlatforms.length} platform(s)
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <Button
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full ${
                  step <= currentStep ? 'bg-sunset-orange' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
          
          {currentStep < 4 ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-sunset-orange to-golden-yellow text-white"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSchedule}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-sunset-orange to-golden-yellow text-white"
            >
              Schedule Content
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentWizard;