const express = require("express");
const router = express.Router();

//Get a list of user comments from the db//
router.get("/news", function(req, res) {
    res.send({ type: "GET" });
});

//Add a new user comment to the db//
router.post("/news", function(req, res) {
  res.send({ type: "POST" });
});

//Update user comment in the db//
router.put("/news/:id", function(req, res) {
  res.send({ type: "PUT" });
});

//Delete a user/comment from the db//
router.delete("/news/:id", function(req, res) {
  res.send({ type: "Delete" });
});


module.exports = router;