const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseemail= require('mongoose-type-email');


//const Project= require(./../models/projects);
//var projectSchema =require('mongoose').model('Project').schema;
//Partner profile schema
var partnerSchema = new Schema({
    name:{
        type: String
    },
    age:{
        
      type: Number,
       default: null
        
    },

    joinedSince:{
        type: Date,
        default: Date.now
        

    },
    email:{
       
       type: mongoose.SchemaTypes.Email,
       unique:true

    },
    password:{
        type: String
        
    },
    address:{
        type: String

    },
    occupation:{
        type: String
    },
    languages:{
        type: [String]
    },
    projectsSubmitted:{
        type:[String],
        //type: [projectSchema],
        //ref: 'Project'
        default:null
    },
    birthdate:{
        type:Date

    },
    imageURL:{
        type: String,
        default:null
    }

});

module.exports = Partner = mongoose.model('partners', partnerSchema)