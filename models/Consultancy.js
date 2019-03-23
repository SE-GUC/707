const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
const personalInformationSchema = require("../models/PersonalInformation").schema;
const conversationSchema = require("../models/Conversation").schema;
const projectSchema = require("../models/Project").schema;
//Consultancy schema
var consultancySchema = new Schema({
  email: { type: mongoose.SchemaTypes.Email, unique: true },
  password: String,
  personalInformation: personalInformationSchema,
  conversations: [conversationSchema],
  projects: [projectSchema]
});
module.exports = Consultancy = mongoose.model("consultancies",consultancySchema);
