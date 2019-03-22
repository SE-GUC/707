const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
const personalInformationSchema = require("../models/PersonalInformation").schema;
const conversationSchema = require("../models/Conversation").schema;
const notificationSchema = require("../models/Notification").schema;
const projectSchema = require("../models/Project").schema;
//Partner schema
var partnerSchema = new Schema({
  email: { type: mongoose.SchemaTypes.Email, unique: true },
  password: String,
  personalInformation: personalInformationSchema,
  conversations: [conversationSchema],
  notifications: [notificationSchema],
  awaitingApprovalProjects: [projectSchema],
  approvedProjects: [projectSchema]
});
module.exports = Partner = mongoose.model("partners", partnerSchema);
