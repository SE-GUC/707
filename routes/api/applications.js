const express = require("express");
const router = express.Router();
const Application = require("../../models/Application");
const Project = require("../../models/Project");
const Candidate = require("../../models/Candidate");
const validator = require("../../validations/applicationValidations");
//Create an application
router.post("/", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const project = await Project.findById(req.body.projectID);
    const candidate = await Candidate.findById(req.body.candidateID);
    if (!project)
      return res.status(404).send({ error: "This project does not exist" });
    if (!candidate)
      return res.status(404).send({ error: "This candidate does not exist" });
    const newApplication = await Application.create(req.body);
    res.json({
      msg: "Your application was created successfully",
      data: newApplication
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
//View an application
router.get("/", async (req, res) => {
  const applications = await Application.find();
  res.json({ data: applications });
});
//Accept an application
router.put("/accept/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const application = await Application.findById(id);
    if (!application)
      return res.status(404).send({ error: "This application does not exist" });
    const projectID = application.projectID;
    const candidateID = application.candidateID;
    const project = await Project.findById(projectID);
    const candidate = await Candidate.findById(candidateID);
    if (!project)
      return res.status(404).send({ error: "This project does not exist" });
    if (!candidate)
      return res.status(404).send({ error: "This candidate does not exist" });
    if (project.assignedCandidate !== null)
      return res
        .status(404)
        .send({ error: "This project is already assigned" });
    project.assignedCandidate = candidateID;
    Project.findByIdAndUpdate(project.id, project, { new: true }, function(
      err,
      updatedProject
    ) {
      if (!err)
        res.json({
          msg: "Your project has been assigned successfully",
          data: updatedProject
        });
      else res.json({ msg: err.message });
    });
  } catch (err) {
    res.json({ msg: err.message });
  }
});
//View an application by its id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const application = await Application.findById(id);
    if (!application)
      return res.status(404).send({ error: "This application does not exist" });
    res.json({ data: application });
  } catch (err) {
    res.json({ msg: err.message });
  }
});
//Delete an application by its id
router.delete("/:id", async (req, res) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(
      req.params.id
    );
    res.json({
      msg: "Your application has been deleted successfully",
      data: deletedApplication
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
module.exports = router;
