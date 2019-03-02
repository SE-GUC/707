const express = require("express");
const router = express.Router();
const Project = require("../../models/Project");
const validator = require("../../validations/projectValidations");
//Create a project
router.post("/", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const newProject = await Project.create(req.body);
    res.json({
      msg: "Your project was created successfully",
      data: newProject
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
//View a project
router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json({ data: projects });
});
//View a project by its id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id);
    if (!project)
      return res.status(404).send({ error: "This project does not exist" });
    res.json({ data: project });
  } catch (err) {
    res.json({ msg: err.message });
  }
});
//Update project by its id
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id);
    if (!project)
      return res.status(404).send({ error: "This project does not exist" });
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    Project.findByIdAndUpdate(id, req.body, { new: true }, function(
      err,
      updatedProject
    ) {
      if (!err)
        res.json({
          msg: "Your project has been updated successfully",
          data: updatedProject
        });
      else res.json({ msg: err.message });
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
//Delete a project by its id
router.delete("/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    res.json({
      msg: "Your project has been deleted successfully",
      data: deletedProject
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
module.exports = router;
