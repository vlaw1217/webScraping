const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const cheerio = require("cheerio");
const axios = require("axios");

//Set up express app//
const app = express();

//Connect to mongodb//
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

app.use(bodyParser.json());

// Initialize routes//
app.use("/api", require("./routes/api"));

//Error handling middleware//
app.use(function (err, req, res, next) {
    //console.log(err);
    res.status(422).send({ error: err.message });
});

//Listen for request//
app.listen(process.env.port || 4000, function () {
    console.log("now listening for requests");
});