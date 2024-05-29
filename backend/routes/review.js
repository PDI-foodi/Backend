var express = require("express");
var router = express.Router();

const Review = require("../models/Review");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");

router.post("/", async (req, res, next) => {
  try {
    const { userId, restaurantId, content, rate } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const review = await Review.create({ userId, restaurantId, content, rate });
    const allReview = await Review.find({ restaurantId: restaurantId });
    res.status(201).json(review);
    console.log(review);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
    next(err);
  }
});

router.delete("/:commentId", async (req, res) => {
  try {
    console.log(req.params.commentId);
    const review = await Review.findById(req.params.commentId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    await review.deleteOne();

    res.status(200).json("successful");
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
