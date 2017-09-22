// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
//exports
var userNote = require("./models/userNote.js");
var newsArticle = require("./models/newsArticle.js");


// Mongoose Promise
mongoose.Promise = Promise;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/week18day3mongoose");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function (error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function () {
  console.log("Mongoose connection successful.");
});


// Routes
// ======
app.get("/scrape", function (req, res) {
  request("https://www.nytimes.com/", function (error, response, html) {
    var $ = cheerio.load(html);

    $("article h2").each(function (i, element) {
      var result = {};
      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");
      var entry = new Article(result);
      entry.save(function (err, doc) {
        if (err) {
          console.log(err);
        } else {
          console.log(doc);
        }
      });

    });
  });
  res.redirect("/");
});



//PORT
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("App running on port:", port);
  console.log("CTRL+C to end or kill server");
});