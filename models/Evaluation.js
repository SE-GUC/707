const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Evaluation schema
var evaluationSchema = new Schema({
    evaluationType: {
        type: String,
        enum: ["MCQ", "Complete", "TrueFalse", "Mixed", "Project", "Meeting"]
    },
    evaluationContent: String,
    totalScore: Number,
    passingScore: Number,
    score: Number,
    passed: Boolean
});
evaluationSchema.index({
    '$**': 'text'
});
module.exports = Evaluation = mongoose.model("evaluations", evaluationSchema);