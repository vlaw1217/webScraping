const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 8080;

//const router = express.Router();
//const Usercomment = require("../models/userComment");
const cheerio = require("cheerio");
const axios = require("axios");

//Require all models//
const db = require("./models");

//Set up express app//
const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.get("/", function(req, res, next) {
  res.render("home");
});

//Connect to mongodb//
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://heroku_vt5p6t8n:pu59sgubba7edr743pl29sjd77@ds137498.mlab.com:37498/heroku_vt5p6t8n"
  //mongodb://localhost/mongoHeadlines";
 // process.env.MONGODB_URI ||"mongodb://heroku_vt5p6t8n:pu59sgubba7edr743pl29sjd77@ds137498.mlab.com:37498/heroku_vt5p6t8n";
 
  mongodb: mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
//adding 1 more comment
//console.log("debug")
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
  
  axios.get("https://www.sciencealert.com/space/").then(function(res) {
    //console.log(res.data)
    let $ = cheerio.load(res.data);
    $(".titletext").each(function (index, element) {
      let result  = {};
        result.title = $(this)
      .children("a")
      .text();
      //console.log(result.title);
      result.link = $(this)
      .children("a")
      .attr("href")  
      
      // results.push({
      //   title: title,
      //   link: link
      // });
     
    //console.log(result);
        //  db.Stories.create(result)
        // .then(function(dbStories) {
        //   // View the added result in the console
        //   console.log(dbStories);
        // })
        // .catch(function(err) {
        //   // If an error occurred, log it
        //   console.log(err);
        // });
   
  
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
 // });
});

app.get("/all", function(req, res) {
  db.Stories.find({})
    .then(function(dbStories) {
      res.send(dbStories);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//Add a new user to the db//
app.post("/submit", function (req, res, next) {
  let user = new User(req.body);
  user.name();
  user.topic();
  user.comment();

  UserComment.create(req.body)
    .then(function (dbUserComment) {
    res.send(dbUserComment)
  })
    .catch(function (err) {
    res.json(err)
  })
//     .then(function(UserComment) {
//       res.send(Saved);
//     })
//     .catch(next);
});
 
app.get("/submit", function (req, res) {
  db.UserComment.find({}, function (err, found) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(found)
    }
  });
});

//Update user in the db//
// app.put("/news/:id", function(req, res, next) {
//   db.UserComment.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
//     function() {
//       UserComment.findOne({ _id: req.params.id }).then(function(UserComment) {
//         res.send(UserComment);
//       });
//     }
//   );
// });

//Delete a user from the db//
app.delete("/news/:id", function(req, res, next) {
  db.UserComment.findByIdAndRemove({ _id: req.params.id }).then(function(
    UserComment
  ) {
    res.send(UserComment);
  });
});

//module.exports = router;
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
//Listen for request//
// app.listen(process.env.port || 4000, function() {
//   console.log("now listening for requests");
// });
