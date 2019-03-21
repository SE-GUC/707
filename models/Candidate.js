const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const credentialsSchema = require("../models/Credentials").schema;
const personalInformationSchema = require("../models/PersonalInformation").schema;
const conversationSchema = require("../models/Conversation").schema;
const notificationSchema = require("../models/Notification").schema;
const projectSchema = require("../models/Project").schema;
const certificateSchema = require("../models/Certificate").schema;
//Candidate schema
var candidateSchema = new Schema({
    Credentials: credentialsSchema,
    PersonalInformation: personalInformationSchema,
    Converstaions: [conversationSchema],
    Notifications: [notificationSchema],
    AssignedProjects: [projectSchema],
    RequestedCertificates: [certificateSchema]
    });
module.exports = Candidate = mongoose.model("candidates", candidateSchema);