// OAuth helpers for social media platform authentication
import fetch from 'node-fetch';

// Platform-specific OAuth configurations
const oauthConfigs = {
  facebook: {
    authUrl: 'https://www.facebook.com/v13.0/dialog/oauth',
    tokenUrl: 'https://graph.facebook.com/v13.0/oauth/access_token',
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    scope: 'pages_manage_posts,pages_read_engagement,publish_to_groups'
  },
  x: {
    authUrl: 'https://twitter.com/i/oauth2/authorize',
    tokenUrl: 'https://api.twitter.com/2/oauth2/token',
    clientId: process.env.X_CLIENT_ID,
    clientSecret: process.env.X_CLIENT_SECRET,
    scope: 'tweet.read,tweet.write,users.read'
  },
  linkedin: {
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    scope: 'w_member_social'
  },
  tiktok: {
    authUrl: 'https://business-api.tiktok.com/portal/auth',
    tokenUrl: 'https://business-api.tiktok.com/open_api/v1.2/oauth2/access_token/',
    clientId: process.env.TIKTOK_CLIENT_ID,
    clientSecret: process.env.TIKTOK_CLIENT_SECRET,
    scope: 'user.info.basic,video.list'
  },
  instagram: {
    authUrl: 'https://api.instagram.com/oauth/authorize',
    tokenUrl: 'https://api.instagram.com/oauth/access_token',
    clientId: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    scope: 'user_profile,user_media'
  }
};

// Generate authorization URL for a platform
export function getAuthorizationUrl(platform, redirectUri, state = null) {
  const config = oauthConfigs[platform];
  if (!config) {
    throw new Error(`OAuth configuration not found for platform: ${platform}`);
  }

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: redirectUri,
    scope: config.scope,
    response_type: 'code',
    ...(state && { state })
  });

  return `${config.authUrl}?${params.toString()}`;
}

// Exchange authorization code for access token
export async function fetchPlatformToken(platform, code, redirectUri) {
  const config = oauthConfigs[platform];
  if (!config) {
    throw new Error(`OAuth configuration not found for platform: ${platform}`);
  }

  const params = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri
  });

  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: params
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Token exchange failed for ${platform}: ${response.status} - ${errorData}`);
  }

  return response.json();
}

// Refresh access token
export async function fetchPlatformRefresh(platform, refreshToken) {
  const config = oauthConfigs[platform];
  if (!config) {
    throw new Error(`OAuth configuration not found for platform: ${platform}`);
  }

  const params = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token'
  });

  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: params
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Token refresh failed for ${platform}: ${response.status} - ${errorData}`);
  }

  return response.json();
}

// Validate access token
export async function validateToken(platform, accessToken) {
  try {
    const config = oauthConfigs[platform];
    if (!config) return false;

    let validationUrl;
    let headers = { 'Authorization': `Bearer ${accessToken}` };

    switch (platform) {
      case 'facebook':
        validationUrl = `https://graph.facebook.com/me?access_token=${accessToken}`;
        headers = {};
        break;
      case 'x':
        validationUrl = 'https://api.twitter.com/2/users/me';
        break;
      case 'linkedin':
        validationUrl = 'https://api.linkedin.com/v2/people/(id:YOUR_PERSON_ID)';
        break;
      case 'tiktok':
        validationUrl = 'https://business-api.tiktok.com/open_api/v1.2/user/info/';
        headers = { 'Access-Token': accessToken };
        break;
      case 'instagram':
        validationUrl = `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`;
        headers = {};
        break;
      default:
        return false;
    }

    const response = await fetch(validationUrl, { headers });
    return response.ok;
  } catch (error) {
    console.error(`Token validation failed for ${platform}:`, error);
    return false;
  }
}

// Get platform-specific scopes
export function getPlatformScopes(platform) {
  const config = oauthConfigs[platform];
  return config ? config.scope.split(',') : [];
}

// Check if platform is supported
export function isPlatformSupported(platform) {
  return Object.keys(oauthConfigs).includes(platform);
}