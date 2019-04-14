const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Research schema
var resarchSchema = new Schema({
  title: String,
  interests: [String],
  Content: String
});
resarchSchema.index({
  "$**": "text"
});
module.exports = Research = mongoose.model("researches", resarchSchema);
