import React, { useState, useEffect } from 'react';
import { ExternalLink, Check, X, RefreshCw, AlertCircle, Key, Shield, Eye, Link2, Loader2 } from 'lucide-react';
import { SiInstagram, SiFacebook, SiX, SiLinkedin, SiTiktok, SiYoutube, SiPinterest, SiSnapchat } from 'react-icons/si';

interface SocialMediaConnectorProps {
  currentPersona: string;
  onConnectionUpdate: (platform: string, status: boolean, data?: any) => void;
}

interface SocialPlatform {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  authUrl: string;
  requiredFields: string[];
  scopes: string[];
  connected: boolean;
  connectionData?: any;
}

const SocialMediaConnector: React.FC<SocialMediaConnectorProps> = ({ 
  currentPersona, 
  onConnectionUpdate 
}) => {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([]);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [showConnectionModal, setShowConnectionModal] = useState<string | null>(null);
  const [connectionForm, setConnectionForm] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Initialize platforms configuration
  useEffect(() => {
    const platformsConfig: SocialPlatform[] = [
      {
        id: 'instagram',
        name: 'Instagram',
        icon: SiInstagram,
        color: 'bg-pink-500',
        authUrl: 'https://api.instagram.com/oauth/authorize',
        requiredFields: ['access_token'],
        scopes: ['user_profile', 'user_media'],
        connected: false
      },
      {
        id: 'facebook',
        name: 'Facebook',
        icon: SiFacebook,
        color: 'bg-blue-600',
        authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
        requiredFields: ['access_token'],
        scopes: ['pages_show_list', 'pages_read_engagement', 'pages_manage_posts'],
        connected: false
      },
      {
        id: 'linkedin',
        name: 'LinkedIn',
        icon: SiLinkedin,
        color: 'bg-blue-700',
        authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
        requiredFields: ['access_token'],
        scopes: ['r_liteprofile', 'r_emailaddress', 'w_member_social'],
        connected: false
      },
      {
        id: 'twitter',
        name: 'X (Twitter)',
        icon: SiX,
        color: 'bg-black',
        authUrl: 'https://twitter.com/i/oauth2/authorize',
        requiredFields: ['bearer_token', 'username'],
        scopes: ['tweet.read', 'tweet.write', 'users.read'],
        connected: false
      },
      {
        id: 'youtube',
        name: 'YouTube',
        icon: SiYoutube,
        color: 'bg-red-600',
        authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        requiredFields: ['api_key', 'channel_id'],
        scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
        connected: false
      },
      {
        id: 'tiktok',
        name: 'TikTok',
        icon: SiTiktok,
        color: 'bg-black',
        authUrl: 'https://www.tiktok.com/auth/authorize/',
        requiredFields: ['access_token'],
        scopes: ['user.info.basic', 'video.list'],
        connected: false
      },
      {
        id: 'pinterest',
        name: 'Pinterest',
        icon: SiPinterest,
        color: 'bg-red-500',
        authUrl: 'https://www.pinterest.com/oauth/',
        requiredFields: ['access_token'],
        scopes: ['read_public', 'write_public'],
        connected: false
      },
      {
        id: 'snapchat',
        name: 'Snapchat',
        icon: SiSnapchat,
        color: 'bg-yellow-400',
        authUrl: 'https://accounts.snapchat.com/login/oauth2/authorize',
        requiredFields: ['access_token'],
        scopes: ['snapchat-marketing-api'],
        connected: false
      }
    ];

    setPlatforms(platformsConfig);
  }, []);

  const handleConnect = async (platform: SocialPlatform) => {
    if (platform.connected) {
      handleDisconnect(platform.id);
      return;
    }

    setShowConnectionModal(platform.id);
    setError(null);
    setSuccess(null);
    
    // Initialize form with required fields
    const initialForm: { [key: string]: string } = {};
    platform.requiredFields.forEach(field => {
      initialForm[field] = '';
    });
    setConnectionForm(initialForm);
  };

  const handleDisconnect = async (platformId: string) => {
    try {
      setPlatforms(prev => prev.map(p => 
        p.id === platformId ? { ...p, connected: false, connectionData: null } : p
      ));
      
      onConnectionUpdate(platformId, false);
      setSuccess(`Successfully disconnected from ${platformId}`);
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError(`Failed to disconnect from ${platformId}`);
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleSubmitConnection = async (platformId: string) => {
    setConnecting(platformId);
    setError(null);
    
    try {
      const platform = platforms.find(p => p.id === platformId);
      if (!platform) throw new Error('Platform not found');

      // Validate required fields
      const missingFields = platform.requiredFields.filter(field => !connectionForm[field]);
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Call API to connect platform
      const response = await fetch('/api/social-media/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform: platformId,
          accessToken: connectionForm.access_token || connectionForm.bearer_token || connectionForm.api_key,
          additionalData: {
            username: connectionForm.username,
            channelId: connectionForm.channel_id
          }
        })
      });

      const result = await response.json();

      if (result.success) {
        // Update platform status
        setPlatforms(prev => prev.map(p => 
          p.id === platformId 
            ? { ...p, connected: true, connectionData: result.data }
            : p
        ));
        
        onConnectionUpdate(platformId, true, result.data);
        setSuccess(`Successfully connected to ${platform.name}!`);
        setShowConnectionModal(null);
        setConnectionForm({});
      } else {
        throw new Error(result.error || 'Connection failed');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Connection failed');
    } finally {
      setConnecting(null);
    }
  };

  const handleVerifyConnection = async (platformId: string) => {
    setConnecting(platformId);
    
    try {
      const platform = platforms.find(p => p.id === platformId);
      if (!platform?.connectionData) return;

      const response = await fetch('/api/social-media/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform: platformId,
          accessToken: platform.connectionData.accessToken
        })
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(`${platform.name} connection verified successfully!`);
      } else {
        throw new Error(result.error || 'Verification failed');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Verification failed');
    } finally {
      setConnecting(null);
    }
  };

  const getOAuthUrl = (platform: SocialPlatform) => {
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_SOCIAL_CLIENT_ID || 'your_client_id',
      redirect_uri: `${window.location.origin}/auth/callback`,
      response_type: 'code',
      scope: platform.scopes.join(' '),
      state: platform.id
    });

    return `${platform.authUrl}?${params.toString()}`;
  };

  const renderConnectionForm = (platform: SocialPlatform) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${platform.color} rounded-lg flex items-center justify-center`}>
              <platform.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Connect {platform.name}</h3>
              <p className="text-sm text-gray-500">Enter your API credentials</p>
            </div>
          </div>
          <button
            onClick={() => setShowConnectionModal(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {platform.requiredFields.map(field => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </label>
              <input
                type={field.includes('token') || field.includes('key') ? 'password' : 'text'}
                value={connectionForm[field] || ''}
                onChange={(e) => setConnectionForm(prev => ({ ...prev, [field]: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={`Enter your ${field.replace('_', ' ')}`}
              />
            </div>
          ))}

          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-start space-x-2">
              <Shield className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Required permissions:</p>
                <ul className="mt-1 list-disc list-inside text-xs">
                  {platform.scopes.map(scope => (
                    <li key={scope}>{scope}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={() => setShowConnectionModal(null)}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSubmitConnection(platform.id)}
              disabled={connecting === platform.id}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {connecting === platform.id ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4" />
                  <span>Connect</span>
                </>
              )}
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={() => window.open(getOAuthUrl(platform), '_blank')}
              className="text-sm text-purple-600 hover:text-purple-800 underline"
            >
              Or use OAuth flow
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Status Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-800">{success}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map(platform => (
          <div key={platform.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${platform.color} rounded-lg flex items-center justify-center`}>
                  <platform.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                  <p className="text-sm text-gray-500">
                    {platform.connected ? 'Connected' : 'Not connected'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {platform.connected && (
                  <button
                    onClick={() => handleVerifyConnection(platform.id)}
                    disabled={connecting === platform.id}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                    title="Verify connection"
                  >
                    {connecting === platform.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                  </button>
                )}
                
                <button
                  onClick={() => handleConnect(platform)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    platform.connected
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }`}
                >
                  {platform.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>

            {platform.connected && platform.connectionData && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-sm text-gray-600">
                  <p>Username: {platform.connectionData.username || platform.connectionData.name}</p>
                  {platform.connectionData.followers && (
                    <p>Followers: {platform.connectionData.followers.toLocaleString()}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Last synced: {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Connection Modal */}
      {showConnectionModal && (
        <>
          {renderConnectionForm(platforms.find(p => p.id === showConnectionModal)!)}
        </>
      )}
    </div>
  );
};

export default SocialMediaConnector;