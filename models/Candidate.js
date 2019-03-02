const mongoose = require("mongoose");
require("mongoose-type-email");
const Schema = mongoose.Schema;
//Project =require(/../models/Project)
//var ProjectSchema=require('mongoose').model('project').Schema;
//Certificate =require(/../models/Certificate)
//var CertificateSchema=require('mongoose').model('certificate').Schema;

//Candidate schema
var candidateSchema = new Schema({
  name: {
    type: String
  },
  age: {
    type: Number,
    default: null
  },
  joinedSince: {
    type: Date,
    default: Date.now
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    unique: true
  },
  password: {
    type: String
  },
  address: {
    type: String
  },
  occupation: {
    type: String
  },
  languages: {
    type: [String]
  },
  myProjects: {
    type: [String],
    default: null
    //type:[ProjectSchema],
    //ref:'Project'
  },
  skills: {
    type: [String]
  },
  interests: {
    type: [String]
  },
  certificates: {
    type: [String],
    default: null
    //type:[CerticateSchema],
    //ref:'Certificate'
  },
  masterClasses: {
    type: [String],
    default: null
  },
  CV: {
    type: String
  },
  education: {
    type: String
  },
  imageURL: {
    type: String
  },
  birthdate: {
    type: Date
  }
});
module.exports = Candidate = mongoose.model("candidates", candidateSchema);
