const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Project schema
var projectSchema = new Schema({
  type: String,
  name: String,
  description: String,
  approveAdmin: {
    type: Boolean,
    default: false
  },
  requireConsultancy: {
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
    monetaryCompensation: Number
  }]
});
module.exports = Project = mongoose.model("projects", projectSchema);