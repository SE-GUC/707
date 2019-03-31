const mongoose = require("mongoose");
const mongoDB_URI = "mongodb+srv://PeterAbdalla:LirtenHub707@lirtenhub-707-cluster-dmyn2.mongodb.net/test?retryWrites=true";
const options = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    poolSize: 10
};
mongoose.connect(mongoDB_URI, options).then(
    () => {
        console.log("Database connection established!");
    },
    err => {
        console.log("Error connecting Database instance due to: ", err);
    }
);