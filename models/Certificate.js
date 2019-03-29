const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Certificate schema
var certificateSchema = new Schema({
  name: String,
  description: String,
  category: String,
  available: Boolean,
  evaluationTest: {
    evaluationType: {
      type: String,
      enum: ["MCQ", "Project", "Other"]
    },
    evaluationContent: String,
    totalScore: Number,
    passingScore: Number,
    candidateScore: Number,
    passed: Boolean
  }
});
certificateSchema.index({
  '$**': 'text'
});
module.exports = Certificate = mongoose.model("certificates", certificateSchema);