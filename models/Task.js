const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Task schema
var taskSchema = new Schema({
    Description: String,
    EffortLevel: String,
    DeliveryTime: Date,
    CommitmentLevel: String,
    ExperienceLevel: String,
    RequiredSkills: [String],
    Cost: Number
  });
  module.exports = Task = mongoose.model("tasks", taskSchema);
  