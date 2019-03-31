const express = require("express");
const mongoose = require("mongoose");
// Require Router Handlers
const admins = require("./routes/api/admins");
const candidates = require("./routes/api/candidates");
const partners = require("./routes/api/partners");
const consultancies = require("./routes/api/consultancies");
// Require Workflow
const adminsConversations = require("./workflow/admin/conversations");
const candidatesConversations = require("./workflow/candidate/conversations");
const partnersConversations = require("./workflow/partner/conversations");
const consultanciesConversations = require("./workflow/consultancy/conversations");
// express1
const app = express();
// Connect to mongo
mongoose
  .connect("mongodb://localhost/SE", { useNewUrlParser: true })
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
app.use("/api/partners", partners);
app.use("/api/candidates", candidates);
app.use("/api/admins", admins);
app.use("/api/consultancies", consultancies);
//Direct to workflow
app.use("/workflow/admin/conversations", adminsConversations);
app.use("/workflow/candidate/conversations", candidatesConversations);
app.use("/workflow/partner/conversations", partnersConversations);
app.use("/workflow/consultancy/conversations", consultanciesConversations);
// wrong path
app.use((req, res) =>
  res.status(404).send(`<h1>Can not find what you're looking for</h1>`)
);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server on ${port}`));