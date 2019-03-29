const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
const conversationSchema = require("../models/Conversation").schema;
const projectSchema = require("../models/Project").schema;
//Consultancy schema
var consultancySchema = new Schema({
  name: String,
  email: mongoose.SchemaTypes.Email,
  password: String,
  address: String,
  occupation: String,
  phoneNumber: Number,
  conversations: [conversationSchema],
  projects: [projectSchema]
});
consultancySchema.index({
  '$**': 'text'
});
module.exports = Consultancy = mongoose.model("consultancies", consultancySchema);