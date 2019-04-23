const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Report schema
var reportSchema = new Schema({
  title: String,
  interests: [String],
  Content: String
});
reportSchema.index({
  "$**": "text"
});
module.exports = Report = mongoose.model("reports", reportSchema);
