const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Admin = require("../../models/Admin");
const validator = require("../../validations/adminValidations");
//Create admin profile
router.post("/register", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    const newAdmin = await Admin.create(req.body);
    res.json({
      msg: "Your profile was created successfully",
      data: newAdmin
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
//View admins profiles
router.get("/", async (req, res) => {
  const admins = await Admin.find();
  res.json({ data: admins });
});
//View admin profile by id
router.get("/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin)
      return res.status(404).send({ error: "This profile does not exist" });
    res.json({ data: admin });
  } catch (err) {
    res.json({ msg: err.message });
  }
});
//Update admin profile by id
router.put("/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin)
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
    Admin.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
      err,
      updatedAdmin
    ) {
      if (!err)
        res.json({
          msg: "Your profile has been updated successfully",
          data: updatedAdmin
        });
      else res.json({ msg: err.message });
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
//Delete admin profile by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    res.json({
      msg: "Your account has been deleted successfully",
      data: deletedAdmin
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
module.exports = router;
