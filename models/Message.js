const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Message schema
var messageSchema = new Schema({
  content: String
});
module.exports = Message = mongoose.model("messages", messageSchema);