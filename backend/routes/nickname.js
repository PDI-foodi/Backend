var express = require("express");
var router = express.Router();
const { verifyToken } = require("../utils/auth");


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

module.exports = router;
