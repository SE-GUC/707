const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Task schema
var taskSchema = new Schema({
  name: String,
  description: String,
  effortLevel: String,
  deliveryTime: Date,
  commitmentLevel: String,
  experienceLevel: String,
  requiredSkills: [String],
  monetaryCompensation: Number,
  assignedCandidate: {
    type: Schema.ObjectId,
    ref: "Candidate"
  }
});
module.exports = Task = mongoose.model("tasks", taskSchema);