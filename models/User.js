const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
const projectSchema = require("../models/Project").schema;
const taskSchema = require("../models/Task").schema;
const certificateSchema = require("../models/Certificate").schema;
const researchSchema = require("../models/Research").schema;
const reportSchema = require("../models/Report").schema;
const inboxSchema = require("../models/Inbox").schema;
//User schema
var userSchema = new Schema({
    email: {
        type: mongoose.SchemaTypes.Email,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    inbox: inboxSchema
}, {
    discriminatorKey: "usertype"
});
userSchema.index({
    '$**': 'text'
});
//Candidate schema
var candidateSchema = new Schema({
    name: String,
    address: String,
    birthdate: Date,
    education: String,
    occupation: String,
    yearsOfExperience: Number,
    contractSigned: Boolean,
    contactNumbers: [Number],
    interests: [String],
    languages: [String],
    courses: [String],
    skills: [String],
    pendingTasks: [taskSchema],
    approvedTasks: [taskSchema],
    recommendedTasks: [taskSchema],
    pendingCertificates: [certificateSchema],
    acquiredCertificates: [certificateSchema],
    recommendedCertificates: [certificateSchema],
    profilePhoto: {
        data: Buffer,
        contentType: String
    },
    credits: {
        type: Number,
        default: 0
    }
});
//Consultancy schema
var consultancySchema = new Schema({
    name: String,
    address: String,
    establishmentDate: Date,
    profession: String,
    yearsOfExperience: Number,
    contractSigned: Boolean,
    contactNumbers: [Number],
    interests: [String],
    skills: [String],
    researches: [researchSchema],
    reports: [reportSchema],
    pendingProjects: [projectSchema],
    approvedProjects: [projectSchema],
    recommendedProjects: [projectSchema],
    pendingCertificates: [certificateSchema],
    acquiredCertificates: [certificateSchema],
    recommendedCertificates: [certificateSchema],
    profilePhoto: {
        data: Buffer,
        contentType: String
    },
    credits: {
        type: Number,
        default: 0
    }
});
//Partner schema
var partnerSchema = new Schema({
    name: String,
    address: String,
    birthdate: Date,
    occupation: String,
    contractSigned: Boolean,
    contactNumbers: [Number],
    interests: [String],
    pendingProjects: [projectSchema],
    approvedProjects: [projectSchema],
    profilePhoto: {
        data: Buffer,
        contentType: String
    },
    credits: {
        type: Number,
        default: 0
    }
});
const User = mongoose.model("users", userSchema);
const Candidate = User.discriminator("candidate", candidateSchema);
const Consultancy = User.discriminator("consultancy", consultancySchema);
const Partner = User.discriminator("partner", partnerSchema);
module.exports = {
    User: User,
    Candidate: Candidate,
    Consultancy: Consultancy,
    Partner: Partner
};