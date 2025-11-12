const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Organization = require('../models/Organization');
const Subscription = require('../models/Subscription');

const router = express.Router();

// Register (multi-step, simplified for now)
router.post('/register', async (req, res) => {
  try {
    const { orgName, orgLogo, orgAddress, orgPhone, adminName, adminEmail, adminPassword, subscriptionId } = req.body;
    if (!orgName || !adminName || !adminEmail || !adminPassword || !subscriptionId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    // Check if org exists
    let org = await Organization.findOne({ name: orgName });
    if (org) return res.status(400).json({ message: 'Organization already exists' });
    // Create org
    org = new Organization({ name: orgName, logo: orgLogo, address: orgAddress, phone: orgPhone, subscription: subscriptionId });
    await org.save();
    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    // Create admin user
    const user = new User({ name: adminName, email: adminEmail, password: hashedPassword, role: 'admin', organization: org._id });
    await user.save();
    org.admins.push(user._id);
    await org.save();
    // JWT
    const token = jwt.sign({ userId: user._id, role: user.role, orgId: org._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { name: user.name, email: user.email, role: user.role }, org: { name: org.name } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate('organization');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id, role: user.role, orgId: user.organization?._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { name: user.name, email: user.email, role: user.role }, org: { name: user.organization?.name } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 