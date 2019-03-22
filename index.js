const express = require("express");
const app = express();
const conversations = require("./routes/api/conversations");
app.use("/conversations", conversations);
app.set("port", process.env.PORT || 5000);
app.get("/", (req, res) => {
  res.send('<a href="/conversations">conversations</a>');
});
app.listen(app.get("port"), function() {
  console.log("App is running, server is listening on port ", app.get("port"));
});
