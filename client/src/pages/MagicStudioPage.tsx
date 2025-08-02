import React, { useState } from 'react';
import { Upload, Wand2, Eye, Send, Image, Video, Camera, Sparkles, Instagram, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FaInstagram, FaFacebook, FaLinkedin, FaTiktok, FaYoutube, FaSnapchat } from 'react-icons/fa';
import { XIcon } from 'lucide-react';
import { ObjectUploader } from '@/components/ObjectUploader';
import type { UploadResult } from '@uppy/core';

interface MediaFile {
  id: string;
  url: string;
  type: 'image' | 'video';
  name: string;
  size: number;
}

interface ContentData {
  caption: string;
  hashtags: string[];
  platforms: string[];
  mediaFiles: MediaFile[];
}

const MagicStudioPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [content, setContent] = useState<ContentData>({
    caption: '',
    hashtags: [],
    platforms: [],
    mediaFiles: []
  });
  const [isUploading, setIsUploading] = useState(false);
  const [newHashtag, setNewHashtag] = useState('');
  const [previewPlatform, setPreviewPlatform] = useState('instagram');

  const platforms = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <FaInstagram className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500',
      dimensions: {
        post: { width: 1080, height: 1080 },
        story: { width: 1080, height: 1920 }
      }
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <FaFacebook className="w-5 h-5" />,
      color: 'from-blue-600 to-blue-700',
      dimensions: {
        post: { width: 1200, height: 630 },
        story: { width: 1080, height: 1920 }
      }
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <FaLinkedin className="w-5 h-5" />,
      color: 'from-blue-700 to-blue-800',
      dimensions: {
        post: { width: 1200, height: 627 },
        story: { width: 1080, height: 1920 }
      }
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: <FaTiktok className="w-5 h-5" />,
      color: 'from-black to-gray-800',
      dimensions: {
        post: { width: 1080, height: 1920 },
        story: { width: 1080, height: 1920 }
      }
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: <FaYoutube className="w-5 h-5" />,
      color: 'from-red-600 to-red-700',
      dimensions: {
        post: { width: 1280, height: 720 },
        story: { width: 1080, height: 1920 }
      }
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      icon: <FaSnapchat className="w-5 h-5" />,
      color: 'from-yellow-400 to-yellow-500',
      dimensions: {
        post: { width: 1080, height: 1920 },
        story: { width: 1080, height: 1920 }
      }
    }
  ];

  const handleGetUploadParameters = async () => {
    const demoFileId = `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const demoUploadUrl = `https://demo-storage.mavro.com/uploads/${demoFileId}`;
    
    return {
      method: 'PUT' as const,
      url: demoUploadUrl
    };
  };

  const handleUploadComplete = async (result: UploadResult<Record<string, unknown>, Record<string, unknown>>) => {
    setIsUploading(false);
    
    if (result.successful && result.successful.length > 0) {
      const newMediaFiles = result.successful.map((file) => {
        const previewUrl = file.data ? URL.createObjectURL(file.data as File) : file.uploadURL || '';
        
        return {
          id: `media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          url: previewUrl,
          type: file.type?.startsWith('video/') ? 'video' as const : 'image' as const,
          name: file.name || 'Untitled',
          size: file.size || 0
        };
      });

      setContent(prev => ({
        ...prev,
        mediaFiles: [...prev.mediaFiles, ...newMediaFiles]
      }));

      // Auto-advance to step 2 when files are uploaded
      if (currentStep === 1) {
        setCurrentStep(2);
      }
    }
  };

  const addHashtag = () => {
    if (newHashtag.trim() && !content.hashtags.includes(newHashtag.trim())) {
      setContent(prev => ({
        ...prev,
        hashtags: [...prev.hashtags, newHashtag.trim()]
      }));
      setNewHashtag('');
    }
  };

  const removeHashtag = (hashtag: string) => {
    setContent(prev => ({
      ...prev,
      hashtags: prev.hashtags.filter(h => h !== hashtag)
    }));
  };

  const togglePlatform = (platformId: string) => {
    setContent(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }));
  };

  const removeMediaFile = (fileId: string) => {
    setContent(prev => ({
      ...prev,
      mediaFiles: prev.mediaFiles.filter(f => f.id !== fileId)
    }));
  };

  const generateCaption = () => {
    const sampleCaptions = [
      "✨ Transforming moments into memories! What inspires you today? #CreativeLife #Inspiration",
      "🌟 Behind the scenes magic happening right here! Can't wait to share what we're working on. #BehindTheScenes #ComingSoon",
      "💫 Every great story starts with a single moment. This is ours. #Journey #NewBeginnings",
      "🚀 Innovation meets creativity. Ready to see what's next? #Innovation #Future"
    ];
    
    const randomCaption = sampleCaptions[Math.floor(Math.random() * sampleCaptions.length)];
    setContent(prev => ({ ...prev, caption: randomCaption }));
    
    // Auto-advance to step 3 when caption is generated
    if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const renderPlatformMockup = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    if (!platform) return null;

    const mainMedia = content.mediaFiles[0];
    
    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 max-w-sm mx-auto">
        {/* Platform Header */}
        <div className={`bg-gradient-to-r ${platform.color} p-4 text-white`}>
          <div className="flex items-center space-x-3">
            {platform.icon}
            <div>
              <div className="font-semibold">{platform.name}</div>
              <div className="text-xs opacity-80">Preview</div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4">
          {/* Profile Header */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">YB</span>
            </div>
            <div>
              <div className="font-semibold text-gray-900">Your Business</div>
              <div className="text-xs text-gray-500">2 minutes ago</div>
            </div>
          </div>

          {/* Media Preview */}
          {mainMedia && (
            <div className="mb-4 rounded-xl overflow-hidden bg-gray-100">
              {mainMedia.type === 'image' ? (
                <img 
                  src={mainMedia.url} 
                  alt={mainMedia.name}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <video 
                  src={mainMedia.url}
                  className="w-full h-64 object-cover"
                  controls
                />
              )}
            </div>
          )}

          {/* Caption */}
          {content.caption && (
            <div className="mb-3">
              <p className="text-gray-900 text-sm leading-relaxed">
                {content.caption}
              </p>
            </div>
          )}

          {/* Hashtags */}
          {content.hashtags.length > 0 && (
            <div className="mb-4">
              <p className="text-blue-600 text-sm">
                {content.hashtags.map(tag => `#${tag}`).join(' ')}
              </p>
            </div>
          )}

          {/* Platform Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex space-x-4 text-gray-500">
              <span className="text-xs">👍 324</span>
              <span className="text-xs">💬 12</span>
              <span className="text-xs">📤 8</span>
            </div>
            <span className="text-xs text-gray-400">2m</span>
          </div>
        </div>
      </div>
    );
  };

  const getStepStatus = (step: number) => {
    if (step < currentStep) return 'complete';
    if (step === currentStep) return 'active';
    return 'pending';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Mavro Magic Studio™</h1>
              <p className="text-purple-100">Upload photos & videos, create content, preview across platforms</p>
            </div>
            <Wand2 className="w-12 h-12 opacity-80" />
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4 mb-6">
          {[
            { num: 1, title: 'Upload & Setup', desc: 'Content & Platforms' },
            { num: 2, title: 'AI Generation', desc: 'Captions & Audio' },
            { num: 3, title: 'Preview', desc: 'Multi-Platform View' },
            { num: 4, title: 'Publish', desc: 'Deploy Content' }
          ].map((step) => {
            const status = getStepStatus(step.num);
            return (
              <div key={step.num} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${
                  status === 'complete' ? 'bg-green-500 text-white' :
                  status === 'active' ? 'bg-purple-500 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {step.num}
                </div>
                <div className="text-center">
                  <div className="font-semibold text-sm">{step.title}</div>
                  <div className="text-xs text-gray-500">{step.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center">
          <Badge variant="outline" className="px-4 py-1">
            Step {currentStep} of 4 • 0% Complete • In Progress...
          </Badge>
        </div>
      </div>

      {/* Step Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Controls */}
        <div className="space-y-6">
          {currentStep === 1 && (
            <>
              {/* Upload Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="w-5 h-5" />
                    <span>Content Upload & Platform Setup</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                    <ObjectUploader
                      maxNumberOfFiles={10}
                      maxFileSize={50485760}
                      onGetUploadParameters={handleGetUploadParameters}
                      onComplete={handleUploadComplete}
                      buttonClassName="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Upload Photos & Videos
                    </ObjectUploader>
                    <p className="text-gray-500 text-sm mt-2">
                      Select multiple photos & videos (up to 10 files, 50MB each)
                    </p>
                    <p className="text-purple-600 text-xs mt-1 font-medium">
                      Multi-select enabled: Hold Ctrl/Cmd to select multiple files
                    </p>
                  </div>

                  {/* Uploaded Files */}
                  {content.mediaFiles.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Uploaded Media ({content.mediaFiles.length})</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {content.mediaFiles.map((file) => (
                          <div key={file.id} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                              {file.type === 'image' ? (
                                <img 
                                  src={file.url} 
                                  alt={file.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <video 
                                  src={file.url}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <button
                              onClick={() => removeMediaFile(file.id)}
                              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Platform Selection */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Select Platforms</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {platforms.map((platform) => {
                        const isSelected = content.platforms.includes(platform.id);
                        return (
                          <button
                            key={platform.id}
                            onClick={() => togglePlatform(platform.id)}
                            className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all duration-200 ${
                              isSelected 
                                ? `bg-gradient-to-r ${platform.color} text-white border-transparent shadow-lg` 
                                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                            }`}
                          >
                            {platform.icon}
                            <span className="text-sm font-medium">{platform.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {content.mediaFiles.length > 0 && content.platforms.length > 0 && (
                    <Button 
                      onClick={() => setCurrentStep(2)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Continue to AI Generation →
                    </Button>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>AI Content Generation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Caption
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write your caption or let AI generate one..."
                    value={content.caption}
                    onChange={(e) => setContent(prev => ({ ...prev, caption: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <Button 
                    onClick={generateCaption}
                    variant="outline"
                    className="mt-2"
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate with AI
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hashtags
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      placeholder="Add hashtag"
                      value={newHashtag}
                      onChange={(e) => setNewHashtag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addHashtag()}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <Button onClick={addHashtag} size="sm">Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {content.hashtags.map((hashtag) => (
                      <Badge 
                        key={hashtag} 
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeHashtag(hashtag)}
                      >
                        #{hashtag} ×
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    onClick={() => setCurrentStep(1)}
                    variant="outline"
                  >
                    ← Back
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={!content.caption}
                  >
                    Continue to Preview →
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>Preview & Review</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview Platform
                  </label>
                  <select
                    value={previewPlatform}
                    onChange={(e) => setPreviewPlatform(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {content.platforms.map((platformId) => {
                      const platform = platforms.find(p => p.id === platformId);
                      return platform ? (
                        <option key={platformId} value={platformId}>
                          {platform.name}
                        </option>
                      ) : null;
                    })}
                  </select>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    onClick={() => setCurrentStep(2)}
                    variant="outline"
                  >
                    ← Back
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(4)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Continue to Publish →
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Send className="w-5 h-5" />
                  <span>Publish Content</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Publish!</h3>
                  <p className="text-gray-600 mb-6">
                    Your content is ready to go live across {content.platforms.length} platform{content.platforms.length !== 1 ? 's' : ''}
                  </p>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Publish Now
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full"
                    >
                      Schedule for Later
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={() => setCurrentStep(3)}
                  variant="outline"
                  className="w-full"
                >
                  ← Back to Preview
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Panel - Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {content.platforms.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select platforms to see live preview</p>
                </div>
              ) : content.mediaFiles.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Upload media to see preview</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Main Preview */}
                  <div>
                    {renderPlatformMockup(previewPlatform)}
                  </div>

                  {/* All Platform Previews */}
                  {content.platforms.length > 1 && currentStep >= 3 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">All Platform Previews</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {content.platforms.slice(0, 4).map((platformId) => (
                          <div key={platformId} className="transform scale-75 origin-top">
                            {renderPlatformMockup(platformId)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MagicStudioPage;