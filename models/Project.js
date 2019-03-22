const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const lifeCycleSchema = require("../models/Lifecycle").schema;
const taskSchema = require("../models/Task").schema;
//Project schema
var projectSchema = new Schema({
    Tasks: [taskSchema],
    RequireConsultancy: Boolean,
    Lifecycle: lifeCycleSchema
  });
  module.exports = Project = mongoose.model("projects", projectSchema);
  