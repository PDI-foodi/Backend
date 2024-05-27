var express = require("express");
var router = express.Router();
const Restaurant = require("../models/Restaurant");

router.get("/", (req, res) => {
  Restaurant.find()
    .select("_id imglink name rate category")
    .sort({ rate: -1 })
    .limit(10)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
