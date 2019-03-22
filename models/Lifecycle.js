const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Lifecycle schema
var lifeCycleSchema = new Schema({
  description: [String],
  status: {
    type: String,
    enum: ["Proceeding", "Finished"],
    default: "Proceeding"
  },
  percentage: [Number]
});
module.exports = Lifecycle = mongoose.model("lifecycles", lifeCycleSchema);
