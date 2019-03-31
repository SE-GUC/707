const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
var LoggedOutUserSchema = new Schema({
    id: String

});
module.exports = LoggedOutUser = mongoose.model("loggedOutUsers", LoggedOutUserSchema);