const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const FoodCategory = require('../models/FoodCategory'); // Collection: food_category
const FoodItem = require('../models/FoodItem');         // Collection: food_items

// Route: POST /api/admin/additem
router.post('/additem', async (req, res) => {
  try {
    const { CategoryName, name, img, description, options } = req.body;

    // ✅ Check if category exists, if not - create
    let category = await FoodCategory.findOne({ CategoryName });
    if (!category) {
      category = await FoodCategory.create({ CategoryName });
    }

    // ✅ Add item to food_items collection
    await FoodItem.create({
      CategoryName,
      name,
      img,
      description,
      options
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Error adding item:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
