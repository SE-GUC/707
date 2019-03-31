const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
//Conversation schema
var conversationSchema = new Schema({
  sentEmails: [{
    content: String,
    emailType: {
      type: String,
      enum: ["Project Orientation Invitation", "Inquiry", "Issue", "Other"]
    }
  }],
  receivedEmails: [{
    content: String,
    emailType: {
      type: String,
      enum: ["Project Orientation Invitation", "Inquiry", "Issue", "Other"]
    }
  }],
  receiverEmail: mongoose.SchemaTypes.Email,
});
module.exports = Conversation = mongoose.model("conversations", conversationSchema);