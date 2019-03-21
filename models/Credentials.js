const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Credentials schema
var credentialsSchema = new Schema({
    Username: String,
    Password: String
    });
module.exports = Credentials = mongoose.model("credentials", credentialsSchema);