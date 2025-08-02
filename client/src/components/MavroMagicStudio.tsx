import React, { useState, useRef } from 'react';
import { Camera, Upload, Image, Video, Sparkles, Wand2, Eye, Download, Share2 } from 'lucide-react';
import { FaInstagram, FaFacebook, FaLinkedin, FaTiktok, FaYoutube, FaSnapchat } from 'react-icons/fa';
import { XIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ObjectUploader } from './ObjectUploader';
import type { UploadResult } from '@uppy/core';

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  dimensions: {
    post: { width: number; height: number };
    story: { width: number; height: number };
  };
}

interface MediaFile {
  id: string;
  url: string;
  type: 'image' | 'video';
  name: string;
  size: number;
}

interface CampaignContent {
  caption: string;
  hashtags: string[];
  platforms: string[];
  mediaFiles: MediaFile[];
  contentType: 'post' | 'story' | 'reel';
}

interface MavroMagicStudioProps {
  onSaveCampaign?: (content: CampaignContent) => void;
  onClose?: () => void;
}

const platforms: Platform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: <FaInstagram className="w-5 h-5" />,
    color: 'from-pink-500 to-purple-600',
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
    id: 'twitter',
    name: 'X (Twitter)',
    icon: <XIcon className="w-5 h-5" />,
    color: 'from-black to-gray-800',
    dimensions: {
      post: { width: 1200, height: 675 },
      story: { width: 1080, height: 1920 }
    }
  }
];

const MavroMagicStudio: React.FC<MavroMagicStudioProps> = ({ onSaveCampaign, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [content, setContent] = useState<CampaignContent>({
    caption: '',
    hashtags: [],
    platforms: [],
    mediaFiles: [],
    contentType: 'post'
  });
  const [newHashtag, setNewHashtag] = useState('');
  const [previewPlatform, setPreviewPlatform] = useState('instagram');
  const [isUploading, setIsUploading] = useState(false);

  const handleMediaUpload = async () => {
    try {
      const response = await fetch('/api/objects/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error('Failed to get upload URL');
      }
      
      const data = await response.json();
      return {
        method: 'PUT' as const,
        url: data.uploadURL
      };
    } catch (error) {
      console.error('Error getting upload parameters:', error);
      throw error;
    }
  };

  const handleUploadComplete = async (result: UploadResult<Record<string, unknown>, Record<string, unknown>>) => {
    setIsUploading(false);
    
    if (result.successful && result.successful.length > 0) {
      const newMediaFiles = result.successful.map((file) => ({
        id: `media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        url: file.uploadURL || '',
        type: file.type?.startsWith('video/') ? 'video' as const : 'image' as const,
        name: file.name || 'Untitled',
        size: file.size || 0
      }));

      setContent(prev => ({
        ...prev,
        mediaFiles: [...prev.mediaFiles, ...newMediaFiles]
      }));

      // Update server with media references
      for (const file of result.successful) {
        try {
          await fetch('/api/objects/campaign-media', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mediaURL: file.uploadURL })
          });
        } catch (error) {
          console.error('Error updating campaign media:', error);
        }
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

  const renderPlatformMockup = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    if (!platform) return null;

    const mainMedia = content.mediaFiles[0];
    
    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        {/* Platform Header */}
        <div className={`bg-gradient-to-r ${platform.color} p-4 text-white`}>
          <div className="flex items-center space-x-3">
            {platform.icon}
            <div>
              <div className="font-semibold">{platform.name} Preview</div>
              <div className="text-xs opacity-80">{content.contentType}</div>
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

          {/* Platform-specific engagement indicators */}
          <div className="flex items-center justify-between text-gray-500 text-sm">
            <div className="flex items-center space-x-4">
              <span>❤️ 234</span>
              <span>💬 12</span>
              <span>🔄 8</span>
            </div>
            <div className="text-xs">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleSave = () => {
    if (onSaveCampaign) {
      onSaveCampaign(content);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Wand2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                    Mavro Magic Studio™
                  </h1>
                  <p className="text-gray-600 text-sm font-medium">
                    Create professional social media content with real photo & video uploads
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={content.mediaFiles.length === 0 || content.platforms.length === 0}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Save Campaign
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content Creation Panel */}
          <div className="space-y-6">
            {/* Media Upload */}
            <Card className="border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Upload Media</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                  <ObjectUploader
                    maxNumberOfFiles={5}
                    maxFileSize={50485760} // 50MB
                    onGetUploadParameters={handleMediaUpload}
                    onComplete={handleUploadComplete}
                    accept={['image/*', 'video/*']}
                    buttonClassName="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Upload Photos & Videos
                  </ObjectUploader>
                  <p className="text-gray-500 text-sm mt-2">
                    Support for images and videos up to 50MB
                  </p>
                </div>

                {/* Media Files List */}
                {content.mediaFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Uploaded Media</h4>
                    {content.mediaFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {file.type === 'image' ? (
                            <Image className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Video className="w-5 h-5 text-green-600" />
                          )}
                          <div>
                            <div className="font-medium text-sm">{file.name}</div>
                            <div className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(1)} MB
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMediaFile(file.id)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Platform Selection */}
            <Card className="border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle>Select Platforms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => togglePlatform(platform.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        content.platforms.includes(platform.id)
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${platform.color} flex items-center justify-center text-white`}>
                          {platform.icon}
                        </div>
                        <span className="font-medium text-gray-900">{platform.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Caption & Hashtags */}
            <Card className="border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle>Content Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Caption
                  </label>
                  <Textarea
                    value={content.caption}
                    onChange={(e) => setContent(prev => ({ ...prev, caption: e.target.value }))}
                    placeholder="Write your post caption..."
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hashtags
                  </label>
                  <div className="flex space-x-2 mb-3">
                    <Input
                      value={newHashtag}
                      onChange={(e) => setNewHashtag(e.target.value)}
                      placeholder="Add hashtag (without #)"
                      onKeyPress={(e) => e.key === 'Enter' && addHashtag()}
                    />
                    <Button onClick={addHashtag} variant="outline">
                      Add
                    </Button>
                  </div>
                  
                  {content.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {content.hashtags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="cursor-pointer hover:bg-red-100"
                          onClick={() => removeHashtag(tag)}
                        >
                          #{tag} ×
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview Panel */}
          <div className="space-y-6">
            <Card className="border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Live Preview</span>
                  </div>
                  
                  {content.platforms.length > 0 && (
                    <select
                      value={previewPlatform}
                      onChange={(e) => setPreviewPlatform(e.target.value)}
                      className="text-sm border border-gray-300 rounded-lg px-3 py-1"
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
                  )}
                </CardTitle>
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
                  <div className="max-w-sm mx-auto">
                    {renderPlatformMockup(previewPlatform)}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Platform Mockups Grid */}
            {content.platforms.length > 1 && content.mediaFiles.length > 0 && (
              <Card className="border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle>All Platform Previews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.platforms.slice(0, 4).map((platformId) => (
                      <div key={platformId} className="transform scale-75 origin-top">
                        {renderPlatformMockup(platformId)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MavroMagicStudio;