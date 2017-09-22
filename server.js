// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
//exports
var userNotes = require("./models/userNotes.js");
var newsArticles = require("./models/newsArticles.js");


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

app.get("/articles", function (req, res) {
  Article.find({}, function (error, doc) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(doc);
    }
  });
});

app.get("/articles/:id", function (req, res) {
  Article.findOne({ "_id": req.params.id })
    .populate("note")
    .exec(function (error, doc) {
      if (error) {
        console.log(error);
      }
      else {
        res.json(doc);
      }
    });
});

app.post("/articles/:id", function (req, res) {
  var newNote = new Note(req.body);
  newNote.save(function (error, doc) {
    if (error) {
      console.log(error);
    }
    else {
      Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
        .exec(function (err, doc) {
          if (err) {
            console.log(err);
          }
          else {
            res.send(doc);
          }
        });
    }
  });
});

//PORT
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`App running on port:`, port);
  console.log(`CTRL+C to end or kill server`);
});