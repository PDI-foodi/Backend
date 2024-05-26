const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, ref: "User" },
    restaurantId: { type: String, required: true, ref: "Restaurant" },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
