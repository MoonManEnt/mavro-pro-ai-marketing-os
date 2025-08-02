// /api/reviews.js
import express from 'express';
const router = express.Router();

// Dummy in-memory DB
let reviews = [
  {
    id: '1',
    reviewerName: 'Jane Doe',
    customerInitials: 'JD',
    platform: 'google',
    reviewText: 'Excellent service! The keynote was inspiring and practical.',
    linkedPost: 'Leadership Summit 2024',
    viviResponse: 'Thank you so much, Jane! We appreciate your kind words and are thrilled the leadership insights resonated with you.',
    status: 'pending',
    rating: 5,
    date: '2024-08-01',
    sentiment: 'positive',
    category: 'Speaking Engagement',
    helpful: 12,
    verified: true,
    location: 'New York, NY',
    reviewType: 'service',
    responseStatus: 'pending'
  },
  {
    id: '2',
    reviewerName: 'Michael Chen',
    customerInitials: 'MC',
    platform: 'linkedin',
    reviewText: 'Working with Kemar has been game-changing for our company culture. His approach to leadership development is both practical and inspiring.',
    linkedPost: 'Corporate Culture Transformation',
    viviResponse: 'Michael, thank you for trusting me with your team\'s development! Seeing your company culture evolve has been incredibly rewarding.',
    status: 'posted',
    rating: 5,
    date: '2024-07-28',
    sentiment: 'positive',
    category: 'Consulting',
    helpful: 8,
    verified: true,
    reviewType: 'service',
    responseStatus: 'posted',
    response: 'Michael, thank you for trusting me with your team\'s development! Seeing your company culture evolve has been incredibly rewarding.',
    responseDate: '2024-07-28'
  },
  {
    id: '3',
    reviewerName: 'Sarah Williams',
    customerInitials: 'SW',
    platform: 'facebook',
    reviewText: 'Great session on entrepreneurial mindset. Would love to see more content on work-life balance for business owners.',
    linkedPost: 'Entrepreneurial Mindset Workshop',
    viviResponse: 'Sarah, I\'m so glad the entrepreneurial mindset session resonated with you! Work-life balance for business owners is such a crucial topic - I\'ll definitely be creating more content around this.',
    status: 'pending',
    rating: 4,
    date: '2024-07-25',
    sentiment: 'positive',
    category: 'Workshop',
    helpful: 6,
    verified: true,
    reviewType: 'experience',
    responseStatus: 'pending'
  },
  {
    id: '4',
    reviewerName: 'Alex Rodriguez',
    customerInitials: 'AR',
    platform: 'instagram',
    reviewText: 'The leadership insights shared in the recent post were exactly what I needed. Thank you!',
    linkedPost: 'Daily Leadership Tips #47',
    viviResponse: 'Alex, I\'m so happy the leadership tips hit the mark for you! That\'s exactly why I share these insights - to help leaders like you grow and succeed.',
    status: 'pending',
    rating: 5,
    date: '2024-07-30',
    sentiment: 'positive',
    category: 'Content',
    helpful: 3,
    verified: false,
    reviewType: 'recommendation',
    responseStatus: 'pending'
  }
];

// Get all reviews
router.get('/', (req, res) => {
  const { platform, sentiment, status } = req.query;
  
  let filteredReviews = reviews;
  
  if (platform && platform !== 'all') {
    filteredReviews = filteredReviews.filter(r => r.platform === platform);
  }
  
  if (sentiment && sentiment !== 'all') {
    filteredReviews = filteredReviews.filter(r => r.sentiment === sentiment);
  }
  
  if (status && status !== 'all') {
    filteredReviews = filteredReviews.filter(r => r.responseStatus === status);
  }

  // Calculate stats
  const stats = {
    total: reviews.length,
    positive: reviews.filter(r => r.sentiment === 'positive').length,
    negative: reviews.filter(r => r.sentiment === 'negative').length,
    neutral: reviews.filter(r => r.sentiment === 'neutral').length,
    averageRating: reviews.reduce((acc, r) => acc + r.rating, 0) / Math.max(reviews.length, 1),
    responseRate: (reviews.filter(r => r.response).length / Math.max(reviews.length, 1)) * 100,
    pendingResponses: reviews.filter(r => r.responseStatus === 'pending').length
  };

  res.json({
    success: true,
    data: {
      reviews: filteredReviews,
      stats,
      platforms: {
        google: reviews.filter(r => r.platform === 'google').length,
        facebook: reviews.filter(r => r.platform === 'facebook').length,
        instagram: reviews.filter(r => r.platform === 'instagram').length,
        linkedin: reviews.filter(r => r.platform === 'linkedin').length,
        tiktok: reviews.filter(r => r.platform === 'tiktok').length,
        youtube: reviews.filter(r => r.platform === 'youtube').length
      }
    }
  });
});

// Post a ViVi response to a review
router.post('/respond/:id', (req, res) => {
  const { id } = req.params;
  const { customResponse } = req.body;
  
  const review = reviews.find(r => r.id === id);
  if (!review) return res.status(404).json({ 
    success: false, 
    error: 'Review not found' 
  });

  // Use custom response if provided, otherwise use ViVi suggestion
  const responseText = customResponse || review.viviResponse;
  
  review.status = 'posted';
  review.responseStatus = 'posted';
  review.response = responseText;
  review.responseDate = new Date().toISOString().split('T')[0];

  // Simulate posting to actual platform (in real implementation, this would call platform APIs)
  console.log(`Posted response to ${review.platform} for review ${id}`);

  return res.json({ 
    success: true,
    message: `ViVi response sent successfully for review ${id}`, 
    data: review 
  });
});

// Generate ViVi response for a review
router.post('/generate-response/:id', (req, res) => {
  const { id } = req.params;
  const { tone = 'professional', personaStyle = 'friendly' } = req.body;
  
  const review = reviews.find(r => r.id === id);
  if (!review) return res.status(404).json({ 
    success: false, 
    error: 'Review not found' 
  });

  // Generate personalized response based on review content and requested tone
  const generatedResponse = generatePersonalizedResponse(review, tone, personaStyle);
  
  // Update the review with the new ViVi suggestion
  review.viviResponse = generatedResponse;

  return res.json({ 
    success: true,
    message: 'ViVi response generated successfully', 
    data: {
      reviewId: id,
      generatedResponse,
      tone,
      personaStyle
    }
  });
});

// Bulk operations
router.post('/bulk-respond', (req, res) => {
  const { reviewIds, useViViSuggestions = true } = req.body;
  
  if (!reviewIds || !Array.isArray(reviewIds)) {
    return res.status(400).json({
      success: false,
      error: 'reviewIds must be an array'
    });
  }

  const results = [];
  const failures = [];

  reviewIds.forEach(id => {
    const review = reviews.find(r => r.id === id);
    if (review && review.responseStatus === 'pending') {
      review.status = 'posted';
      review.responseStatus = 'posted';
      review.response = useViViSuggestions ? review.viviResponse : 'Thank you for your feedback!';
      review.responseDate = new Date().toISOString().split('T')[0];
      results.push(id);
    } else {
      failures.push(id);
    }
  });

  return res.json({
    success: true,
    message: `Bulk response operation completed`,
    data: {
      successful: results,
      failed: failures,
      successCount: results.length,
      failureCount: failures.length
    }
  });
});

// Helper function to generate personalized responses
function generatePersonalizedResponse(review, tone, personaStyle) {
  const templates = {
    professional: {
      positive: `Thank you for your excellent review, ${review.reviewerName}. We're delighted that our ${review.category.toLowerCase()} met your expectations and provided value.`,
      negative: `Thank you for bringing this to our attention, ${review.reviewerName}. We take all feedback seriously and are committed to addressing your concerns promptly.`,
      neutral: `Thank you for taking the time to share your feedback, ${review.reviewerName}. Your input helps us continue to improve our services.`
    },
    friendly: {
      positive: `${review.reviewerName}, thank you so much for your kind words! It means the world to us that you had such a positive experience.`,
      negative: `Hi ${review.reviewerName}, I really appreciate your honest feedback. Let's connect directly so we can make this right for you.`,
      neutral: `Thanks for sharing your thoughts, ${review.reviewerName}! Every piece of feedback helps us grow and improve.`
    },
    casual: {
      positive: `Wow, ${review.reviewerName}! Thanks for the amazing review - you totally made our day! 🙌`,
      negative: `Hey ${review.reviewerName}, thanks for letting us know about this. We definitely want to fix things - mind if we reach out?`,
      neutral: `Thanks for the feedback, ${review.reviewerName}! Always good to hear from our community.`
    }
  };

  const toneTemplates = templates[tone] || templates.professional;
  return toneTemplates[review.sentiment] || toneTemplates.neutral;
}

export default router;