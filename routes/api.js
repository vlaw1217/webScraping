const express = require("express");
const router = express.Router();
const Usercomment = require("../models/userComment");

//Get a list of user comments from the db//
router.get("/news", function(req, res, next) {
    res.send({ type: "GET" });
});

//Add a new user comment to the db//
router.post("/news", function (req, res, next) {
    Usercomment.create(req.body).then(function (userComment) {
        res.send(userComment);
    }).catch(next);
});

//Update user comment in the db//
router.put("/news/:id", function(req, res, next) {
  res.send({ type: "PUT" });
});

//Delete a user/comment from the db//
router.delete("/news/:id", function (req, res, next) {
    Usercomment.findByIdAndRemove({ _id: req.params.id }).then(function (userComment) {
        res.send(userComment);
    });
});


module.exports = router;