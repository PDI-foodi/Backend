var express = require("express");
var router = express.Router();

const Review = require("../models/Review");
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { userId, restaurantId, content } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const review = await Review.create({ userId, content });
    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
