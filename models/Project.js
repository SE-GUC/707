const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Partner=require('./../models/Partner');
// var PartnerSchema=require('mongoose').model('partner').Schema;
// Consultancy=require('./../models/Consultancy');
// var ConsultancySchema=require('mongoose').model('consultancy').Schema;
// Candidate=require('./../models/Candidate');
// var CandidateSchema=require('mongoose').model('candidate').Schema;
// lifeCycle=require('./../models/LifeCycle');
// var lifeCycleSchema=require('mongoose').model('lifeCycle').Schema;

//Project schema
var projectSchema = new Schema({
  description: {
    type: String
  },
  effortLevel: {
    type: String,
    default: null
  },
  deliveryTime: {
    type: Date,
    default: null
  },
  commitmentLevel: {
    type: String,
    default: null
  },
  experienceLevel: {
    type: String,
    default: null
  },
  requiredSkills: {
    type: [String]
  },
  cost: {
    type: Number,
    default: null
  },
  partnerID: {
    type: String,
    default: null
    //type: PartnerSchema,
    //ref: 'Partner'
  },
  consultancy: {
    type: [String]
    //type: ConsultancySchema,
    //ref: 'Consultancy'
  },
  assignedCandidate: {
    type: String,
    default: null
    //type: CandidateSchema,
    //ref: 'Candidate'
  },
  lifeCycle: {
    type: String,
    default: null
    //type:lifeCycleSchema,
    //ref: 'lifeCycle'
  },
  status: {
    type: String,
    enum: ["PENDING", "ACCEPTED", "REJECTED"],
    default: "PENDING"
  }
});
module.exports = Project = mongoose.model("projects", projectSchema);
