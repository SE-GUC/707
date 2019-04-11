const mongoose = require("mongoose");
var LoggedOutUserSchema = new mongoose.Schema({});
module.exports = LoggedOutUser = mongoose.model("loggedOutUsers", LoggedOutUserSchema);