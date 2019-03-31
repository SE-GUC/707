const mongoose = require("mongoose");
const mongoDbAtlas_URI = "mongodb+srv://PeterAbdalla:LirtenHub707@lirtenhub-707-cluster-dmyn2.mongodb.net/test?retryWrites=true";
mongoose.connect(mongoDbAtlas_URI, {
    useNewUrlParser: true
}).then(
    () => {
        console.log("Database connection established!");
    },
    err => {
        console.log("Error connecting Database instance due to: ", err);
    }
);