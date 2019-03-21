const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
const personalInformationSchema = require("../models/PersonalInformation").schema;
const conversationSchema = require("../models/Conversation").schema;
const notificationSchema = require("../models/Notification").schema;
const certificateSchema = require("../models/Certificate").schema;
//Candidate schema
 var candidateSchema = new Schema({
  email: { type: mongoose.SchemaTypes.Email, unique: true },
  password: String,
  personalInformation: personalInformationSchema,
  conversations: [conversationSchema],
  notifications: [notificationSchema],
  assignedProjects: [{type: Schema.Types.ObjectId, ref:'Project'}],
  appliedProjects: [{type: Schema.Types.ObjectId, ref:'Project'}],
  certificates: [certificateSchema]
});
module.exports = Candidate = mongoose.model("candidates", candidateSchema);
