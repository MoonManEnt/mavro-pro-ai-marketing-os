import React, { useState, useEffect, useRef } from 'react';
import { 
  Settings, User, Bell, Palette, Zap, Shield, Download, CreditCard, 
  HelpCircle, LogOut, Moon, Sun, Monitor, Globe, Mic, Brain, Target,
  Eye, Lock, Key, Smartphone, Mail, Database, Gauge, RotateCcw,
  CheckCircle, AlertTriangle, Info, Save, RefreshCw, Camera, Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GuidedDemoCard } from '@/components/settings/GuidedDemoCard';
import { ExportDataCard } from '@/components/settings/ExportDataCard';
import { BillingSettingsCard } from '@/components/settings/BillingSettingsCard';
import { IntegrationsCard } from '@/components/settings/IntegrationsCard';
import { AppearanceSettingsCard } from '@/components/settings/AppearanceSettingsCard';
import { FeatureTogglesCard } from '@/components/settings/FeatureTogglesCard';

const SettingsPage = () => {
  // File input ref for profile photo upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Profile photo state
  const [profilePhoto, setProfilePhoto] = useState<string | null>(
    localStorage.getItem('userProfilePhoto') || null
  );

  // Settings State Management
  const [settings, setSettings] = useState({
    // Account & Profile
    profile: {
      name: 'Kemar Hinds',
      email: 'kemar@hindsleadership.com',
      phone: '+1 (555) 123-4567',
      timezone: 'America/New_York',
      language: 'en-US'
    },
    
    // ViVi AI Behavior
    vivi: {
      autonomyLevel: 0.7,
      proactiveness: 0.8,
      voiceEnabled: true,
      suggestionsFrequency: 'balanced',
      learningMode: 'adaptive',
      personalityStyle: 'professional'
    },
    
    // Notifications
    notifications: {
      campaignUpdates: true,
      viviSuggestions: true,
      performanceAlerts: true,
      trendingTopics: true,
      leadActivity: true,
      emailDigest: 'weekly',
      pushNotifications: true,
      quietHours: { enabled: true, start: '22:00', end: '08:00' }
    },
    
    // Appearance
    appearance: {
      theme: 'light',
      compactMode: false,
      sidebarCollapsed: false,
      animationsEnabled: true,
      colorScheme: 'executive'
    },
    
    // Integrations
    integrations: {
      socialPlatforms: {
        instagram: { connected: true, autoPost: false },
        linkedin: { connected: true, autoPost: true },
        tiktok: { connected: false, autoPost: false },
        facebook: { connected: true, autoPost: false }
      },
      crm: { platform: 'hubspot', connected: false },
      calendar: { platform: 'google', connected: true },
      email: { platform: 'gmail', connected: true }
    },
    
    // Security & Privacy
    security: {
      twoFactorEnabled: false,
      sessionTimeout: 30,
      dataRetention: 365,
      analyticsTracking: true,
      performanceMonitoring: true
    },
    
    // Performance
    performance: {
      autoSave: true,
      cacheEnabled: true,
      advancedAnalytics: true,
      realTimeSync: true
    }
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Handle profile photo upload
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePhoto(result);
        localStorage.setItem('userProfilePhoto', result);
        setHasUnsavedChanges(true);
        
        // Dispatch custom event to update notifications
        window.dispatchEvent(new CustomEvent('profilePhotoUpdated', { 
          detail: { photo: result } 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePhoto = () => {
    setProfilePhoto(null);
    localStorage.removeItem('userProfilePhoto');
    setHasUnsavedChanges(true);
    
    // Dispatch custom event to update notifications
    window.dispatchEvent(new CustomEvent('profilePhotoUpdated', { 
      detail: { photo: null } 
    }));
  };

  // Handle setting updates
  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const updateNestedSetting = (category: string, subcategory: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [subcategory]: {
          ...(prev[category as keyof typeof prev] as any)[subcategory],
          [key]: value
        }
      }
    }));
    setHasUnsavedChanges(true);
  };

  // Save settings
  const saveSettings = async () => {
    setSaveStatus('saving');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('mavro-settings', JSON.stringify(settings));
      setSaveStatus('saved');
      setHasUnsavedChanges(false);
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  // Load settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('mavro-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    }
  }, []);

  const getSaveButtonColor = () => {
    switch (saveStatus) {
      case 'saving': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'saved': return 'bg-green-500 hover:bg-green-600';
      case 'error': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700';
    }
  };

  const getSaveButtonIcon = () => {
    switch (saveStatus) {
      case 'saving': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'saved': return <CheckCircle className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      default: return <Save className="w-4 h-4" />;
    }
  };

  const getSaveButtonText = () => {
    switch (saveStatus) {
      case 'saving': return 'Saving...';
      case 'saved': return 'Saved!';
      case 'error': return 'Error';
      default: return 'Save Changes';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 space-y-8">
      {/* Executive Command Header */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Mavro OS Settings</h1>
              <p className="text-gray-600 font-medium">Configure your workspace and preferences</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {hasUnsavedChanges && (
              <Badge className="bg-orange-100 text-orange-800 border-orange-300 font-bold">
                Unsaved Changes
              </Badge>
            )}
            <Button 
              onClick={saveSettings}
              disabled={!hasUnsavedChanges || saveStatus === 'saving'}
              className={`${getSaveButtonColor()} text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}
            >
              {getSaveButtonIcon()}
              <span className="ml-2">{getSaveButtonText()}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8 bg-gray-100 rounded-2xl p-1">
            <TabsTrigger value="profile" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="vivi" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Brain className="w-4 h-4 mr-2" />
              ViVi AI
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Palette className="w-4 h-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="integrations" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Zap className="w-4 h-4 mr-2" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="billing" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <CreditCard className="w-4 h-4 mr-2" />
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Photo Section */}
              <Card className="rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3">
                    <Camera className="w-5 h-5 text-purple-600" />
                    <span className="font-black">Profile Photo</span>
                  </CardTitle>
                  <CardDescription>Upload your profile photo for notifications and displays</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center space-y-4">
                    {/* Current Photo Display */}
                    <div className="relative group">
                      {profilePhoto ? (
                        <img 
                          src={profilePhoto} 
                          alt="Profile"
                          className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center border-4 border-gray-200 shadow-lg">
                          <User className="w-12 h-12 text-white" />
                        </div>
                      )}
                      {profilePhoto && (
                        <button
                          onClick={removeProfilePhoto}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          title="Remove photo"
                        >
                          ×
                        </button>
                      )}
                    </div>
                    
                    {/* Upload Controls */}
                    <div className="flex flex-col space-y-3 w-full">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {profilePhoto ? 'Change Photo' : 'Upload Photo'}
                      </Button>
                      <p className="text-xs text-gray-500 text-center">
                        JPG, PNG or GIF. Max size 5MB.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-blue-600" />
                    <span className="font-black">Personal Information</span>
                  </CardTitle>
                  <CardDescription>Update your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-bold text-gray-900">Full Name</Label>
                    <Input 
                      id="name"
                      value={settings.profile.name}
                      onChange={(e) => updateSetting('profile', 'name', e.target.value)}
                      className="rounded-xl border-2 border-gray-300 focus:border-purple-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-bold text-gray-900">Email Address</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={settings.profile.email}
                      onChange={(e) => updateSetting('profile', 'email', e.target.value)}
                      className="rounded-xl border-2 border-gray-300 focus:border-purple-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-bold text-gray-900">Phone Number</Label>
                    <Input 
                      id="phone"
                      value={settings.profile.phone}
                      onChange={(e) => updateSetting('profile', 'phone', e.target.value)}
                      className="rounded-xl border-2 border-gray-300 focus:border-purple-400"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-green-600" />
                    <span className="font-black">Regional Settings</span>
                  </CardTitle>
                  <CardDescription>Configure timezone and language preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="font-bold text-gray-900">Timezone</Label>
                    <Select value={settings.profile.timezone} onValueChange={(value) => updateSetting('profile', 'timezone', value)}>
                      <SelectTrigger className="rounded-xl border-2 border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (UTC-6)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (UTC-7)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (UTC-8)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-gray-900">Language</Label>
                    <Select value={settings.profile.language} onValueChange={(value) => updateSetting('profile', 'language', value)}>
                      <SelectTrigger className="rounded-xl border-2 border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="en-GB">English (UK)</SelectItem>
                        <SelectItem value="es-ES">Spanish</SelectItem>
                        <SelectItem value="fr-FR">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ViVi AI Settings */}
          <TabsContent value="vivi">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span className="font-black">AI Behavior</span>
                  </CardTitle>
                  <CardDescription>Configure how ViVi AI assists you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="font-bold text-gray-900">Autonomy Level</Label>
                      <Badge className="bg-purple-100 text-purple-800 font-bold">
                        {Math.round(settings.vivi.autonomyLevel * 100)}%
                      </Badge>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={settings.vivi.autonomyLevel}
                      onChange={(e) => updateSetting('vivi', 'autonomyLevel', parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <p className="text-xs text-gray-600">Higher levels allow ViVi to make more decisions autonomously</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="font-bold text-gray-900">Proactiveness</Label>
                      <Badge className="bg-blue-100 text-blue-800 font-bold">
                        {Math.round(settings.vivi.proactiveness * 100)}%
                      </Badge>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={settings.vivi.proactiveness}
                      onChange={(e) => updateSetting('vivi', 'proactiveness', parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <p className="text-xs text-gray-600">Controls how frequently ViVi offers suggestions</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-bold text-gray-900">Voice Interaction</Label>
                      <p className="text-xs text-gray-600">Enable voice commands and responses</p>
                    </div>
                    <Switch 
                      checked={settings.vivi.voiceEnabled}
                      onCheckedChange={(checked) => updateSetting('vivi', 'voiceEnabled', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-orange-600" />
                    <span className="font-black">Learning & Style</span>
                  </CardTitle>
                  <CardDescription>Customize ViVi's learning and communication style</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="font-bold text-gray-900">Suggestions Frequency</Label>
                    <Select value={settings.vivi.suggestionsFrequency} onValueChange={(value) => updateSetting('vivi', 'suggestionsFrequency', value)}>
                      <SelectTrigger className="rounded-xl border-2 border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimal">Minimal - Only when needed</SelectItem>
                        <SelectItem value="balanced">Balanced - Regular suggestions</SelectItem>
                        <SelectItem value="frequent">Frequent - Proactive assistance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-bold text-gray-900">Learning Mode</Label>
                    <Select value={settings.vivi.learningMode} onValueChange={(value) => updateSetting('vivi', 'learningMode', value)}>
                      <SelectTrigger className="rounded-xl border-2 border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="adaptive">Adaptive - Learn from patterns</SelectItem>
                        <SelectItem value="manual">Manual - Wait for instructions</SelectItem>
                        <SelectItem value="aggressive">Aggressive - Learn quickly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-bold text-gray-900">Personality Style</Label>
                    <Select value={settings.vivi.personalityStyle} onValueChange={(value) => updateSetting('vivi', 'personalityStyle', value)}>
                      <SelectTrigger className="rounded-xl border-2 border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional - Formal and direct</SelectItem>
                        <SelectItem value="friendly">Friendly - Casual and approachable</SelectItem>
                        <SelectItem value="concise">Concise - Brief and to the point</SelectItem>
                        <SelectItem value="detailed">Detailed - Comprehensive explanations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Continue with other tabs... */}
          <TabsContent value="notifications">
            <Card className="rounded-2xl border-2 border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-yellow-600" />
                  <span className="font-black">Notification Preferences</span>
                </CardTitle>
                <CardDescription>Control when and how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-black text-gray-900">Campaign & Performance</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="font-medium">Campaign Updates</Label>
                        <Switch 
                          checked={settings.notifications.campaignUpdates}
                          onCheckedChange={(checked) => updateSetting('notifications', 'campaignUpdates', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="font-medium">Performance Alerts</Label>
                        <Switch 
                          checked={settings.notifications.performanceAlerts}
                          onCheckedChange={(checked) => updateSetting('notifications', 'performanceAlerts', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="font-medium">Lead Activity</Label>
                        <Switch 
                          checked={settings.notifications.leadActivity}
                          onCheckedChange={(checked) => updateSetting('notifications', 'leadActivity', checked)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-black text-gray-900">ViVi AI & Trends</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="font-medium">ViVi Suggestions</Label>
                        <Switch 
                          checked={settings.notifications.viviSuggestions}
                          onCheckedChange={(checked) => updateSetting('notifications', 'viviSuggestions', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="font-medium">Trending Topics</Label>
                        <Switch 
                          checked={settings.notifications.trendingTopics}
                          onCheckedChange={(checked) => updateSetting('notifications', 'trendingTopics', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="font-medium">Push Notifications</Label>
                        <Switch 
                          checked={settings.notifications.pushNotifications}
                          onCheckedChange={(checked) => updateSetting('notifications', 'pushNotifications', checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Placeholder for other tabs */}
          <TabsContent value="appearance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AppearanceSettingsCard />
              <FeatureTogglesCard />
            </div>
          </TabsContent>

          <TabsContent value="integrations">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <IntegrationsCard />
              <div className="space-y-6">
                <GuidedDemoCard />
                <ExportDataCard />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Security & Privacy</h3>
              <p className="text-gray-600">Two-factor authentication, data retention, and privacy controls.</p>
            </div>
          </TabsContent>

          <TabsContent value="billing">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BillingSettingsCard />
              <div className="space-y-6">
                <Card className="rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <Database className="w-5 h-5 text-blue-600" />
                      <span className="font-black">Usage Statistics</span>
                    </CardTitle>
                    <CardDescription>Monitor your platform usage and limits</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Campaigns Created</span>
                      <Badge className="bg-blue-100 text-blue-800 font-bold">47 / 100</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">ViVi AI Requests</span>
                      <Badge className="bg-green-100 text-green-800 font-bold">2,341 / 5,000</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Storage Used</span>
                      <Badge className="bg-orange-100 text-orange-800 font-bold">7.2 GB / 25 GB</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;