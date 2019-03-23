const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const evaluationSchema = require("../models/Evaluation").schema;
//Certificate schema
var certificateSchema = new Schema({
  description: String,
  category: String,
  name: String,
  evaluation: evaluationSchema
});
module.exports = Certificate = mongoose.model("certificates", certificateSchema);