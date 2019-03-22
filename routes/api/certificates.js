const express = require("express");
const router = express.Router();
const Certificate = require("../../models/Certificate");
const validator = require("../../validations/certificateValidations");
//Create Certificate
router.post("/", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const newCertificate = await Certificate.create(req.body);
    res.json({
      msg: "Your Certificate was created successfully",
      data: newCertificate
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
//View certificates
router.get("/", async (req, res) => {
  const certificates = await Certificate.find();
  res.json({ data: certificates });
});
//View certificate by id
router.get("/:id", async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate)
      return res.status(404).send({ error: "This certificate does not exist" });
    res.json({ data: certificate });
  } catch (err) {
    res.json({ msg: err.message });
  }
});
//Update certificate by id
router.put("/:id", async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate)
      return res.status(404).send({ error: "This certificate does not exist" });
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      function(err, updatedCertificate) {
        if (!err)
          res.json({
            msg: "Your certificate has been updated successfully",
            data: updatedCertificate
          });
        else res.json({ msg: err.message });
      }
    );
  } catch (error) {
    res.json({ msg: error.message });
  }
});
//Delete certificate by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedCertificate = await Certificate.findByIdAndDelete(
      req.params.id
    );
    res.json({
      msg: "Your certificate has been deleted successfully",
      data: deletedCertificate
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
module.exports = router;
