const express = require("express");
const mongoose = require("mongoose");
// Require Router Handlers
const admins = require("./routes/api/admins");
const candidates = require("./routes/api/candidates");
const partners = require("./routes/api/partners");
const consultancies = require("./routes/api/consultancies");
const login = require("./routes/api/login");
const logout = require("./routes/api/logout");
const logger = require("./middleware/logger");
const passport = require('passport')
const cors = require('cors')
// express1
const app = express();
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to mongo
mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
// Init middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
// Entry point
app.get("/", (req, res) => res.send(`<h1>Welcome to LirtenHub</h1>`));
app.get("/test", (req, res) => res.send(`<h1>Deployed on Heroku</h1>`));
// Direct to Route Handlers

// Init middleware
app.use(cors())
app.use(passport.initialize())
app.use("/api/",logger)
//Entry point
app.use("/api/partners", partners);
app.use("/api/candidates", candidates);
app.use("/api/admins", admins);
app.use("/api/consultancies", consultancies);
app.use("/api/login", login);
app.use("/api/logout", logout);


// wrong path
app.use((req, res) =>
  res.status(404).send(`<h1>Can not find what you're looking for</h1>`)
);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server on ${port}`));