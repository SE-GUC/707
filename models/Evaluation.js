const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Evaluation schema
var evaluationSchema = new Schema({
  evaluationType: String,
  evaluationContent: String,
  totalScore: Number,
  passingScore: Number
});
module.exports = Evaluation = mongoose.model("evaluations", evaluationSchema);
