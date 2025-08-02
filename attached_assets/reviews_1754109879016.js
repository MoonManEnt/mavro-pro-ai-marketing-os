
// /api/reviews.js
import express from 'express';
const router = express.Router();

// Dummy in-memory DB
let reviews = [
  {
    id: '1',
    reviewerName: 'Jane Doe',
    platform: 'Google',
    reviewText: 'Excellent service!',
    linkedPost: 'Summer Sale Campaign',
    viviResponse: 'Thank you so much, Jane!',
    status: 'pending'
  }
];

// Get all reviews
router.get('/', (req, res) => {
  res.json(reviews);
});

// Post a ViVi response to a review
router.post('/respond/:id', (req, res) => {
  const { id } = req.params;
  const review = reviews.find(r => r.id === id);
  if (!review) return res.status(404).json({ error: 'Review not found' });

  review.status = 'posted';
  return res.json({ message: `Response sent for review ${id}`, review });
});

export default router;
