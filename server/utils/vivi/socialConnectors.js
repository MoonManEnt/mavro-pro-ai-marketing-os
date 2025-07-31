// ViVi Social Media Platform Connectors
import fetch from 'node-fetch';
import { retry } from '../retry.js';

// Facebook/Instagram Connector
export class FacebookConnector {
  async publish({ accessToken, content, media = [] }) {
    return retry(async () => {
      const url = 'https://graph.facebook.com/v13.0/me/feed';
      const params = new URLSearchParams();
      params.append('message', content);
      params.append('access_token', accessToken);
      
      if (media.length > 0) {
        params.append('link', media[0]);
      }
      
      const res = await fetch(url, { method: 'POST', body: params });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Facebook publish failed: ${res.status} - ${errorText}`);
      }
      return res.json();
    }, 3, 1000);
  }

  async getProfile({ accessToken }) {
    const url = `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to get Facebook profile');
    return res.json();
  }
}

// X (Twitter) Connector
export class XConnector {
  async publish({ accessToken, content, media = [] }) {
    return retry(async () => {
      const url = 'https://api.twitter.com/2/tweets';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: content })
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Twitter publish failed: ${res.status} - ${errorText}`);
      }
      return res.json();
    }, 3, 1000);
  }

  async getProfile({ accessToken }) {
    const url = 'https://api.twitter.com/2/users/me';
    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    if (!res.ok) throw new Error('Failed to get Twitter profile');
    return res.json();
  }
}

// TikTok Connector
export class TikTokConnector {
  async publish({ accessToken, content, media = [] }) {
    return retry(async () => {
      const url = 'https://business-api.tiktok.com/open_api/v1.2/post/create/';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Access-Token': accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: content, video_url: media[0] })
      });
      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(`TikTok publish failed: ${res.status} - ${JSON.stringify(errJson)}`);
      }
      return res.json();
    }, 3, 1000);
  }

  async getProfile({ accessToken }) {
    const url = 'https://business-api.tiktok.com/open_api/v1.2/user/info/';
    const res = await fetch(url, {
      headers: { 'Access-Token': accessToken }
    });
    if (!res.ok) throw new Error('Failed to get TikTok profile');
    return res.json();
  }
}

// LinkedIn Connector
export class LinkedInConnector {
  async publish({ accessToken, content, media = [] }) {
    return retry(async () => {
      const url = 'https://api.linkedin.com/v2/ugcPosts';
      const postData = {
        author: 'urn:li:person:YOUR_PERSON_ID',
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: content },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' }
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        },
        body: JSON.stringify(postData)
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`LinkedIn publish failed: ${res.status} - ${errorText}`);
      }
      return res.json();
    }, 3, 1000);
  }

  async getProfile({ accessToken }) {
    const url = 'https://api.linkedin.com/v2/people/(id:YOUR_PERSON_ID)';
    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    if (!res.ok) throw new Error('Failed to get LinkedIn profile');
    return res.json();
  }
}

// Instagram Connector (separate from Facebook)
export class InstagramConnector {
  async publish({ accessToken, content, media = [] }) {
    return retry(async () => {
      // First create media object
      const mediaUrl = 'https://graph.facebook.com/v13.0/me/media';
      const mediaParams = new URLSearchParams();
      mediaParams.append('image_url', media[0]);
      mediaParams.append('caption', content);
      mediaParams.append('access_token', accessToken);

      const mediaRes = await fetch(mediaUrl, { method: 'POST', body: mediaParams });
      const mediaData = await mediaRes.json();

      // Then publish the media
      const publishUrl = 'https://graph.facebook.com/v13.0/me/media_publish';
      const publishParams = new URLSearchParams();
      publishParams.append('creation_id', mediaData.id);
      publishParams.append('access_token', accessToken);

      const res = await fetch(publishUrl, { method: 'POST', body: publishParams });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Instagram publish failed: ${res.status} - ${errorText}`);
      }
      return res.json();
    }, 3, 1000);
  }
}

// Google Business Profile Connector
export class GBPConnector {
  async publish({ accessToken, content, media = [] }) {
    return retry(async () => {
      const accountPath = process.env.GBP_ACCOUNT_PATH;
      const url = `https://mybusinessbusinessinformation.googleapis.com/v1/${accountPath}/localPosts`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ summary: content })
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`GBP publish failed: ${res.status} - ${errorText}`);
      }
      return res.json();
    }, 3, 1000);
  }
}

// Connector Factory
export const ConnectorFactory = {
  get: (platform) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return new FacebookConnector();
      case 'x':
      case 'twitter': return new XConnector();
      case 'tiktok': return new TikTokConnector();
      case 'linkedin': return new LinkedInConnector();
      case 'instagram': return new InstagramConnector();
      case 'google-business':
      case 'gbp': return new GBPConnector();
      default: throw new Error(`No connector available for platform: ${platform}`);
    }
  }
};

// Helper function to get all supported platforms
export const getSupportedPlatforms = () => [
  'facebook',
  'x',
  'tiktok', 
  'linkedin',
  'instagram',
  'google-business'
];