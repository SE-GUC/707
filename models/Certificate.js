const mongoose = require('mongoose')
const Schema = mongoose.Schema
//evaluation = require(/../models/evaluation)
//var evaluationSchema = require('mongoose').model('evaluation').Schema
//Profile = require(/../models/Profile)
//var profileSchema = require('mongoose').model('Profile').Schema

//Certificate schema
var certificateSchema = new Schema({
    description:{
        type: String
    },
    evaluationID:{
       type: String,
       default:null
        // type: evaluationSchema,
       // ref: 'Evaluation'       
    },
    applicants:{
        type: [String]
        // type:[profileSchema],
        // ref:'Profile'
    }
});

module.exports = Certificate = mongoose.model('certificates', certificateSchema)