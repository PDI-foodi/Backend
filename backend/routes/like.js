var express = require("express");
var router = express.Router();
const Like = require("../models/Like");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const { verifyToken } = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decoded.id;
    const likes = await Like.find({ userId });
    const restaurantIds = likes.map((like) => like.restaurantId);
    const restaurants = await Restaurant.find({ _id: { $in: restaurantIds } });

    res.json(restaurants);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/user", (req, res) => {
  User.find().then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});


module.exports = router;
