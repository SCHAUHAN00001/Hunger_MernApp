const mongoose = require('mongoose');

const FoodCategorySchema = new mongoose.Schema({
  CategoryName: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('FoodCategory', FoodCategorySchema, 'food_category');
