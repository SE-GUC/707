const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//PersonalInformation schema
var personalInformationSchema = new Schema({
  birthDate: Date,
  address: String,
  occupation: String,
  languages: [String],
  setOfSkills: [String],
  interests: [String],
  certificates: [String],
  masterClasses: [String],
  education: String
});
module.exports = PersonalInformation = mongoose.model("personalInformations", personalInformationSchema);