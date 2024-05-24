const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
