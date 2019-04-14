const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const evaluationSchema = require("../models/Evaluation").schema;
//Certificate schema
var certificateSchema = new Schema({
  name: String,
  description: String,
  category: String,
  skills: [String],
  available: {
    type: Boolean,
    default: false
  },
  evaluationTests: [evaluationSchema]
});
certificateSchema.index({
  "$**": "text"
});
module.exports = Certificate = mongoose.model(
  "certificates",
  certificateSchema
);
