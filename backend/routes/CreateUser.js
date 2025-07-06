const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "MyNameIsSultanaDakuIAmFromChampalDanger";

// Middleware (inline version)
const fetchUser = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ error: 'Auth token missing' });

  try {
    const data = jwt.verify(token, jwtSecret);
    req.user = data.user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Register
router.post('/createuser', [
  body('email').isEmail(),
  body('name').isLength({ min: 5 }),
  body('password').isLength({ min: 5 })
], async (req, res) => {
  const errs = validationResult(req);
  if (!errs.isEmpty()) return res.status(400).json({ success: false, errors: errs.array() });

  const { name, email, password, location } = req.body;

  try {
    if (await User.findOne({ email })) {
      return res.status(409).json({ success: false, error: 'User already exists' });
    }

    const hashedPass = await bcrypt.hash(password, await bcrypt.genSalt(10));
    await User.create({ name, email, password: hashedPass, location });

    res.status(201).json({ success: true, message: 'User created' });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Login
router.post('/loginuser', [
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
], async (req, res) => {
  const errs = validationResult(req);
  if (!errs.isEmpty()) return res.status(400).json({ success: false, errors: errs.array() });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = jwt.sign({ user: { id: user.id } }, jwtSecret);
    res.json({ success: true, authToken: token });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get User
router.get('/getuser', fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ success: true, user });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Update Address
router.put('/updateaddress', fetchUser, async (req, res) => {
  try {
    const { location } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { location }, { new: true });

    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    res.json({ success: true, location: user.location });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
