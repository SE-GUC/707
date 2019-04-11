const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Task schema
var taskSchema = new Schema({
    name: String,
    description: String,
    type: String,
    deadline: Date,
    hours: Number,
    minCreditsHour: Number,
    maxCreditsHour: Number,
    chosenCreditHour: Number,
    creditsPenalty: Number,
    yearsOfExperience: Number,
    candidateRole: String,
    contractSigned: Boolean,
    requiredSkills: [String],
    status: {
        type: String,
        enum: ["RequireCandidate", "processing", "finished"],
        default: "RequireCandidate"
    },
    taskcycle: [{
        description: String,
        status: {
            type: String,
            enum: ["Proceeding", "Finished"],
            default: "Proceeding"
        },
        percentage: Number
    }]
});
taskSchema.index({
    '$**': 'text'
});
module.exports = Task = mongoose.model("tasks", taskSchema);