var express = require("express");
var router = express.Router();
const Restaurant = require("../models/Restaurant");

/* router.get("/:id", (req, res) => {
  console.log(req.data);
}); */
router.get("/", (req, res) => {
  Restaurant.find().then((result) => {
    res.json(result);
  });
});

router.get("/:id", (req, res) => {
  Restaurant.findById(req.params.id).then((result) => {
    res.json(result);
  });
});

module.exports = router;
