const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Candidate = require("../../models/Candidate");
const validator = require("../../validations/candidateValidations");
//Create candidate profile
router.post("/register", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    const newCandidate = await Candidate.create(req.body);
    res.json({
      msg: "Your profile was created successfully",
      data: newCandidate
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
//View candidates profiles
router.get("/", async (req, res) => {
  const candidates = await Candidate.find();
  res.json({ data: candidates });
});
//View candidate profile by id
router.get("/:id", async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate)
      return res.status(404).send({ error: "This profile does not exist" });
    res.json({ data: candidate });
  } catch (err) {
    res.json({ msg: err.message });
  }
});
//Update candidate profile by id
router.put("/:id", async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate)
      return res.status(404).send({ error: "This profile does not exist" });
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    if (req.params.password != null) {
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);
    }
    Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      function(err, updatedCandidate) {
        if (!err)
          res.json({
            msg: "Your profile has been updated successfully",
            data: updatedCandidate
          });
        else res.json({ msg: err.message });
      }
    );
  } catch (error) {
    res.json({ msg: error.message });
  }
});
//Delete candidate profile by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedCandidate = await Candidate.findByIdAndDelete(req.params.id);
    res.json({
      msg: "Your account has been deleted successfully",
      data: deletedCandidate
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
module.exports = router;
