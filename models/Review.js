const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    userId: { type: Number, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
