const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res, next) => {
  try {
    const { id, password, nickname } = req.body;
    const user = await User.signUp(id, password, nickname);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
    next(err);
  }
});

module.exports = router;
