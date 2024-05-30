var express = require("express");
var router = express.Router();
const Restaurant = require("../models/Restaurant");
const LikeSchema = require("../models/Like");
const Review = require("../models/Review");

/* router.get("/:id", (req, res) => {
  console.log(req.data);
}); */

router.get("/", (req, res) => {
  Restaurant.find().then((result) => {
    res.json(result);
  });
});

router.get("/like", (req, res) => {
  LikeSchema.find().then((result) => {
    res.json(result);
  });
});

router.get("/:id", (req, res) => {
  Restaurant.findById(req.params.id)
    .populate({
      path: "comments",
      populate: {
        select: "_id id nickname ",
        path: "user",
      },
    })
    // .Review.populate("nickname")
    .then((result) => {
      res.json(result);
    });
});

router.post("/:id", (req, res) => {
  const { userId } = req.body;
  LikeSchema.create({
    userId: userId,
    restaurantId: req.params.id,
  }).then((result) => {
    res.status(200).json(result);
  });
});

module.exports = router;
