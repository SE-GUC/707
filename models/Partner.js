const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const credentialsSchema = require("../models/Credentials").schema;
const personalInformationSchema = require("../models/PersonalInformation").schema;
const conversationSchema = require("../models/Conversation").schema;
const notificationSchema = require("../models/Notification").schema;
const projectSchema = require("../models/Project").schema;
//Partner schema
var partnerSchema = new Schema({
    Credentials: credentialsSchema,
    PersonalInformation: personalInformationSchema,
    Converstaions: [conversationSchema],
    Notifications: [notificationSchema],
    AwaitingApprovalProjects: [projectSchema],
    ApprovedProjects: [projectSchema]
    });
module.exports = Partner = mongoose.model("partners", partnerSchema);