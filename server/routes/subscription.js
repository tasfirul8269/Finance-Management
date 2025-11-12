const express = require('express');
const Subscription = require('../models/Subscription');

const router = express.Router();

// Get all subscriptions
router.get('/', async (req, res) => {
  try {
    const subs = await Subscription.find();
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 