const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const lifeCycleSchema = require("../models/Lifecycle").schema;
const taskSchema = require("../models/Task").schema;
//Project schema
var projectSchema = new Schema({
  type: String,
  name: String,
  description: String,
  approveAdmin:Boolean,
  requireConsultancy: Boolean,
  lifecycle: lifeCycleSchema,
  tasks: [taskSchema],
  consultancy: { type: Schema.ObjectId, ref: "Consultancy" },
  appliedCandidates: [{ type: Schema.ObjectId, ref: "Candidate" }]
});
module.exports = Project = mongoose.model("projects", projectSchema);
