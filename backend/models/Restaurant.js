const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    menu: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    imglink: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    location: { type: String, required: true },
    rate: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

restaurantSchema.set("toJSON", { virtuals: true });
restaurantSchema.set("toObject", { virtuals: true });

restaurantSchema.virtual("comments", {
  ref: "Review",
  localField: "_id",
  foreignField: "restaurantId",
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
