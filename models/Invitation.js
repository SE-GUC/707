const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Invitation schema
var invitationSchema = new Schema({
    location:{
        type: String
    },

    senderID:{
        type: String

    },
    receiverID:{
        type: String

    },
    
    sendAt:{
        type: Date,
        default: Date.now
    },
    receiveAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = Invitation = mongoose.model('invitations', invitationSchema)