const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// ✅ Correct collection name binding
const FoodItem = mongoose.model('food_iteams', require('../models/FoodItem').schema);
const FoodCategory = require('../models/FoodCategory');

// 🔐 Hardcoded admin credentials
const adminEmail = 'shashank@gmail.com';
const adminPassword = 'Test1234';

// ✅ Admin Login
router.post('/adminlogin', (req, res) => {
  const { email, password } = req.body;

  if (email === adminEmail && password === adminPassword) {
    return res.json({ success: true, message: 'Admin logged in successfully' });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  }
});

// ✅ Add a new food item
router.post('/admin/additem', async (req, res) => {
  try {
    const { CategoryName, name, img, description, options } = req.body;

    if (!CategoryName || !name || !img || !description || !options) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Create category if not exists
    const categoryExists = await FoodCategory.findOne({ CategoryName });
    if (!categoryExists) {
      await FoodCategory.create({ CategoryName });
    }

    // Check for duplicate item name
    const existingItem = await FoodItem.findOne({ name });
    if (existingItem) {
      return res.status(409).json({ success: false, message: 'Item already exists' });
    }

    const newItem = new FoodItem({
      CategoryName,
      name,
      img,
      description,
      options
    });

    await newItem.save();

    return res.json({ success: true, message: 'Item added successfully', item: newItem });
  } catch (err) {
    console.error('❌ Error in /admin/additem:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ Edit food item by name
router.put('/admin/edititem/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const updatedData = req.body;

    const updatedItem = await FoodItem.findOneAndUpdate(
      { name },
      updatedData,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    return res.json({ success: true, message: 'Item updated successfully', updated: updatedItem });
  } catch (err) {
    console.error('❌ Error in /admin/edititem/:name:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ Get food item by name
router.get('/admin/getitem/:name', async (req, res) => {
  try {
    const item = await FoodItem.findOne({ name: req.params.name });

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    return res.json({ success: true, item });
  } catch (err) {
    console.error('❌ Error in /admin/getitem/:name:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ Delete food item by name
router.delete('/admin/delete-item/:name', async (req, res) => {
  try {
    const deletedItem = await FoodItem.findOneAndDelete({ name: req.params.name });

    if (!deletedItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    return res.json({ success: true, message: 'Item deleted successfully' });
  } catch (err) {
    console.error('❌ Error in /admin/delete-item/:name:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
