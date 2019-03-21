const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Lifecycle schema
var lifeCycleSchema = new Schema({
  Description: [String],
  status: {
    type: String,
    enum: ["Proceeding", "Finished"],
    default: "Proceeding"
  },
  Percentage: [Number]
});
module.exports = Lifecycle = mongoose.model("lifecycles", lifeCycleSchema);