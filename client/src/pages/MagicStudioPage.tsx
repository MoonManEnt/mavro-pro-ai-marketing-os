import React, { useState } from 'react';
import { Upload, Wand2, Eye, Send, Image, Video, Camera, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FaInstagram, FaFacebook, FaLinkedin, FaTiktok, FaYoutube, FaSnapchat } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
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
    
    // Platform-specific styling and layouts
    const platformStyles = {
      instagram: {
        headerBg: 'bg-white',
        headerText: 'text-black',
        borderColor: 'border-gray-200'
      },
      facebook: {
        headerBg: 'bg-[#1877F2]',
        headerText: 'text-white',
        borderColor: 'border-[#1877F2]'
      },
      linkedin: {
        headerBg: 'bg-[#0A66C2]',
        headerText: 'text-white', 
        borderColor: 'border-[#0A66C2]'
      },
      tiktok: {
        headerBg: 'bg-black',
        headerText: 'text-white',
        borderColor: 'border-black'
      },
      youtube: {
        headerBg: 'bg-[#FF0000]',
        headerText: 'text-white',
        borderColor: 'border-[#FF0000]'
      },
      snapchat: {
        headerBg: 'bg-[#FFFC00]',
        headerText: 'text-black',
        borderColor: 'border-[#FFFC00]'
      }
    };

    const style = platformStyles[platformId as keyof typeof platformStyles] || platformStyles.instagram;
    
    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 max-w-sm mx-auto">
        {/* Platform Header */}
        <div className={`${style.headerBg} p-4 ${style.headerText} border-b ${style.borderColor}`}>
          <div className="flex items-center space-x-3">
            <div className="text-xl">
              {platform.icon}
            </div>
            <div>
              <div className="font-semibold">{platform.name}</div>
              <div className="text-xs opacity-70">Preview</div>
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
            <div className="flex-1">
              <div className="font-semibold text-gray-900">Your Business</div>
              <div className="text-xs text-gray-500">2 minutes ago</div>
            </div>
            {/* Platform-specific UI elements */}
            {platformId === 'instagram' && (
              <div className="text-gray-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            )}
            {platformId === 'tiktok' && (
              <div className="text-gray-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </div>
            )}
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
              {platformId === 'instagram' && (
                <>
                  <span className="text-xs flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
                    </svg>
                    324
                  </span>
                  <span className="text-xs flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                    12
                  </span>
                  <span className="text-xs flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                    </svg>
                    8
                  </span>
                </>
              )}
              {platformId === 'facebook' && (
                <>
                  <span className="text-xs">👍 324 reactions</span>
                  <span className="text-xs">12 comments</span>
                  <span className="text-xs">8 shares</span>
                </>
              )}
              {platformId === 'linkedin' && (
                <>
                  <span className="text-xs">324 👍</span>
                  <span className="text-xs">12 comments</span>
                  <span className="text-xs">8 reposts</span>
                </>
              )}
              {platformId === 'tiktok' && (
                <>
                  <span className="text-xs">❤️ 324</span>
                  <span className="text-xs">💬 12</span>
                  <span className="text-xs">↗️ 8</span>
                </>
              )}
              {platformId === 'youtube' && (
                <>
                  <span className="text-xs">👍 324</span>
                  <span className="text-xs">👎 2</span>
                  <span className="text-xs">💬 12</span>
                </>
              )}
              {platformId === 'snapchat' && (
                <>
                  <span className="text-xs">❤️ 324</span>
                  <span className="text-xs">💬 12</span>
                </>
              )}
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
                        
                        // Platform-specific selection styling
                        const platformBrandColors = {
                          instagram: isSelected ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent' : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50',
                          facebook: isSelected ? 'bg-[#1877F2] text-white border-transparent' : 'border-gray-200 hover:border-[#1877F2] hover:bg-blue-50',
                          linkedin: isSelected ? 'bg-[#0A66C2] text-white border-transparent' : 'border-gray-200 hover:border-[#0A66C2] hover:bg-blue-50',
                          tiktok: isSelected ? 'bg-black text-white border-transparent' : 'border-gray-200 hover:border-black hover:bg-gray-50',
                          youtube: isSelected ? 'bg-[#FF0000] text-white border-transparent' : 'border-gray-200 hover:border-[#FF0000] hover:bg-red-50',
                          snapchat: isSelected ? 'bg-[#FFFC00] text-black border-transparent' : 'border-gray-200 hover:border-[#FFFC00] hover:bg-yellow-50'
                        };
                        
                        const platformColor = platformBrandColors[platform.id as keyof typeof platformBrandColors] || platformBrandColors.instagram;
                        
                        return (
                          <button
                            key={platform.id}
                            onClick={() => togglePlatform(platform.id)}
                            className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-200 ${platformColor} ${
                              isSelected ? 'shadow-lg transform scale-105' : ''
                            }`}
                          >
                            <div className="text-lg">
                              {platform.icon}
                            </div>
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