const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
const personalInformationSchema = require("../models/PersonalInformation").schema;
const conversationSchema = require("../models/Conversation").schema;
const projectSchema = require("../models/Project").schema;
const certificateSchema = require("../models/Certificate").schema;
//Candidate schema
var candidateSchema = new Schema({
  email: {
    type: mongoose.SchemaTypes.Email,
    unique: true
  },
  password: String,
  personalInformation: personalInformationSchema,
  conversations: [conversationSchema],
  appliedProjects: [projectSchema],
  approvedProjects: [projectSchema],
  requestedCertificates: [certificateSchema]
});
module.exports = Candidate = mongoose.model("candidates", candidateSchema);
