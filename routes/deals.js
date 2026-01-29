const express = require('express');
const Deal = require('../models/Deal');

const router = express.Router();

// Get all deals (public)
router.get('/', async (req, res) => {
  const { category, isLocked, search } = req.query;
  let query = {};
  if (category) query.category = category;
  if (isLocked !== undefined) query.isLocked = isLocked === 'true';
  if (search) query.title = { $regex: search, $options: 'i' };
  try {
    const deals = await Deal.find(query);
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single deal
router.get('/:id', async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) return res.status(404).json({ message: 'Deal not found' });
    res.json(deal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
