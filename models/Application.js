const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Application schema
var applicationSchema = new Schema({
  candidateID: {
    type: String
  },
  projectID: {
    type: String
  },
  motivationLetter: {
    type: String
  }
});
module.exports = Application = mongoose.model(
  "applications",
  applicationSchema
);
