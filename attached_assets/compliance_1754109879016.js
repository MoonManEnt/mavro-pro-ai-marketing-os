
// /api/compliance.js
import express from 'express';
const router = express.Router();

// Dummy in-memory DB
let complianceFlags = [
  {
    id: '101',
    issueType: 'HIPAA Violation',
    platform: 'Instagram',
    description: 'Photo posted without patient consent',
    severity: 'High',
    resolved: false
  }
];

// Get all compliance flags
router.get('/', (req, res) => {
  res.json(complianceFlags);
});

// Resolve a compliance flag
router.post('/resolve/:id', (req, res) => {
  const { id } = req.params;
  const flag = complianceFlags.find(f => f.id === id);
  if (!flag) return res.status(404).json({ error: 'Flag not found' });

  flag.resolved = true;
  return res.json({ message: `Flag ${id} resolved`, flag });
});

export default router;
