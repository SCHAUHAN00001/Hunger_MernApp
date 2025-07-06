const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
  CategoryName: { type: String, required: true },
  name: { type: String, required: true },
  img: { type: String, required: true },
  description: { type: String, required: true },
  options: { type: Array, required: true }
});


module.exports = mongoose.model('FoodItem', FoodItemSchema, 'food_iteams');
