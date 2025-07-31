export interface OAuthProvider {
  name: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  authorizationUrl: string;
  tokenUrl: string;
  userInfoUrl: string;
  scope: string[];
}

export const providers: Record<string, OAuthProvider> = {
  google: {
    name: 'Google',
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    redirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/google/callback',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
    scope: ['openid', 'email', 'profile']
  },
  github: {
    name: 'GitHub',
    clientId: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    redirectUri: process.env.GITHUB_REDIRECT_URI || 'http://localhost:3000/auth/github/callback',
    authorizationUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    userInfoUrl: 'https://api.github.com/user',
    scope: ['user:email']
  },
  apple: {
    name: 'Apple',
    clientId: process.env.APPLE_CLIENT_ID || '',
    clientSecret: process.env.APPLE_CLIENT_SECRET || '',
    redirectUri: process.env.APPLE_REDIRECT_URI || 'http://localhost:3000/auth/apple/callback',
    authorizationUrl: 'https://appleid.apple.com/auth/authorize',
    tokenUrl: 'https://appleid.apple.com/auth/token',
    userInfoUrl: 'https://appleid.apple.com/auth/userinfo',
    scope: ['name', 'email']
  }
};

export function getAuthorizationUrl(provider: string, state: string): string {
  const config = providers[provider];
  if (!config) {
    throw new Error(`Unknown provider: ${provider}`);
  }

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    scope: config.scope.join(' '),
    response_type: 'code',
    state: state
  });

  return `${config.authorizationUrl}?${params.toString()}`;
}

export async function exchangeCodeForToken(provider: string, code: string): Promise<any> {
  const config = providers[provider];
  if (!config) {
    throw new Error(`Unknown provider: ${provider}`);
  }

  // For demo purposes, return mock token data since OAuth requires external setup
  return {
    access_token: `demo_access_token_${provider}_${Date.now()}`,
    token_type: 'Bearer',
    expires_in: 3600,
    refresh_token: `demo_refresh_token_${provider}_${Date.now()}`,
    scope: config.scope.join(' ')
  };
}

export async function getUserInfo(provider: string, accessToken: string): Promise<any> {
  const config = providers[provider];
  if (!config) {
    throw new Error(`Unknown provider: ${provider}`);
  }

  // For demo purposes, return mock user data based on provider
  const mockUsers: Record<string, any> = {
    google: {
      id: `google_demo_user_${Date.now()}`,
      sub: `google_demo_user_${Date.now()}`,
      email: 'demo.user@gmail.com',
      given_name: 'Demo',
      family_name: 'User',
      name: 'Demo User',
      picture: 'https://via.placeholder.com/150?text=Demo+User',
      verified_email: true
    },
    github: {
      id: `github_demo_user_${Date.now()}`,
      email: 'demo.user@github.com',
      login: 'demo-user',
      name: 'Demo User',
      avatar_url: 'https://via.placeholder.com/150?text=Demo+User'
    },
    apple: {
      id: `apple_demo_user_${Date.now()}`,
      sub: `apple_demo_user_${Date.now()}`,
      email: 'demo.user@icloud.com',
      name: {
        firstName: 'Demo',
        lastName: 'User'
      }
    }
  };

  const userData = mockUsers[provider] || {
    id: `${provider}_demo_user_${Date.now()}`,
    sub: `${provider}_demo_user_${Date.now()}`,
    email: `demo.user@${provider}.com`,
    name: 'Demo User',
    given_name: 'Demo',
    family_name: 'User'
  };

  console.log('Mock user data for', provider, ':', userData);
  return userData;
}