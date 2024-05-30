const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
    content: { type: String, required: true },
    rate: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

reviewSchema.set("toJSON", { virtuals: true });
reviewSchema.set("toObject", { virtuals: true });

reviewSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

module.exports = mongoose.model("Review", reviewSchema);
