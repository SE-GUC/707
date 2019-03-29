const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
const conversationSchema = require("../models/Conversation").schema;
const projectSchema = require("../models/Project").schema;
const certificateSchema = require("../models/Certificate").schema;
//Candidate schema
var candidateSchema = new Schema({
  name: String,
  email: mongoose.SchemaTypes.Email,
  password: String,
  birthdate: Date,
  address: String,
  occupation: String,
  languages: [String],
  setOfSkills: [String],
  interests: [String],
  certificates: [String],
  masterClasses: [String],
  education: String,
  phoneNumber: Number,
  conversations: [conversationSchema],
  appliedProjects: [projectSchema],
  approvedProjects: [projectSchema],
  appliedCertificates: [certificateSchema],
  approvedCertificates: [certificateSchema]
});
candidateSchema.index({
  '$**': 'text'
});
module.exports = Candidate = mongoose.model("candidates", candidateSchema);