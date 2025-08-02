
import React from 'react';
import { motion } from 'framer-motion';
import { useReviewResponses } from '../hooks/useReviewResponses';
import './ReviewsPage.css';

const ReviewsPage = () => {
  const { reviews, sendResponse, personaStyle } = useReviewResponses();

  return (
    <div className="reviews-page">
      <h2>Review Feed</h2>
      <div className="tabs">All | GMB | Facebook | TikTok | YouTube | Other</div>
      <div className="review-list">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            className="review-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <p><strong>{review.reviewerName}</strong> ({review.platform})</p>
            <p>{review.reviewText}</p>
            <p><i>Linked Post:</i> {review.linkedPost}</p>
            <p><b>ViVi Suggestion:</b> {review.viviResponse}</p>
            <button onClick={() => sendResponse(review.id)}>Send Response</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
