const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
const personalInformationSchema = require("../models/PersonalInformation").schema;
const conversationSchema = require("../models/Conversation").schema;
const notificationSchema = require("../models/Notification").schema;
const projectSchema = require("../models/Project").schema;
const certificateSchema = require("../models/Certificate").schema;
//Admin schema
var adminSchema = new Schema({
  email: { type: mongoose.SchemaTypes.Email, unique: true },
  password: String,
  personalInformation: personalInformationSchema,
  conversations: [conversationSchema],
  notifications: [notificationSchema],
  awaitingApprovalProjects: [projectSchema],
  approvedProjects: [projectSchema],
  reviewedCertificates: [certificateSchema]
});
module.exports = Admin = mongoose.model("admins", adminSchema);
