const express = require("express");
const router = express.Router();
const Usercomment = require("../models/userComment");
const cheerio = require("cheerio");
const axios = require("axios");

//Get a list of news//
router.get("/news", function(req, res, next) {
  axios.get("https://www.sciencealert.com/space").then(function(res) {
    //console.log(res.data)
    const $ = cheerio.load(res.data);
    //console.log($)
    $(".titletext").each(function(index, element) {
        const result = [];
      const title = $(element)
        .children()
        .text();
      //console.log(title);

      const link = $(element)
        .children("a")
        .attr("href");
      //console.log(link)

      result[index] = { title, link };
      console.log(result);
    });
  });

  res.send({ type: "GET" });
});

//Add a new user to the db//
router.post("/news", function(req, res, next) {
  Usercomment.create(req.body)
    .then(function(userComment) {
      res.send(userComment);
    })
    .catch(next);
});

//Update user in the db//
router.put("/news/:id", function(req, res, next) {
  Usercomment.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
    function() {
      Usercomment.findOne({ _id: req.params.id }).then(function(userComment) {
        res.send(userComment);
      });
    }
  );
});

//Delete a user from the db//
router.delete("/news/:id", function(req, res, next) {
  Usercomment.findByIdAndRemove({ _id: req.params.id }).then(function(
    userComment
  ) {
    res.send(userComment);
  });
});

module.exports = router;
