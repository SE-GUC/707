const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = require("../models/Task").schema;
//Project schema
var projectSchema = new Schema({
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
  contractSigned: Boolean,
  requiredSkills: [String],
  status: {
    type: String,
    enum: [
      "Negotiation",
      "Approved",
      "RequireConsultancy",
      "RequireCandidate",
      "processing",
      "finished"
    ],
    default: "Negotiation"
  },
  projectcycle: [
    {
      description: String,
      status: {
        type: String,
        enum: ["Proceeding", "Finished"],
        default: "Proceeding"
      },
      percentage: Number
    }
  ],
  tasks: [taskSchema]
});
projectSchema.index({
  "$**": "text"
});
module.exports = Project = mongoose.model("projects", projectSchema);
