const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
  try {
    if (!global.food_iteams || !global.foodCategory) {
      return res.status(500).json({
        success: false,
        message: "Food data or category not loaded yet"
      });
    }

    res.status(200).json({
      success: true,
      foodItems: global.food_iteams,
      foodCategory: global.foodCategory
    });

  } catch (error) {
    console.error("🚨 Error in /foodData:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;

