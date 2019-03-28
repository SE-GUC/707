const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
const conversationSchema = require("../models/Conversation").schema;
const projectSchema = require("../models/Project").schema;
//Partner schema
var partnerSchema = new Schema({
  name: String,
  email: mongoose.SchemaTypes.Email,
  password: String,
  birthdate: Date,
  address: String,
  occupation: String,
  phoneNumber: Number,
  conversations: [conversationSchema],
  projects: [projectSchema]
});
module.exports = Partner = mongoose.model("partners", partnerSchema);