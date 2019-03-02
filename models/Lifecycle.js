const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Lifecycle schema
var lifeCycleSchema = new Schema({
  projectID: {
    type: String
  },
  lifeCycleState: {
    type: String
  },
  lifeCyclePercentage: {
    type: Number,
    default: null
  },
  lifeCycleStateDescription: {
    type: String
  }
});
module.exports = Lifecycle = mongoose.model("lifecycles", lifeCycleSchema);
