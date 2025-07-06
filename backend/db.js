const mongoose = require('mongoose');

const mongoURL = 'mongodb+srv://schauhan00001:Test1234@cluster0.mfbpre4.mongodb.net/HungersMern?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("✅ Connected to MongoDB");

    // ✅ Correct spelling based on your DB
    const foodItemsCollection = mongoose.connection.db.collection("food_iteams");
    const foodCategoryCollection = mongoose.connection.db.collection("food_category");

    const foodItemsData = await foodItemsCollection.find({}).toArray();
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();

    global.food_iteams = foodItemsData;
    global.foodCategory = foodCategoryData;

    console.log(`📦 Food Items Loaded: ${foodItemsData.length}`);
    console.log(`📂 Food Categories Loaded: ${foodCategoryData.length}`);
  } catch (err) {
    console.error("🚨 MongoDB connection error:", err);
  }
};

module.exports = mongoDB;
