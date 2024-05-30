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

    const allReview = await Review.find({ restaurantId, restaurantId });
    const averageRate =
      allReview.reduce((sum, review) => sum + review.rate, 0) /
      allReview.length;
    // 평균 계산
    const averageRateRounded = parseFloat(averageRate.toFixed(1));
    //전체 평균 업데이트
    await Restaurant.findByIdAndUpdate(restaurantId, {
      rate: averageRateRounded,
    });

    res.status(201).json(review);
    console.log(review);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
    next(err);
  }
});

//수정
router.put("/:commentId", async (req, res) => {
  const { userId, restaurantId, content, rate } = req.body;

  try {
    // 댓글을 찾음
    const review = await Review.findById(req.params.commentId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // 요청한 userId와 댓글 작성자의 userId가 일치하는지 확인
    if (review.userId.toString() !== userId) {
      return res.status(403).json({ message: "수정할 권한이 없습니다" });
    }

    // 댓글 업데이트
    await Review.findByIdAndUpdate(req.params.commentId, {
      userId,
      restaurantId,
      content,
      rate,
    });

    // 해당 레스토랑의 모든 리뷰를 가져옴
    const allReviews = await Review.find({ restaurantId });
    const averageRate =
      allReviews.reduce((sum, review) => sum + review.rate, 0) /
      allReviews.length;
    // 평균 계산
    const averageRateRounded = parseFloat(averageRate.toFixed(1));
    // 전체 평균 업데이트
    await Restaurant.findByIdAndUpdate(restaurantId, {
      rate: averageRateRounded,
    });

    res
      .status(200)
      .json(`update successful, 전체 평균 : ${averageRateRounded}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

//삭제
router.delete("/:commentId", async (req, res) => {
  try {
    const review = await Review.findById(req.params.commentId);
    if (!review) {
      return res.status(404).json({ message: "삭제 권한이 업습니다" });
    }

    const userId = req.body.userId;
    if (review.userId.toString() !== userId) {
      return res.status(403).json({ message: "삭제 권한이 업습니다" });
    }

    const restaurantId = review.restaurantId;
    await review.deleteOne();

    const allReview = await Review.find({ restaurantId });
    const averageRate =
      allReview.reduce((sum, review) => sum + review.rate, 0) /
      allReview.length;

    const averageRateRounded = parseFloat(averageRate.toFixed(1));
    await Restaurant.findByIdAndUpdate(restaurantId, {
      rate: averageRateRounded,
    });

    res.status(200).json("delete successful");
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
