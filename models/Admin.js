const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseemail= require('mongoose-type-email');


//Admin schema
var adminSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    birthdate:{
        type: Date
    },
   
    joinedSince:{
        type: Date,
        default: Date.now
    },
    address:{
        type: String
    },
    email:{
        type: String,
        unique:true
    },
    password:{
        type: String
    },
   
    occupation:{
        type: String
    },
    languages:{
        type: [String]
    },
    imageURL:{
        type:String
    }
});

module.exports = Admin = mongoose.model('admins', adminSchema)