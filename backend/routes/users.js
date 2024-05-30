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
    if (err.name === "IdDuplicatedError") {
      return res.status(409).json({ message: err.message });
    } else if (err.name === "NicknameDuplicatedError") {
      return res.status(409).json({ message: err.message });
    }
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { id, password } = req.body;
    const user = await User.login(id, password);
    const tokenMaxAge = 60 * 60 * 24 * 3;
    const token = createToken(user, tokenMaxAge);

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: tokenMaxAge * 1000,
    });

    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    if (err.name === "IdNotFoundError") {
      return res.status(404).json({ message: err.message });
    } else if (err.name === "PasswordMismatchError") {
      return res.status(401).json({ message: err.message });
    }
  }
});

router.post("/find-pwd", async (req, res, next) => {
  try {
    const { id, nickname } = req.body;
    const user = await User.findPwd(id, nickname);
    res.status(200).json({ nickname: user.nickname });
  } catch (err) {
    if (err.name === "IdNotFoundError") {
      return res.status(404).json({ message: err.message });
    } else if (err.name === "NicknameMismatchError") {
      return res.status(400).json({ message: err.message });
    } else {
      return res.status(500).json({ message: err.message });
    }
  }
});

module.exports = router;
