const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
var emailSchema = new Schema({
    email: {
        type: mongoose.SchemaTypes.Email,
        unique: true
    }
});
module.exports = Email = mongoose.model("emails", emailSchema);