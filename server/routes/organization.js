const express = require('express');
const Organization = require('../models/Organization');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// List all organizations (super admin only)
router.get('/', auth, requireRole('super_admin'), async (req, res) => {
  try {
    const orgs = await Organization.find().populate('subscription admins');
    res.json(orgs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 