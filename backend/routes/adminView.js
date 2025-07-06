// routes/adminView.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users (excluding passwords)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json({ success: true, users });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// DELETE user by ID
router.delete('/delete-user/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    console.error("❌ Error deleting user:", err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

module.exports = router;
