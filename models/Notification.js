const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Notification schema
var notificationSchema = new Schema({
  content: String,
  receiverID: Schema.Types.ObjectId
});
module.exports = Notification = mongoose.model("notifications",notificationSchema);
