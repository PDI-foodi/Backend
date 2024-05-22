const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true },
    id: { type: String, required: true },
    password: { type: String, required: true },
    nickname: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
