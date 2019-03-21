const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = require('../models/Message').schema;
//Conversation schema
var conversationSchema = new Schema({
    SentMessages: [messageSchema],
    RecievedMessages: [messageSchema],
    RecieverID: Schema.Types.ObjectId
    });
module.exports = Conversation = mongoose.model("conversations", conversationSchema);