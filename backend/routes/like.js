var express = require("express");
var router = express.Router();
const Like = require("../models/Like");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const { verifyToken } = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const token = req.cookies.authToken;
    const decoded = verifyToken(token);
    const userId = decoded.id;
    const likes = await Like.find({ userId });
    const restaurantIds = likes.map((like) => like.restaurantId);
    const restaurants = await Restaurant.find({ _id: { $in: restaurantIds } });

    res.json(restaurants);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    const { userId, restaurantId } = req.body;
    const result = await Like.findOneAndDelete({
      userId: userId,
      restaurantId: restaurantId,
    });

    if (result) {
      res.status(200).json({ success: true, message: "삭제되었습니다." });
    } else {
      res
        .status(404)
        .json({ success: false, message: "해당 항목을 찾을 수 없습니다." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "서버 오류입니다.", error });
  }
});

router.get("/findjjim", async (req, res) => {
  const { userId, restaurantId } = req.query;

  try {
    const like = await Like.findOne({
      userId: userId,
      restaurantId: restaurantId,
    });

    if (like) {
      res.status(200).json();
    } else {
      res.status(201).json();
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "서버 오류입니다.", error });
  }
});

module.exports = router;
