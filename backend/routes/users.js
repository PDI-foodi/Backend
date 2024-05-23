const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { createToken } = require("../utils/auth");

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

router.post("/login", async (req, res, next) => {
  try {
    const { id, password } = req.body;
    const user = await User.login(id, password);
    const tokenMaxAge = 60 * 60 * 24 * 3;
    const token = createToken(user, tokenMaxAge);

    user.token = token;

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: tokenMaxAge * 1000,
    });

    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
    next(err);
  }
});

module.exports = router;
