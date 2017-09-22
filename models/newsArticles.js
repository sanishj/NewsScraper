var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var newsArticle = mongoose.model("Article", ArticleSchema);
module.exports = newsArticle;