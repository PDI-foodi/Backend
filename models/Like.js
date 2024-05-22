const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    userId: { type: Number, required: true },
    restaurantId: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Like", likeSchema);
