const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Notification schema
var notificationSchema = new Schema({
  notificationType: {
    type: String
  },
  notificationContent: {
    type: String
  },
  senderID: {
    type: String
  },
  receiverID: {
    type: String
  },
  sentAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = Notification = mongoose.model(
  "notifications",
  notificationSchema
);
