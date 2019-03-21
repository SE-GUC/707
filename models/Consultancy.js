const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const credentialsSchema = require("../models/Credentials").schema;
const personalInformationSchema = require("../models/PersonalInformation").schema;
const conversationSchema = require("../models/Conversation").schema;
const notificationSchema = require("../models/Notification").schema;
const projectSchema = require("../models/Project").schema;
//Consultancy schema
var consultancySchema = new Schema({
    Credentials: credentialsSchema,
    PersonalInformation: personalInformationSchema,
    Converstaions: [conversationSchema],
    Notifications: [notificationSchema],
    AssignedProjects: [projectSchema]
    });
module.exports = Consultancy = mongoose.model("consultancies", consultancySchema);