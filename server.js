// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
// Mongoose Promise
mongoose.Promise = Promise;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));



//PORT
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("App running on port:", port);
    console.log("CTRL+C to end or kill server");
}); 