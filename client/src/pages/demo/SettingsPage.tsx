import { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Lock, 
  Palette, 
  Globe, 
  Shield, 
  Database, 
  Zap, 
  Link, 
  Mail, 
  Phone, 
  Calendar, 
  CreditCard,
  Save,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Plus,
  Check,
  X,
  ExternalLink,
  RefreshCw,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Info,
  Key,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Toggle
} from 'lucide-react';
import { FaInstagram, FaLinkedin, FaTiktok, FaYoutube, FaFacebook, FaTwitter, FaGoogle, FaSlack } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    desktop: true,
    marketing: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    dataSharing: false,
    analytics: true,
    cookies: true
  });

  const connectedAccounts = [
    {
      platform: 'LinkedIn',
      icon: FaLinkedin,
      connected: true,
      username: '@thomasvette',
      followers: '67.2K',
      lastSync: '2025-01-15 14:30',
      status: 'active',
      color: 'text-blue-400'
    },
    {
      platform: 'Instagram',
      icon: FaInstagram,
      connected: true,
      username: '@thomasvette_official',
      followers: '34.8K',
      lastSync: '2025-01-15 14:15',
      status: 'active',
      color: 'text-pink-400'
    },
    {
      platform: 'YouTube',
      icon: FaYoutube,
      connected: true,
      username: 'Thomas Vette Leadership',
      followers: '18.9K',
      lastSync: '2025-01-15 13:45',
      status: 'active',
      color: 'text-red-400'
    },
    {
      platform: 'TikTok',
      icon: FaTiktok,
      connected: true,
      username: '@thomasvette',
      followers: '89.1K',
      lastSync: '2025-01-15 14:20',
      status: 'active',
      color: 'text-purple-400'
    },
    {
      platform: 'Facebook',
      icon: FaFacebook,
      connected: false,
      username: '',
      followers: '0',
      lastSync: '',
      status: 'disconnected',
      color: 'text-blue-400'
    },
    {
      platform: 'Twitter',
      icon: FaTwitter,
      connected: true,
      username: '@thomasvette',
      followers: '23.4K',
      lastSync: '2025-01-15 14:10',
      status: 'warning',
      color: 'text-slate-400'
    }
  ];

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Lock },
    { id: 'integrations', label: 'Integrations', icon: Link },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'advanced', label: 'Advanced', icon: Shield }
  ];

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
            <input
              type="text"
              defaultValue="Thomas Vette"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Professional Title</label>
            <input
              type="text"
              defaultValue="Keynote Speaker & Leadership Expert"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <input
              type="email"
              defaultValue="thomas@thomasvette.com"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
          <textarea
            rows={4}
            defaultValue="Award-winning keynote speaker and leadership expert helping organizations build authentic leadership cultures. 15+ years of experience working with Fortune 500 companies."
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
        </div>
        <div className="mt-6 flex items-center space-x-3">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700/50">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAccount = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-semibold text-white mb-4">Account Security</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter current password"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>
        </div>
        <div className="mt-6">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Key className="w-4 h-4 mr-2" />
            Update Password
          </Button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
          <div>
            <div className="font-medium text-white">SMS Authentication</div>
            <div className="text-sm text-slate-400">Receive codes via SMS</div>
          </div>
          <Switch checked={true} />
        </div>
        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg mt-3">
          <div>
            <div className="font-medium text-white">Authenticator App</div>
            <div className="text-sm text-slate-400">Use Google Authenticator or similar</div>
          </div>
          <Switch checked={false} />
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <div>
                <div className="font-medium text-white">Email Notifications</div>
                <div className="text-sm text-slate-400">Receive updates via email</div>
              </div>
            </div>
            <Switch 
              checked={notifications.email} 
              onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="font-medium text-white">Push Notifications</div>
                <div className="text-sm text-slate-400">Browser push notifications</div>
              </div>
            </div>
            <Switch 
              checked={notifications.push} 
              onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-green-400" />
              <div>
                <div className="font-medium text-white">SMS Notifications</div>
                <div className="text-sm text-slate-400">Text message alerts</div>
              </div>
            </div>
            <Switch 
              checked={notifications.sms} 
              onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Monitor className="w-5 h-5 text-purple-400" />
              <div>
                <div className="font-medium text-white">Desktop Notifications</div>
                <div className="text-sm text-slate-400">Desktop system notifications</div>
              </div>
            </div>
            <Switch 
              checked={notifications.desktop} 
              onCheckedChange={(checked) => setNotifications({...notifications, desktop: checked})}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-semibold text-white mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Profile Visibility</label>
            <select 
              value={privacy.profileVisibility}
              onChange={(e) => setPrivacy({...privacy, profileVisibility: e.target.value})}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="connections">Connections Only</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
            <div>
              <div className="font-medium text-white">Data Sharing</div>
              <div className="text-sm text-slate-400">Share anonymized data for platform improvements</div>
            </div>
            <Switch 
              checked={privacy.dataSharing} 
              onCheckedChange={(checked) => setPrivacy({...privacy, dataSharing: checked})}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
            <div>
              <div className="font-medium text-white">Analytics Tracking</div>
              <div className="text-sm text-slate-400">Allow analytics to improve your experience</div>
            </div>
            <Switch 
              checked={privacy.analytics} 
              onCheckedChange={(checked) => setPrivacy({...privacy, analytics: checked})}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
            <div>
              <div className="font-medium text-white">Cookie Preferences</div>
              <div className="text-sm text-slate-400">Accept cookies for personalized experience</div>
            </div>
            <Switch 
              checked={privacy.cookies} 
              onCheckedChange={(checked) => setPrivacy({...privacy, cookies: checked})}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-semibold text-white mb-4">Social Media Connections</h3>
        <div className="space-y-4">
          {connectedAccounts.map((account, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-slate-600/50 rounded-full flex items-center justify-center">
                  <account.icon className={`w-5 h-5 ${account.color}`} />
                </div>
                <div>
                  <div className="font-medium text-white">{account.platform}</div>
                  {account.connected ? (
                    <div className="text-sm text-slate-400">
                      {account.username} • {account.followers} followers
                    </div>
                  ) : (
                    <div className="text-sm text-slate-400">Not connected</div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {account.connected && (
                  <div className="text-right">
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      account.status === 'active' ? 'bg-green-500/20 text-green-300' :
                      account.status === 'warning' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {account.status}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Last sync: {account.lastSync}
                    </div>
                  </div>
                )}
                {account.connected ? (
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700/50">
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Sync
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-600 text-red-300 hover:bg-red-800/30">
                      <X className="w-4 h-4 mr-1" />
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-semibold text-white mb-4">Current Plan</h3>
        <div className="p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-white">Mavro Pro Max</div>
              <div className="text-sm text-slate-300">Full platform access with ViVi AI</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-white">$99/month</div>
              <div className="text-sm text-slate-400">Billed monthly</div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700/50">
            <Edit className="w-4 h-4 mr-2" />
            Change Plan
          </Button>
          <Button variant="outline" className="border-red-600 text-red-300 hover:bg-red-800/30">
            <X className="w-4 h-4 mr-2" />
            Cancel Subscription
          </Button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
        <div className="p-4 bg-slate-700/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600/20 rounded flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <div className="font-medium text-white">•••• •••• •••• 4567</div>
                <div className="text-sm text-slate-400">Expires 12/26</div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700/50">
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdvanced = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-semibold text-white mb-4">Data Management</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
            <div>
              <div className="font-medium text-white">Export Data</div>
              <div className="text-sm text-slate-400">Download all your data</div>
            </div>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700/50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
            <div>
              <div className="font-medium text-white">Import Data</div>
              <div className="text-sm text-slate-400">Import data from other platforms</div>
            </div>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700/50">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-900/20 to-red-800/30 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
          Danger Zone
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-900/20 rounded-lg border border-red-500/30">
            <div>
              <div className="font-medium text-white">Delete Account</div>
              <div className="text-sm text-slate-400">Permanently delete your account and all data</div>
            </div>
            <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfile();
      case 'account':
        return renderAccount();
      case 'notifications':
        return renderNotifications();
      case 'privacy':
        return renderPrivacy();
      case 'integrations':
        return renderIntegrations();
      case 'billing':
        return renderBilling();
      case 'advanced':
        return renderAdvanced();
      default:
        return renderProfile();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Settings className="w-8 h-8 mr-3 text-purple-400" />
            Settings
          </h1>
          <p className="text-purple-300 mt-1">Manage your account and platform preferences</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;