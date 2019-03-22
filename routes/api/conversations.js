const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const schema = require("../../models/Conversation");
const mongoURL = "mongodb://localhost/SE";
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
router.use(bodyParser.urlencoded({ extended: false }));

router.post("/", (req, res) => {
  const conversations = [
    {
      SentMessages: [{ Content: "Hello" }, { Content: "How are you?" }],
      RecievedMessages: [{ Content: "Hi" }, { Content: "Fine, Thank you" }]
    },
    {
      SentMessages: [{ Content: "Hello2" }, { Content: "How are you?2" }],
      RecievedMessages: [{ Content: "Hi2" }, { Content: "Fine, Thank you2" }]
    }
  ];
  mongoose
    .connect(mongoURL, { useNewUrlParser: true })
    .then(() => {
      console.log("Mongo is now connected");
      schema
        .insertMany(conversations)
        .then(() => {
          console.log("multiple documents are inserted");
          return res.redirect("/conversations/");
        })
        .catch(error => {
          mongoose.disconnect();
          return res.send(error);
        });
    })
    .catch(error => {
      mongoose.disconnect();
      return res.send(error);
    });
});
module.exports = router;