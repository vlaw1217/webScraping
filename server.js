const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//const router = express.Router();
//const Usercomment = require("../models/userComment");
const cheerio = require("cheerio");
const axios = require("axios");

//Require all models//
const db = require("./models");

//Set up express app//
const app = express();

//Connect to mongodb//
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Make public a static folder
app.use(express.static("public"));

// Parse request body as JSON
app.use(bodyParser.json());

// Initialize routes//
//app.use("/api", require("./routes/api"));

//Error handling middleware//
app.use(function(err, req, res, next) {
  //console.log(err);
  res.status(422).send({ error: err.message });
});

//Get a list of news//
app.get("/scrape", function (req, res, next) {
 
  axios.get("https://www.sciencealert.com/space").then(function(res) {
    //console.log(res.data)
    let $ = cheerio.load(res.data);
    $(".titletext").each(function (index, element) {
      let result = {};
        result.title = $(this)
      .children("a")
      .text();
      //console.log(result.title);
      result.link = $(this)
      .children("a")
      .attr("href")  
      
        //result[index] = { title, link };
      //res.send(result)
     
    //console.log(result);
  
        db.Stories.update(result) 
          .then(function (dbStories) {
            //console.log("here 5")
            console.log(dbStories);
          })
          .catch(function(err) {
            console.log(err);
          });
      });
   });

    //res.send("Scrape Complete")
  });
//});

app.get("/news", function(req, res) {
  db.Stories.find({})
    .then(function(dbStories) {
      res.send(dbStories);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//Add a new user to the db//
app.post("/news", function(req, res, next) {
  db.UserComment.create(req.body)
    .then(function(UserComment) {
      res.send(UserComment);
    })
    .catch(next);
});

//Update user in the db//
app.put("/news/:id", function(req, res, next) {
  db.UserComment.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
    function() {
      UserComment.findOne({ _id: req.params.id }).then(function(UserComment) {
        res.send(UserComment);
      });
    }
  );
});

//Delete a user from the db//
app.delete("/news/:id", function(req, res, next) {
  db.UserComment.findByIdAndRemove({ _id: req.params.id }).then(function(
    UserComment
  ) {
    res.send(UserComment);
  });
});

//module.exports = router;

//Listen for request//
app.listen(process.env.port || 4000, function() {
  console.log("now listening for requests");
});
