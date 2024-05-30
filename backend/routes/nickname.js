var express = require("express");
var router = express.Router();
const { verifyToken } = require("../utils/auth");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const token = req.cookies.authToken;
    const decoded = verifyToken(token);
    const userNickname = decoded.nickname;
    res.json(userNickname);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/id", async (req, res) => {
  try {
    const token = req.cookies.authToken;
    const decoded = verifyToken(token);
    const userNick = decoded.id;
    User.find({ id: userNick }).then((result) => {
      res.json(result[0]._id);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/idd", async (req, res) => {
  try {
    const token = req.cookies.authToken;
    const decoded = verifyToken(token);
    const userId = decoded.id;
    res.json(userId);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
