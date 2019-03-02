const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Evaluation schema
var evaluationSchema = new Schema({
  evaluationType: {
    type: String,
    default: null
  },
  evaluationContent: {
    type: String,
    default: null
  },
  totalScore: {
    type: Number,
    default: null
  },
  passingScore: {
    type: Number,
    default: null
  }
});
module.exports = Evaluation = mongoose.model("evaluations", evaluationSchema);
