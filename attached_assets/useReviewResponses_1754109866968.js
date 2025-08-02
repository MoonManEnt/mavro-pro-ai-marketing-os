
import { useState } from 'react';

export const useReviewResponses = () => {
  const [reviews] = useState([
    {
      id: '1',
      reviewerName: 'Jane Doe',
      platform: 'Google',
      reviewText: 'Excellent service!',
      linkedPost: 'Summer Sale Campaign',
      viviResponse: 'Thank you so much, Jane! We appreciate your kind words.'
    }
  ]);

  const sendResponse = (id) => {
    alert(`ViVi sent the response for review ${id}!`);
  };

  return { reviews, sendResponse, personaStyle: 'Friendly' };
};
