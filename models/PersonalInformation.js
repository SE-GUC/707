const mongoose = require("mongoose");
const email = require("mongoose-type-email");
const Schema = mongoose.Schema;
//PersonalInformation schema
var personalInformationSchema = new Schema({
    name: String,
    age: Number,
    birthDate: Date,
    address:String,
    email: mongoose.SchemaTypes.Email,
    occupation: String,
    languages: [String],
    setOfSkills: [String],
    interests: [String],
    certificates: [String],
    masterClasses: [String],
    education: String
    });
module.exports = PersonalInformation = mongoose.model("personalInformations", personalInformationSchema);