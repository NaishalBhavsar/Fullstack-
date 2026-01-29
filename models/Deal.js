const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // e.g., 'cloud', 'marketing'
  partner: { type: String, required: true },
  discount: { type: String, required: true },
  isLocked: { type: Boolean, default: false }, // Locked deals require verification
  eligibility: { type: String, required: true }, // e.g., 'Verified users only'
  createdAt: { type: Date, default: Date.now }
});

// Index for efficient filtering
dealSchema.index({ category: 1, isLocked: 1 });

module.exports = mongoose.model('Deal', dealSchema);
