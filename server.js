const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const app = express();
const db = require("./config/keys").mongoURI;
// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));
// Express body parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
// Passport middleware
app.use(cors());
app.use(passport.initialize());
app.use("/api/", require("./middleware/logger"));
require("./config/passport")(passport);
// Entry point
app.get("/", (req, res) => res.send(`<h1>Welcome to LirtenHub</h1>`));
// Use Routes
app.use("/api/admins", require("./routes/api/admins"));
app.use("/api/candidates", require("./routes/api/candidates"));
app.use("/api/consultancies", require("./routes/api/consultancies"));
app.use("/api/emails", require("./routes/api/emails"));
app.use("/api/login", require("./routes/api/login"));
app.use("/api/partners", require("./routes/api/partners"));
app.use("/api/profiles", require("./routes/api/profiles"));
app.use("/api/searches", require("./routes/api/searches"));
// Wrong path
app.use((req, res) =>
  res.status(404).send(`<h1>Can not find what you're looking for</h1>`)
);
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
