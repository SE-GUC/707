const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
//inbox schema
var inboxSchema = new Schema({
  sentEmails: [{
    subject: String,
    content: String,
    emailType: {
      type: String,
      enum: ["Project Orientation Invitation", "Inquiry", "Issue", "Negotiation", "Other"],
      default: "Other"
    },
    receiverEmail: mongoose.SchemaTypes.Email
  }],
  receivedEmails: [{
    subject: String,
    content: String,
    emailType: {
      type: String,
      enum: ["Project Orientation Invitation", "Inquiry", "Issue", "Negotiation", "Other"],
      default: "Other"
    },
    senderEmail: mongoose.SchemaTypes.Email
  }]
});
module.exports = Inbox = mongoose.model("inboxes", inboxSchema);