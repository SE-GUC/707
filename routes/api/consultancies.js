const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Consultancy = require("../../models/Consultancy");
const validator = require("../../validations/consultancyValidations");
//Create consultancy profile
router.post("/register", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({
          error: isValidated.error.details[0].message
        });
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    const newConsultancy = await Consultancy.create(req.body);
    res.json({
      msg: "Your profile was created successfully",
      data: newConsultancy
    });
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
//View consultancies profiles
router.get("/", async (req, res) => {
  const consultancies = await Consultancy.find();
  res.json({
    data: consultancies
  });
});
//View consultancy profile by id
router.get("/:id", async (req, res) => {
  try {
    const consultancy = await Consultancy.findById(req.params.id);
    if (!consultancy)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    res.json({
      data: consultancy
    });
  } catch (err) {
    res.json({
      msg: err.message
    });
  }
});
//Update consultancy profile by id
router.put("/:id", async (req, res) => {
  try {
    const consultancy = await Consultancy.findById(req.params.id);
    if (!consultancy)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({
          error: isValidated.error.details[0].message
        });
    if (req.params.password != null) {
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);
    }
    Consultancy.findByIdAndUpdate(
      req.params.id,
      req.body, {
        new: true
      },
      function (err, updatedConsultancy) {
        if (!err)
          res.json({
            msg: "Your profile has been updated successfully",
            data: updatedConsultancy
          });
        else res.json({
          msg: err.message
        });
      }
    );
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
//Delete consultancy profile by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedConsultancy = await Consultancy.findByIdAndDelete(
      req.params.id
    );
    res.json({
      msg: "Your account has been deleted successfully",
      data: deletedConsultancy
    });
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
module.exports = router;