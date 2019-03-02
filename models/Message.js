const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const User = require(./../models/users);
//var userSchema = require('mongoose').model('User').schema;

//Message schema
var messageSchema = new Schema({
  messageSubject:{
    type:String,
    default:"No Subject"
  },
  messageContent: {
    type: String,
    default:null
    //required: true
  },
  senderID: {
    type: String
    //type: [userSchema],
    //ref: 'User'
  },
  receiverID: {
    type: String
    //type: [userSchema],
    //ref: 'User'
  },
  sentAT: {
    type: Date,
    default: Date.now
  },
  receivedAT: {
    type: Date,
    default: Date.now
  }
});
module.exports = Message = mongoose.model("messages", messageSchema);
