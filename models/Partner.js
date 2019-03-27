const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
const personalInformationSchema = require("../models/PersonalInformation").schema;
const conversationSchema = require("../models/Conversation").schema;
const projectSchema = require("../models/Project").schema;
//Partner schema
var partnerSchema = new Schema({
  name: String,
  email: mongoose.SchemaTypes.Email,
  password: String,
  personalInformation: personalInformationSchema,
  conversations: [conversationSchema],
  projects: [projectSchema]
});
module.exports = Partner = mongoose.model("partners", partnerSchema);