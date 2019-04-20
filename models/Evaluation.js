const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Evaluation schema
var evaluationSchema = new Schema({
  type: {
    type: String,
    enum: [
      "MCQ",
      "Complete",
      "TrueFalse",
      "Mixed",
      "Project",
      "Meeting",
      "Other"
    ],
    default: "Project"
  },
  content: String,
  totalScore: Number,
  passingScore: Number,
  answer: String,
  score: Number,
  passed: Boolean
});
evaluationSchema.index({
  "$**": "text"
});
module.exports = Evaluation = mongoose.model("evaluations", evaluationSchema);
