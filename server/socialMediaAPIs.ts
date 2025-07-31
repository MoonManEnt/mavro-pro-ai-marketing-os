import { Request, Response } from 'express';

// Social Media API Integration Service
export class SocialMediaAPIService {
  private static instance: SocialMediaAPIService;
  private apiKeys: { [key: string]: string } = {};

  private constructor() {
    // Load API keys from environment variables
    this.apiKeys = {
      instagram: process.env.INSTAGRAM_ACCESS_TOKEN || '',
      facebook: process.env.FACEBOOK_ACCESS_TOKEN || '',
      linkedin: process.env.LINKEDIN_ACCESS_TOKEN || '',
      twitter: process.env.TWITTER_BEARER_TOKEN || '',
      youtube: process.env.YOUTUBE_API_KEY || '',
      tiktok: process.env.TIKTOK_ACCESS_TOKEN || '',
      pinterest: process.env.PINTEREST_ACCESS_TOKEN || '',
      snapchat: process.env.SNAPCHAT_ACCESS_TOKEN || ''
    };
  }

  public static getInstance(): SocialMediaAPIService {
    if (!SocialMediaAPIService.instance) {
      SocialMediaAPIService.instance = new SocialMediaAPIService();
    }
    return SocialMediaAPIService.instance;
  }

  // Instagram Basic Display API
  async getInstagramProfile(accessToken: string) {
    try {
      const response = await fetch(`https://graph.instagram.com/me?fields=id,username,media_count,account_type&access_token=${accessToken}`);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      return {
        id: data.id,
        username: data.username,
        followers: data.media_count || 0,
        accountType: data.account_type,
        platform: 'instagram',
        status: 'active'
      };
    } catch (error) {
      console.error('Instagram API Error:', error);
      throw new Error('Failed to fetch Instagram profile');
    }
  }

  // Facebook Graph API
  async getFacebookProfile(accessToken: string) {
    try {
      const response = await fetch(`https://graph.facebook.com/me?fields=id,name,picture,followers_count&access_token=${accessToken}`);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      return {
        id: data.id,
        name: data.name,
        followers: data.followers_count || 0,
        picture: data.picture?.data?.url,
        platform: 'facebook',
        status: 'active'
      };
    } catch (error) {
      console.error('Facebook API Error:', error);
      throw new Error('Failed to fetch Facebook profile');
    }
  }

  // LinkedIn API
  async getLinkedInProfile(accessToken: string) {
    try {
      const response = await fetch('https://api.linkedin.com/v2/people/~', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      return {
        id: data.id,
        firstName: data.firstName?.localized?.en_US,
        lastName: data.lastName?.localized?.en_US,
        platform: 'linkedin',
        status: 'active'
      };
    } catch (error) {
      console.error('LinkedIn API Error:', error);
      throw new Error('Failed to fetch LinkedIn profile');
    }
  }

  // Twitter API v2
  async getTwitterProfile(bearerToken: string, username: string) {
    try {
      const response = await fetch(`https://api.twitter.com/2/users/by/username/${username}?user.fields=public_metrics,profile_image_url`, {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      if (data.errors) {
        throw new Error(data.errors[0].detail);
      }

      return {
        id: data.data.id,
        username: data.data.username,
        name: data.data.name,
        followers: data.data.public_metrics?.followers_count || 0,
        profileImage: data.data.profile_image_url,
        platform: 'twitter',
        status: 'active'
      };
    } catch (error) {
      console.error('Twitter API Error:', error);
      throw new Error('Failed to fetch Twitter profile');
    }
  }

  // YouTube Data API
  async getYouTubeProfile(apiKey: string, channelId: string) {
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const channel = data.items[0];
      return {
        id: channel.id,
        title: channel.snippet.title,
        subscribers: parseInt(channel.statistics.subscriberCount) || 0,
        views: parseInt(channel.statistics.viewCount) || 0,
        videos: parseInt(channel.statistics.videoCount) || 0,
        thumbnail: channel.snippet.thumbnails?.default?.url,
        platform: 'youtube',
        status: 'active'
      };
    } catch (error) {
      console.error('YouTube API Error:', error);
      throw new Error('Failed to fetch YouTube profile');
    }
  }

  // TikTok Business API
  async getTikTokProfile(accessToken: string) {
    try {
      const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/user/info/', {
        headers: {
          'Access-Token': accessToken,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      if (data.code !== 0) {
        throw new Error(data.message);
      }

      return {
        id: data.data.user_id,
        username: data.data.display_name,
        followers: data.data.follower_count || 0,
        platform: 'tiktok',
        status: 'active'
      };
    } catch (error) {
      console.error('TikTok API Error:', error);
      throw new Error('Failed to fetch TikTok profile');
    }
  }

  // Pinterest API
  async getPinterestProfile(accessToken: string) {
    try {
      const response = await fetch('https://api.pinterest.com/v5/user_account', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      return {
        id: data.username,
        username: data.username,
        followers: data.follower_count || 0,
        platform: 'pinterest',
        status: 'active'
      };
    } catch (error) {
      console.error('Pinterest API Error:', error);
      throw new Error('Failed to fetch Pinterest profile');
    }
  }

  // Generic method to connect and verify social media accounts
  async connectSocialAccount(platform: string, token: string, additionalData?: any) {
    try {
      let profileData;
      
      switch (platform.toLowerCase()) {
        case 'instagram':
          profileData = await this.getInstagramProfile(token);
          break;
        case 'facebook':
          profileData = await this.getFacebookProfile(token);
          break;
        case 'linkedin':
          profileData = await this.getLinkedInProfile(token);
          break;
        case 'twitter':
          profileData = await this.getTwitterProfile(token, additionalData?.username || '');
          break;
        case 'youtube':
          profileData = await this.getYouTubeProfile(token, additionalData?.channelId || '');
          break;
        case 'tiktok':
          profileData = await this.getTikTokProfile(token);
          break;
        case 'pinterest':
          profileData = await this.getPinterestProfile(token);
          break;
        default:
          throw new Error(`Unsupported platform: ${platform}`);
      }

      return {
        success: true,
        data: profileData,
        message: `Successfully connected to ${platform}`
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: `Failed to connect to ${platform}`
      };
    }
  }

  // Get account insights/analytics
  async getAccountInsights(platform: string, accessToken: string, accountId?: string) {
    try {
      switch (platform.toLowerCase()) {
        case 'instagram':
          return await this.getInstagramInsights(accessToken, accountId);
        case 'facebook':
          return await this.getFacebookInsights(accessToken, accountId);
        case 'linkedin':
          return await this.getLinkedInInsights(accessToken);
        default:
          throw new Error(`Insights not available for ${platform}`);
      }
    } catch (error) {
      throw new Error(`Failed to fetch insights for ${platform}: ${error.message}`);
    }
  }

  private async getInstagramInsights(accessToken: string, accountId: string) {
    const response = await fetch(`https://graph.facebook.com/v18.0/${accountId}/insights?metric=reach,impressions,profile_views&period=day&access_token=${accessToken}`);
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.data;
  }

  private async getFacebookInsights(accessToken: string, pageId: string) {
    const response = await fetch(`https://graph.facebook.com/v18.0/${pageId}/insights?metric=page_impressions,page_reach,page_views&period=day&access_token=${accessToken}`);
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.data;
  }

  private async getLinkedInInsights(accessToken: string) {
    const response = await fetch('https://api.linkedin.com/v2/organizationPageStatistics', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    return data;
  }

  // Post content to social media platforms
  async postContent(platform: string, accessToken: string, content: any) {
    try {
      switch (platform.toLowerCase()) {
        case 'instagram':
          return await this.postToInstagram(accessToken, content);
        case 'facebook':
          return await this.postToFacebook(accessToken, content);
        case 'linkedin':
          return await this.postToLinkedIn(accessToken, content);
        case 'twitter':
          return await this.postToTwitter(accessToken, content);
        default:
          throw new Error(`Posting not supported for ${platform}`);
      }
    } catch (error) {
      throw new Error(`Failed to post to ${platform}: ${error.message}`);
    }
  }

  private async postToInstagram(accessToken: string, content: any) {
    // Instagram posting requires media creation first, then publishing
    const mediaResponse = await fetch(`https://graph.facebook.com/v18.0/${content.accountId}/media`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_url: content.imageUrl,
        caption: content.caption,
        access_token: accessToken
      })
    });

    const mediaData = await mediaResponse.json();
    
    if (mediaData.error) {
      throw new Error(mediaData.error.message);
    }

    // Publish the media
    const publishResponse = await fetch(`https://graph.facebook.com/v18.0/${content.accountId}/media_publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        creation_id: mediaData.id,
        access_token: accessToken
      })
    });

    const publishData = await publishResponse.json();
    
    if (publishData.error) {
      throw new Error(publishData.error.message);
    }

    return publishData;
  }

  private async postToFacebook(accessToken: string, content: any) {
    const response = await fetch(`https://graph.facebook.com/v18.0/${content.pageId}/feed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: content.message,
        access_token: accessToken
      })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    return data;
  }

  private async postToLinkedIn(accessToken: string, content: any) {
    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        author: `urn:li:person:${content.authorId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: content.text
            },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    return data;
  }

  private async postToTwitter(accessToken: string, content: any) {
    const response = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: content.text
      })
    });

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(data.errors[0].detail);
    }

    return data;
  }
}

// Express route handlers
export const socialMediaRoutes = {
  // Connect social media account
  connectAccount: async (req: Request, res: Response) => {
    try {
      const { platform, accessToken, additionalData } = req.body;
      
      if (!platform || !accessToken) {
        return res.status(400).json({
          success: false,
          error: 'Platform and access token are required'
        });
      }

      const apiService = SocialMediaAPIService.getInstance();
      const result = await apiService.connectSocialAccount(platform, accessToken, additionalData);
      
      res.json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  // Get account insights
  getInsights: async (req: Request, res: Response) => {
    try {
      const { platform, accessToken, accountId } = req.query;
      
      if (!platform || !accessToken) {
        return res.status(400).json({
          success: false,
          error: 'Platform and access token are required'
        });
      }

      const apiService = SocialMediaAPIService.getInstance();
      const insights = await apiService.getAccountInsights(platform as string, accessToken as string, accountId as string);
      
      res.json({
        success: true,
        data: insights
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  // Post content to social media
  postContent: async (req: Request, res: Response) => {
    try {
      const { platform, accessToken, content } = req.body;
      
      if (!platform || !accessToken || !content) {
        return res.status(400).json({
          success: false,
          error: 'Platform, access token, and content are required'
        });
      }

      const apiService = SocialMediaAPIService.getInstance();
      const result = await apiService.postContent(platform, accessToken, content);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  // Verify connection status
  verifyConnection: async (req: Request, res: Response) => {
    try {
      const { platform, accessToken } = req.body;
      
      if (!platform || !accessToken) {
        return res.status(400).json({
          success: false,
          error: 'Platform and access token are required'
        });
      }

      const apiService = SocialMediaAPIService.getInstance();
      const result = await apiService.connectSocialAccount(platform, accessToken);
      
      res.json({
        success: true,
        connected: result.success,
        data: result.data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
};