const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Announcement schema
var announcementSchema = new Schema({
  title: String,
  type: String,
  Content: String
});
announcementSchema.index({
  '$**': 'text'
});
module.exports = Announcement = mongoose.model("announcements", announcementSchema);