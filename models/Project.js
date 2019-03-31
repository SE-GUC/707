const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Project schema
var projectSchema = new Schema({
  name: String,
  description: String,
  type: String,
  approveAdmin: {
    type: Boolean,
    default: false
  },
  requireConsultancy: {
    type: Boolean,
    default: false
  },
  assigned: {
    type: Boolean,
    default: false
  },
  lifecycle: {
    description: [String],
    status: {
      type: String,
      enum: ["Proceeding", "Finished"],
      default: "Proceeding"
    },
    percentage: [Number]
  },
  tasks: [{
    name: String,
    description: String,
    effortLevel: String,
    deliveryTime: Date,
    commitmentLevel: String,
    experienceLevel: String,
    requiredSkills: [String],
    monetaryCompensation: Number,
    candidateRole: String
  }]
});
projectSchema.index({
  '$**': 'text'
});
module.exports = Project = mongoose.model("projects", projectSchema);