const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
const conversationSchema = require("../models/Conversation").schema;
//Admin schema
var adminSchema = new Schema({
  name: String,
  email: mongoose.SchemaTypes.Email,
  password: String,
  conversations: [conversationSchema]
});
module.exports = Admin = mongoose.model("admins", adminSchema);