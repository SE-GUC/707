const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
const personalInformationSchema = require("../models/PersonalInformation").schema;
const conversationSchema = require("../models/Conversation").schema;
const projectSchema = require("../models/Project").schema;
const certificateSchema = require("../models/Certificate").schema;
//Admin schema
var adminSchema = new Schema({
  name: String,
  email: mongoose.SchemaTypes.Email,
  password: String,
  personalInformation: personalInformationSchema,
  conversations: [conversationSchema],
  projects: [projectSchema],
  certificates: [certificateSchema]
});
module.exports = Admin = mongoose.model("admins", adminSchema);