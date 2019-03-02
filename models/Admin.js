const mongoose = require("mongoose");
require("mongoose-type-email");
const Schema = mongoose.Schema;
//Admin schema
var adminSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  birthdate: {
    type: Date
  },
  joinedSince: {
    type: Date,
    default: Date.now
  },
  address: {
    type: String
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    unique: true
  },
  password: {
    type: String
  },

  occupation: {
    type: String
  },
  languages: {
    type: [String]
  },
  imageURL: {
    type: String
  }
});
module.exports = Admin = mongoose.model("admins", adminSchema);
