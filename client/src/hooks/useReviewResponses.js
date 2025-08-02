import { useState } from 'react';

export const useReviewResponses = () => {
  const [reviews, setReviews] = useState([
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
  ]);

  const sendResponse = async (reviewId) => {
    try {
      const response = await fetch(`/api/reviews/respond/${reviewId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        
        setReviews(prev => prev.map(review => 
          review.id === reviewId ? { 
            ...review, 
            status: 'posted',
            responseStatus: 'posted',
            response: review.viviResponse,
            responseDate: new Date().toISOString().split('T')[0]
          } : review
        ));

        // Simulate success notification
        console.log(`ViVi sent the response for review ${reviewId}!`);
        return { success: true, message: result.message };
      } else {
        throw new Error('Failed to send response');
      }
    } catch (error) {
      console.error('Error sending response:', error);
      return { success: false, error: 'Failed to send review response' };
    }
  };

  const generateViViResponse = (review) => {
    // Simulate ViVi generating a personalized response based on review content and persona
    const responses = {
      positive: [
        `Thank you so much, ${review.reviewerName}! Your feedback means the world to us.`,
        `${review.reviewerName}, I'm thrilled that our work together had such a positive impact!`,
        `Grateful for your kind words, ${review.reviewerName}! It's feedback like yours that drives us to keep improving.`
      ],
      negative: [
        `Thank you for your honest feedback, ${review.reviewerName}. We take all concerns seriously and are committed to making this right.`,
        `${review.reviewerName}, I appreciate you bringing this to our attention. Let's connect directly to discuss how we can improve.`
      ],
      neutral: [
        `Thank you for taking the time to share your thoughts, ${review.reviewerName}. Your feedback helps us continue to grow.`
      ]
    };

    const sentimentResponses = responses[review.sentiment] || responses.neutral;
    return sentimentResponses[Math.floor(Math.random() * sentimentResponses.length)];
  };

  const refreshReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
        return { success: true, message: 'Reviews refreshed successfully' };
      } else {
        throw new Error('Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Error refreshing reviews:', error);
      return { success: false, error: 'Failed to refresh reviews' };
    }
  };

  return { 
    reviews, 
    sendResponse, 
    generateViViResponse,
    refreshReviews,
    personaStyle: 'Friendly',
    setReviews 
  };
};