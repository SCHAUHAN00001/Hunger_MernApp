const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');

const jwtSecret = "MyNameIsSultanaDakuIAmFromChampalDanger";

const fetchUser = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ error: 'Token missing' });

  try {
    const data = jwt.verify(token, jwtSecret);
    req.user = data.user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Place order
router.post('/placeorder', fetchUser, async (req, res) => {
  try {
    const { items, paymentMode, address } = req.body;
    await Order.create({
      user: req.user.id,
      items,
      paymentMode,
      address
    });

    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Order failed' });
  }
});

// Get orders
router.get('/myorders', fetchUser, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Unable to fetch orders' });
  }
});

module.exports = router;
