import { Router } from 'express';
import { z } from 'zod';
import { optionalAuth } from '../auth/middleware';

const router = Router();

// Content creation schema
const createContentSchema = z.object({
  type: z.string(),
  platform: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  caption: z.string().optional(),
  media: z.array(z.string()).optional(),
  hashtags: z.array(z.string()).optional(),
  scheduledFor: z.string().optional(),
  persona: z.string().optional()
});

// Get content library
router.get('/', optionalAuth, async (req, res) => {
  try {
    const persona = req.query.persona as string || 'kemar';
    
    // For authenticated users, return empty content library (beta users start fresh)
    if (req.user) {
      return res.json([]);
    }

    // For demo users, return sample content
    const content = getPersonaContent(persona);
    res.json(content);
  } catch (error) {
    console.error('Get content error:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// Create new content
router.post('/', optionalAuth, async (req, res) => {
  try {
    const contentData = createContentSchema.parse(req.body);
    
    const contentId = `content_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const content = {
      id: contentId,
      ...contentData,
      status: 'draft',
      createdAt: new Date().toISOString(),
      performance: {
        impressions: 0,
        engagement: 0,
        shares: 0,
        saves: 0,
        comments: 0,
        likes: 0
      }
    };

    // For authenticated users, store in database (implementation would go here)
    if (req.user) {
      console.log('Would save content to database for user:', req.user.id);
    }

    res.json({
      success: true,
      content
    });
  } catch (error) {
    console.error('Create content error:', error);
    res.status(500).json({ error: 'Failed to create content' });
  }
});

// Update content
router.put('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const updatedContent = {
      id,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      content: updatedContent
    });
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// Publish content
router.post('/:id/publish', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { platforms, scheduledFor } = req.body;
    
    // Simulate content publishing
    const publishResult = {
      id,
      status: scheduledFor ? 'scheduled' : 'published',
      publishedAt: scheduledFor || new Date().toISOString(),
      platforms: platforms || ['instagram'],
      performance: {
        impressions: Math.floor(Math.random() * 1000) + 100,
        engagement: Math.floor(Math.random() * 100) + 10,
        shares: Math.floor(Math.random() * 20) + 2,
        saves: Math.floor(Math.random() * 30) + 5,
        comments: Math.floor(Math.random() * 15) + 1,
        likes: Math.floor(Math.random() * 80) + 15
      }
    };
    
    res.json({
      success: true,
      result: publishResult
    });
  } catch (error) {
    console.error('Publish content error:', error);
    res.status(500).json({ error: 'Failed to publish content' });
  }
});

// Get content performance analytics
router.get('/:id/analytics', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { timeframe } = req.query;
    
    const analytics = generateContentAnalytics(id, timeframe as string);
    res.json(analytics);
  } catch (error) {
    console.error('Content analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch content analytics' });
  }
});

// Generate content with AI
router.post('/generate', optionalAuth, async (req, res) => {
  try {
    const { prompt, type, platform, persona, tone, length } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    // Use ViVi to generate content (same functionality as ViVi route)
    const generatedContent = generatePersonaContent(prompt, type, persona, platform, tone, length);
    
    res.json({
      success: true,
      content: generatedContent
    });
  } catch (error) {
    console.error('Generate content error:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

// Content suggestions
router.get('/suggestions', optionalAuth, async (req, res) => {
  try {
    const persona = req.query.persona as string || 'kemar';
    const platform = req.query.platform as string || 'instagram';
    
    const suggestions = getContentSuggestions(persona, platform);
    res.json(suggestions);
  } catch (error) {
    console.error('Content suggestions error:', error);
    res.status(500).json({ error: 'Failed to fetch content suggestions' });
  }
});

// Helper functions
function getPersonaContent(persona: string) {
  const contentLibrary = {
    kemar: [
      {
        id: 'content_leadership_1',
        type: 'post',
        platform: 'linkedin',
        title: 'Leadership in the Digital Age',
        description: 'How modern leaders adapt to remote work challenges',
        caption: 'The future of leadership isn\'t about managing people in an office. It\'s about inspiring teams across time zones, cultures, and digital platforms.',
        hashtags: ['#leadership', '#remotework', '#digitalleadership', '#teammanagement'],
        status: 'published',
        createdAt: '2024-01-15T09:00:00Z',
        performance: {
          impressions: 5420,
          engagement: 387,
          shares: 45,
          saves: 89,
          comments: 23,
          likes: 320
        }
      },
      {
        id: 'content_coaching_2',
        type: 'video',
        platform: 'instagram',
        title: 'Quick Executive Tips',
        description: '60-second leadership insights',
        caption: 'One minute that could transform your leadership approach. Save this for later! 📌',
        hashtags: ['#executivecoaching', '#leadership', '#businesstips', '#productivity'],
        status: 'published',
        createdAt: '2024-01-12T14:30:00Z',
        performance: {
          impressions: 3890,
          engagement: 456,
          shares: 67,
          saves: 123,
          comments: 34,
          likes: 432
        }
      }
    ],
    karen: [
      {
        id: 'content_luxury_1',
        type: 'carousel',
        platform: 'instagram',
        title: 'Luxury Property Showcase',
        description: 'Million-dollar views from our latest listing',
        caption: 'When you walk into a home and immediately feel at peace... that\'s when you know. ✨ This stunning property offers more than square footage - it offers a lifestyle.',
        hashtags: ['#luxuryrealestate', '#dreamhome', '#properties', '#luxuryliving'],
        status: 'published',
        createdAt: '2024-01-18T11:00:00Z',
        performance: {
          impressions: 6780,
          engagement: 892,
          shares: 45,
          saves: 234,
          comments: 67,
          likes: 546
        }
      },
      {
        id: 'content_market_2',
        type: 'post',
        platform: 'linkedin',
        title: 'Market Analysis Q1 2024',
        description: 'Luxury market trends and investment opportunities',
        caption: 'The luxury real estate market is showing resilience in unexpected ways. Here\'s what savvy investors need to know for Q1 2024.',
        hashtags: ['#realestate', '#luxurymarket', '#investment', '#marketanalysis'],
        status: 'published',
        createdAt: '2024-01-16T16:00:00Z',
        performance: {
          impressions: 4560,
          engagement: 312,
          shares: 28,
          saves: 156,
          comments: 19,
          likes: 265
        }
      }
    ],
    sarah: [
      {
        id: 'content_transformation_1',
        type: 'video',
        platform: 'instagram',
        title: 'Before & After: Botox Results',
        description: 'Real client transformation in 2 weeks',
        caption: 'The confidence transformation is just as beautiful as the physical results. ✨ See why our clients keep coming back.',
        hashtags: ['#botox', '#transformation', '#medspa', '#skincare', '#confidence'],
        status: 'published',
        createdAt: '2024-01-20T13:30:00Z',
        performance: {
          impressions: 8940,
          engagement: 1245,
          shares: 89,
          saves: 345,
          comments: 123,
          likes: 688
        }
      },
      {
        id: 'content_education_2',
        type: 'carousel',
        platform: 'instagram',
        title: 'Skincare Routine Guide',
        description: 'Professional tips for healthy skin',
        caption: 'Your skin deserves the best care. Here\'s the professional routine I recommend to all my clients for glowing, healthy skin.',
        hashtags: ['#skincare', '#beauty', '#healthyskin', '#skincareadvice'],
        status: 'published',
        createdAt: '2024-01-17T10:00:00Z',
        performance: {
          impressions: 5670,
          engagement: 456,
          shares: 67,
          saves: 189,
          comments: 45,
          likes: 355
        }
      }
    ]
  };

  return contentLibrary[persona as keyof typeof contentLibrary] || [];
}

function generatePersonaContent(prompt: string, type: string, persona: string, platform: string, tone: string = 'professional', length: string = 'medium') {
  const contentTemplates = {
    caption: {
      kemar: {
        instagram: `🎯 ${prompt}\n\nTransform your leadership approach with insights that drive real results. Ready to elevate your influence?\n\n#Leadership #ExecutiveCoaching #Success #Motivation #BusinessStrategy`,
        linkedin: `🎯 ${prompt}\n\nIn my years of executive coaching, I've seen leaders transform their organizations by applying this principle. The impact on team performance and business outcomes is remarkable.\n\nWhat leadership challenges are you facing?\n\n#Leadership #ExecutiveCoaching #BusinessStrategy`,
        facebook: `🎯 ${prompt}\n\nLeadership isn't just about making decisions – it's about inspiring others to achieve greatness.\n\n#Leadership #Success #Motivation`,
        twitter: `🎯 ${prompt}\n\nThe leadership secret most executives never discover... 🧵\n\n#Leadership #Success`
      },
      karen: {
        instagram: `🏡 ${prompt}\n\nDiscover luxury properties that redefine elegance and sophistication. Your dream home awaits.\n\n#LuxuryRealEstate #DreamHome #Properties #Investment`,
        linkedin: `🏡 ${prompt}\n\nThe luxury real estate market continues to evolve, offering unprecedented opportunities for discerning buyers.\n\n#LuxuryRealEstate #RealEstateInvestment #PropertyMarket`,
        facebook: `🏡 ${prompt}\n\nEvery luxury home tells a story of success and dreams realized.\n\n#LuxuryRealEstate #DreamHome`,
        twitter: `🏡 ${prompt}\n\nLuxury real estate insight: 💎\n\n#LuxuryRealEstate #Properties`
      },
      sarah: {
        instagram: `✨ ${prompt}\n\nReveal your natural radiance with treatments designed to enhance your unique beauty.\n\n#MedSpa #Beauty #Aesthetics #Skincare #Transformation`,
        linkedin: `✨ ${prompt}\n\nThe aesthetic industry continues advancing with innovative treatments that deliver natural, beautiful results.\n\n#MedSpa #Aesthetics #Beauty #Healthcare`,
        facebook: `✨ ${prompt}\n\nSelf-care isn't selfish – it's essential. Discover treatments that help you look and feel your best.\n\n#MedSpa #Beauty #SelfCare`,
        twitter: `✨ ${prompt}\n\nBeauty tip from our MedSpa: 💫\n\n#MedSpa #Beauty #Skincare`
      }
    }
  };

  const template = contentTemplates[type as keyof typeof contentTemplates];
  if (!template) return `Generated ${type} content: ${prompt}`;

  const personaTemplate = template[persona as keyof typeof template];
  if (!personaTemplate) return `Generated ${type} for ${persona}: ${prompt}`;

  const platformTemplate = personaTemplate[platform as keyof typeof personaTemplate];
  return platformTemplate || `Generated ${type} for ${persona} on ${platform}: ${prompt}`;
}

function getContentSuggestions(persona: string, platform: string) {
  const suggestions = {
    kemar: {
      captions: [
        "The one leadership principle that transformed my approach to team management",
        "Why most executives fail at remote leadership (and how to succeed)",
        "The 5-minute daily habit that makes leaders 10x more effective"
      ],
      hooks: [
        "Stop managing. Start leading.",
        "The leadership mistake 90% of executives make:",
        "What if I told you leadership isn't about being the smartest person in the room?"
      ],
      ctas: [
        "Ready to transform your leadership impact? DM me 'GROW' 📈",
        "Double tap if you're ready to level up your team! 💪",
        "Link in bio for the complete leadership strategy guide ⬆️"
      ]
    },
    karen: {
      captions: [
        "The luxury real estate secret that sells million-dollar homes faster",
        "Why timing the market perfectly matters less than you think",
        "The one question every luxury buyer should ask (but rarely do)"
      ],
      hooks: [
        "Luxury isn't about price. It's about experience.",
        "The real estate mistake that costs buyers millions:",
        "What separates a house from a home worth fighting for?"
      ],
      ctas: [
        "Ready to find your dream home? DM me 'LUXURY' 🏡",
        "Save this post if you're serious about luxury real estate! 📌",
        "Link in bio for exclusive property previews ⬆️"
      ]
    },
    sarah: {
      captions: [
        "The skincare treatment that turns back time (without looking 'done')",
        "Why confidence is the best beauty treatment we offer",
        "The one mistake that ages your skin faster than anything else"
      ],
      hooks: [
        "Beauty isn't about perfection. It's about confidence.",
        "The skincare myth that's aging you faster:",
        "What if I told you the fountain of youth isn't a fountain at all?"
      ],
      ctas: [
        "Ready for your transformation? Book a consultation! ✨",
        "Double tap if you're ready to invest in yourself! 💕",
        "Link in bio to schedule your free skin analysis ⬆️"
      ]
    }
  };

  return suggestions[persona as keyof typeof suggestions] || suggestions.kemar;
}

function generateContentAnalytics(id: string, timeframe: string = '30d') {
  const days = timeframe === '7d' ? 7 : timeframe === '90d' ? 90 : 30;
  
  return {
    contentId: id,
    timeframe,
    totalMetrics: {
      impressions: Math.floor(Math.random() * 10000) + 2000,
      engagement: Math.floor(Math.random() * 1000) + 200,
      shares: Math.floor(Math.random() * 100) + 20,
      saves: Math.floor(Math.random() * 200) + 50,
      comments: Math.floor(Math.random() * 50) + 10,
      likes: Math.floor(Math.random() * 800) + 150
    },
    performanceOverTime: Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - i - 1));
      
      return {
        date: date.toISOString().split('T')[0],
        impressions: Math.floor(Math.random() * 500) + 50,
        engagement: Math.floor(Math.random() * 50) + 10,
        saves: Math.floor(Math.random() * 10) + 2
      };
    }),
    audienceInsights: {
      topLocations: ['United States', 'Canada', 'United Kingdom'],
      topAgeGroups: ['25-34', '35-44', '45-54'],
      genderSplit: { male: 45, female: 55 },
      peakEngagementTimes: ['9-10 AM', '12-1 PM', '7-8 PM']
    }
  };
}

export default router;