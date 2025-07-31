import React, { useState } from 'react';
import { User, Bell, Shield, CreditCard, Zap, Globe, Users, Mail, Phone, Lock, Eye, EyeOff, Save, RefreshCw, Trash2, Plus, Link, Settings as SettingsIcon, Check, X, ExternalLink, AlertCircle, Clock, Share2 } from 'lucide-react';
import { SiInstagram, SiFacebook, SiX, SiLinkedin, SiTiktok, SiYoutube, SiPinterest, SiSnapchat } from 'react-icons/si';

interface SettingsPageProps {
  currentPersona: string;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ currentPersona }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'billing' | 'integrations' | 'team'>('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentPersona === 'kemar' ? 'Kemar Hinds' : 
          currentPersona === 'karen' ? 'Karen Thompson' : 
          currentPersona === 'sarah' ? 'Sarah Martinez' : 
          currentPersona === 'marco' ? 'Marco Romano' : 
          currentPersona === 'alex' ? 'Alex Chen' : 'David Wilson',
    email: currentPersona === 'kemar' ? 'kemar.hinds@speaker.com' : 
           currentPersona === 'karen' ? 'karen.thompson@realestate.com' : 
           currentPersona === 'sarah' ? 'sarah.martinez@medspa.com' : 
           currentPersona === 'marco' ? 'marco.romano@restaurant.com' : 
           currentPersona === 'alex' ? 'alex.chen@fitness.com' : 'david.wilson@autodealership.com',
    phone: '(555) 123-4567',
    company: currentPersona === 'kemar' ? 'Kemar Hinds Speaking' : 
             currentPersona === 'karen' ? 'Thompson Real Estate' : 
             currentPersona === 'sarah' ? 'Martinez MedSpa' : 
             currentPersona === 'marco' ? 'Romano\'s Italian Kitchen' : 
             currentPersona === 'alex' ? 'Chen Fitness Studio' : 'Wilson Auto Sales',
    website: currentPersona === 'kemar' ? 'www.kemarhinds.com' : 
             currentPersona === 'karen' ? 'www.thompsonrealestate.com' : 
             currentPersona === 'sarah' ? 'www.martinezmedspa.com' : 
             currentPersona === 'marco' ? 'www.romanositalian.com' : 
             currentPersona === 'alex' ? 'www.chenfitness.com' : 'www.wilsonauto.com',
    bio: currentPersona === 'kemar' ? 'Keynote speaker and executive coach specializing in leadership development and organizational transformation.' : 
         currentPersona === 'karen' ? 'Licensed real estate agent in Miami Beach, specializing in luxury properties and investment opportunities.' : 
         currentPersona === 'sarah' ? 'Board-certified aesthetician specializing in non-invasive cosmetic treatments and anti-aging solutions.' : 
         currentPersona === 'marco' ? 'Italian chef and restaurant owner bringing authentic Italian cuisine to the local community.' : 
         currentPersona === 'alex' ? 'Certified personal trainer and nutrition coach helping clients achieve their fitness goals.' : 'Automotive sales professional with 15+ years of experience in luxury and electric vehicles.',
    timezone: 'America/New_York',
    language: 'en-US'
  });

  const [notifications, setNotifications] = useState({
    email: {
      campaigns: true,
      performance: true,
      reviews: false,
      security: true,
      billing: true,
      marketing: false
    },
    push: {
      campaigns: true,
      performance: false,
      reviews: true,
      security: true,
      billing: true,
      marketing: false
    },
    sms: {
      campaigns: false,
      performance: false,
      reviews: false,
      security: true,
      billing: true,
      marketing: false
    }
  });

  const [socialMediaAccounts, setSocialMediaAccounts] = useState([
    { 
      id: 1, 
      name: 'Instagram', 
      icon: SiInstagram, 
      connected: true, 
      type: 'Social Media',
      color: 'bg-pink-500',
      username: currentPersona === 'kemar' ? '@kemarhinds' : 
                currentPersona === 'karen' ? '@karenmiamiagent' : 
                currentPersona === 'sarah' ? '@martinezmedspa' : 
                currentPersona === 'marco' ? '@romanositalian' : 
                currentPersona === 'alex' ? '@alexfitnessmia' : '@wilsonluxuryautos',
      followers: currentPersona === 'kemar' ? '45.2K' : 
                 currentPersona === 'karen' ? '23.8K' : 
                 currentPersona === 'sarah' ? '31.5K' : 
                 currentPersona === 'marco' ? '18.3K' : 
                 currentPersona === 'alex' ? '28.7K' : '19.4K',
      lastSync: '2 minutes ago',
      permissions: ['publish_posts', 'read_insights', 'manage_comments'],
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Facebook', 
      icon: SiFacebook, 
      connected: true, 
      type: 'Social Media',
      color: 'bg-blue-600',
      username: currentPersona === 'kemar' ? 'Kemar Hinds Speaking' : 
                currentPersona === 'karen' ? 'Thompson Real Estate' : 
                currentPersona === 'sarah' ? 'Martinez MedSpa' : 
                currentPersona === 'marco' ? 'Romano\'s Italian Kitchen' : 
                currentPersona === 'alex' ? 'Chen Fitness Studio' : 'Wilson Auto Sales',
      followers: currentPersona === 'kemar' ? '12.4K' : 
                 currentPersona === 'karen' ? '8.9K' : 
                 currentPersona === 'sarah' ? '15.6K' : 
                 currentPersona === 'marco' ? '9.2K' : 
                 currentPersona === 'alex' ? '11.8K' : '7.3K',
      lastSync: '5 minutes ago',
      permissions: ['publish_posts', 'manage_ads', 'read_insights'],
      status: 'active'
    },
    { 
      id: 3, 
      name: 'LinkedIn', 
      icon: SiLinkedin, 
      connected: currentPersona === 'kemar' || currentPersona === 'karen' || currentPersona === 'david', 
      type: 'Social Media',
      color: 'bg-blue-700',
      username: currentPersona === 'kemar' ? 'Kemar Hinds' : 
                currentPersona === 'karen' ? 'Karen Thompson' : 
                currentPersona === 'david' ? 'David Wilson' : '',
      followers: currentPersona === 'kemar' ? '8.7K' : 
                 currentPersona === 'karen' ? '4.2K' : 
                 currentPersona === 'david' ? '3.1K' : '',
      lastSync: currentPersona === 'kemar' || currentPersona === 'karen' || currentPersona === 'david' ? '10 minutes ago' : '',
      permissions: ['publish_posts', 'read_insights'],
      status: currentPersona === 'kemar' || currentPersona === 'karen' || currentPersona === 'david' ? 'active' : 'disconnected'
    },
    { 
      id: 4, 
      name: 'X (Twitter)', 
      icon: SiX, 
      connected: currentPersona === 'kemar' || currentPersona === 'alex', 
      type: 'Social Media',
      color: 'bg-black',
      username: currentPersona === 'kemar' ? '@kemarhinds' : 
                currentPersona === 'alex' ? '@alexfitnessmia' : '',
      followers: currentPersona === 'kemar' ? '15.9K' : 
                 currentPersona === 'alex' ? '7.8K' : '',
      lastSync: currentPersona === 'kemar' || currentPersona === 'alex' ? '1 hour ago' : '',
      permissions: ['publish_posts', 'read_analytics'],
      status: currentPersona === 'kemar' || currentPersona === 'alex' ? 'active' : 'disconnected'
    },
    { 
      id: 5, 
      name: 'TikTok', 
      icon: SiTiktok, 
      connected: currentPersona === 'sarah' || currentPersona === 'marco' || currentPersona === 'alex', 
      type: 'Social Media',
      color: 'bg-black',
      username: currentPersona === 'sarah' ? '@martinezmedspa' : 
                currentPersona === 'marco' ? '@romanositalian' : 
                currentPersona === 'alex' ? '@alexfitnessmia' : '',
      followers: currentPersona === 'sarah' ? '52.3K' : 
                 currentPersona === 'marco' ? '28.7K' : 
                 currentPersona === 'alex' ? '41.2K' : '',
      lastSync: currentPersona === 'sarah' || currentPersona === 'marco' || currentPersona === 'alex' ? '30 minutes ago' : '',
      permissions: ['publish_posts', 'read_analytics'],
      status: currentPersona === 'sarah' || currentPersona === 'marco' || currentPersona === 'alex' ? 'active' : 'disconnected'
    },
    { 
      id: 6, 
      name: 'YouTube', 
      icon: SiYoutube, 
      connected: currentPersona === 'kemar' || currentPersona === 'alex', 
      type: 'Social Media',
      color: 'bg-red-600',
      username: currentPersona === 'kemar' ? 'Kemar Hinds Speaking' : 
                currentPersona === 'alex' ? 'Alex Chen Fitness' : '',
      followers: currentPersona === 'kemar' ? '3.2K' : 
                 currentPersona === 'alex' ? '12.8K' : '',
      lastSync: currentPersona === 'kemar' || currentPersona === 'alex' ? '2 hours ago' : '',
      permissions: ['upload_videos', 'read_analytics'],
      status: currentPersona === 'kemar' || currentPersona === 'alex' ? 'active' : 'disconnected'
    },
    { 
      id: 7, 
      name: 'Pinterest', 
      icon: SiPinterest, 
      connected: currentPersona === 'sarah' || currentPersona === 'karen', 
      type: 'Social Media',
      color: 'bg-red-500',
      username: currentPersona === 'sarah' ? '@martinezmedspa' : 
                currentPersona === 'karen' ? '@karenmiamiproperties' : '',
      followers: currentPersona === 'sarah' ? '8.9K' : 
                 currentPersona === 'karen' ? '12.4K' : '',
      lastSync: currentPersona === 'sarah' || currentPersona === 'karen' ? '45 minutes ago' : '',
      permissions: ['publish_pins', 'read_analytics'],
      status: currentPersona === 'sarah' || currentPersona === 'karen' ? 'active' : 'disconnected'
    },
    { 
      id: 8, 
      name: 'Snapchat', 
      icon: SiSnapchat, 
      connected: false, 
      type: 'Social Media',
      color: 'bg-yellow-400',
      username: '',
      followers: '',
      lastSync: '',
      permissions: [],
      status: 'disconnected'
    }
  ]);

  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'Google Analytics', connected: true, type: 'Analytics' },
    { id: 2, name: 'Facebook Ads', connected: true, type: 'Advertising' },
    { id: 3, name: 'Mailchimp', connected: false, type: 'Email Marketing' },
    { id: 4, name: 'Slack', connected: true, type: 'Communication' },
    { id: 5, name: 'Zapier', connected: false, type: 'Automation' },
    { id: 6, name: 'HubSpot', connected: currentPersona === 'karen' || currentPersona === 'david', type: 'CRM' },
    { id: 7, name: 'Shopify', connected: currentPersona === 'marco', type: 'E-commerce' },
    { id: 8, name: 'Calendly', connected: currentPersona === 'kemar' || currentPersona === 'sarah', type: 'Scheduling' }
  ]);

  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'integrations', label: 'Integrations', icon: Zap },
    { id: 'team', label: 'Team', icon: Users }
  ];

  const handleProfileSave = () => {
    // Save profile data
    console.log('Profile saved:', profileData);
  };

  const handleNotificationChange = (type: 'email' | 'push' | 'sms', setting: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [setting]: value
      }
    }));
  };

  const toggleIntegration = (id: number) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, connected: !integration.connected }
          : integration
      )
    );
  };

  const handleSocialMediaConnect = (platform: any) => {
    if (platform.connected) {
      setSelectedPlatform(platform);
      setShowPermissionsModal(true);
    } else {
      setSelectedPlatform(platform);
      setShowConnectModal(true);
    }
  };

  const connectSocialMedia = (platformId: number) => {
    setSocialMediaAccounts(prev =>
      prev.map(account =>
        account.id === platformId
          ? { ...account, connected: true, status: 'active', lastSync: 'Just now' }
          : account
      )
    );
    setShowConnectModal(false);
  };

  const disconnectSocialMedia = (platformId: number) => {
    setSocialMediaAccounts(prev =>
      prev.map(account =>
        account.id === platformId
          ? { ...account, connected: false, status: 'disconnected', lastSync: '', username: '', followers: '' }
          : account
      )
    );
    setShowPermissionsModal(false);
  };

  const refreshSocialMedia = (platformId: number) => {
    setSocialMediaAccounts(prev =>
      prev.map(account =>
        account.id === platformId
          ? { ...account, lastSync: 'Just now' }
          : account
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 space-y-2">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-50 text-purple-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                <button 
                  onClick={handleProfileSave}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>

              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-purple-600">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium">
                      Change Photo
                    </button>
                    <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF (max 2MB)</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={profileData.company}
                      onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Zone
                    </label>
                    <select
                      value={profileData.timezone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, timezone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
              
              <div className="space-y-8">
                {/* Email Notifications */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    {Object.entries(notifications.email).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 capitalize">{key}</p>
                          <p className="text-sm text-gray-500">
                            {key === 'campaigns' && 'Updates about your campaign performance'}
                            {key === 'performance' && 'Weekly performance reports'}
                            {key === 'reviews' && 'New customer reviews and ratings'}
                            {key === 'security' && 'Security alerts and login notifications'}
                            {key === 'billing' && 'Payment receipts and billing updates'}
                            {key === 'marketing' && 'Marketing tips and product updates'}
                          </p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange('email', key, !value)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? 'bg-purple-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Push Notifications */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h3>
                  <div className="space-y-4">
                    {Object.entries(notifications.push).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 capitalize">{key}</p>
                          <p className="text-sm text-gray-500">
                            {key === 'campaigns' && 'Real-time campaign alerts'}
                            {key === 'performance' && 'Performance milestones'}
                            {key === 'reviews' && 'New review notifications'}
                            {key === 'security' && 'Security alerts'}
                            {key === 'billing' && 'Payment notifications'}
                            {key === 'marketing' && 'Marketing updates'}
                          </p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange('push', key, !value)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? 'bg-purple-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
              
              <div className="space-y-8">
                {/* Password */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Password</h3>
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Current Password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Enable 2FA</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
                      Enable
                    </button>
                  </div>
                </div>

                {/* Active Sessions */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Active Sessions</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Globe className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Current Session</p>
                          <p className="text-sm text-gray-500">Chrome on macOS • New York, NY</p>
                        </div>
                      </div>
                      <span className="text-sm text-green-600">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Billing & Subscription</h2>
              
              <div className="space-y-8">
                {/* Current Plan */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Current Plan</h3>
                  <div className="p-6 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-semibold text-purple-900">Mavro Pro</h4>
                        <p className="text-purple-700">Advanced AI marketing suite</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-900">$99</p>
                        <p className="text-purple-700">per month</p>
                      </div>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
                      Upgrade Plan
                    </button>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-500">Expires 12/26</p>
                        </div>
                      </div>
                      <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                        Update
                      </button>
                    </div>
                  </div>
                </div>

                {/* Billing History */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Billing History</h3>
                  <div className="space-y-3">
                    {[
                      { date: '2025-01-01', amount: '$99.00', status: 'Paid' },
                      { date: '2024-12-01', amount: '$99.00', status: 'Paid' },
                      { date: '2024-11-01', amount: '$99.00', status: 'Paid' }
                    ].map((invoice, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{invoice.date}</p>
                          <p className="text-sm text-gray-500">Monthly subscription</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{invoice.amount}</p>
                          <p className="text-sm text-green-600">{invoice.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              {/* Social Media Integrations */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Share2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Social Media Accounts</h2>
                      <p className="text-sm text-gray-600">Connect your social media accounts to publish content</p>
                    </div>
                  </div>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Platform</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {socialMediaAccounts.map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <div key={platform.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 ${platform.color} rounded-lg flex items-center justify-center`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{platform.name}</h3>
                              <p className="text-sm text-gray-500">{platform.type}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleSocialMediaConnect(platform)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                              platform.connected
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                          >
                            {platform.connected ? 'Manage' : 'Connect'}
                          </button>
                        </div>
                        
                        {platform.connected && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Account:</span>
                              <span className="text-sm font-medium text-gray-900">{platform.username}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Followers:</span>
                              <span className="text-sm font-medium text-gray-900">{platform.followers}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Last Sync:</span>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-sm text-gray-500">{platform.lastSync}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-green-600">
                              <Check className="w-4 h-4" />
                              <span>Active connection</span>
                            </div>
                          </div>
                        )}
                        
                        {!platform.connected && (
                          <div className="text-center py-4 text-gray-500">
                            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                            <p className="text-sm">Not connected</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Business Integrations */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Business Integrations</h2>
                      <p className="text-sm text-gray-600">Connect your business tools and analytics</p>
                    </div>
                  </div>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Integration</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {integrations.map((integration) => (
                    <div key={integration.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Link className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{integration.name}</h3>
                            <p className="text-sm text-gray-500">{integration.type}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleIntegration(integration.id)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            integration.connected
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {integration.connected ? 'Connected' : 'Connect'}
                        </button>
                      </div>
                      {integration.connected && (
                        <div className="flex items-center space-x-2 text-sm text-green-600">
                          <Check className="w-4 h-4" />
                          <span>Successfully connected</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Team Management</h2>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Invite Member</span>
                </button>
              </div>
              
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Team collaboration features</p>
                <p className="text-sm text-gray-500">Invite team members to collaborate on campaigns and content</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Connect Social Media Modal */}
      {showConnectModal && selectedPlatform && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${selectedPlatform.color} rounded-lg flex items-center justify-center`}>
                  <selectedPlatform.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Connect {selectedPlatform.name}</h3>
                  <p className="text-sm text-gray-600">Authorize Mavro Pro to manage your account</p>
                </div>
              </div>
              <button
                onClick={() => setShowConnectModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Permissions Required:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Publish posts and stories</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Read analytics and insights</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Manage comments and messages</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Secure Connection</h4>
                    <p className="text-sm text-blue-700">Your account credentials are encrypted and never stored by Mavro Pro.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConnectModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => connectSocialMedia(selectedPlatform.id)}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Connect with {selectedPlatform.name}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permissions Management Modal */}
      {showPermissionsModal && selectedPlatform && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${selectedPlatform.color} rounded-lg flex items-center justify-center`}>
                  <selectedPlatform.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Manage {selectedPlatform.name}</h3>
                  <p className="text-sm text-gray-600">{selectedPlatform.username}</p>
                </div>
              </div>
              <button
                onClick={() => setShowPermissionsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <h4 className="font-medium text-green-900">Connected Successfully</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Account:</span>
                    <p className="font-medium text-gray-900">{selectedPlatform.username}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Followers:</span>
                    <p className="font-medium text-gray-900">{selectedPlatform.followers}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Sync:</span>
                    <p className="font-medium text-gray-900">{selectedPlatform.lastSync}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Current Permissions:</h4>
                <div className="space-y-2">
                  {selectedPlatform.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700 capitalize">{permission.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => refreshSocialMedia(selectedPlatform.id)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button
                onClick={() => disconnectSocialMedia(selectedPlatform.id)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;