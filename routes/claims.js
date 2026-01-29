const express = require('express');
const Claim = require('../models/Claim');
const Deal = require('../models/Deal');
const { protect, requireVerification } = require('../middleware/auth');

const router = express.Router();

// Claim a deal (protected; verification for locked)
router.post('/', protect, async (req, res) => {
  const { dealId } = req.body;
  try {
    const deal = await Deal.findById(dealId);
    if (!deal) return res.status(404).json({ message: 'Deal not found' });
    if (deal.isLocked && !req.user.isVerified) {
      return res.status(403).json({ message: 'Verification required' });
    }
    const claim = await Claim.create({ user: req.user._id, deal: dealId });
    res.status(201).json(claim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's claims (protected)
router.get('/', protect, async (req, res) => {
  try {
    const claims = await Claim.find({ user: req.user._id }).populate('deal');
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
