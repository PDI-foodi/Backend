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

/* router.get("/:id", async (req, res) => {
  Review.findById(req.params.id).then((result) => {
    console.log(result);
  });
}); */

module.exports = router;
