const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Certificate schema
var certificateSchema = new Schema({
    Description: String,
    Organization: String,
    Sponser: String
    });
module.exports = Certificate = mongoose.model("certificates", certificateSchema);