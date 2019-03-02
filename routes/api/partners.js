const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Partner = require("../../models/Partner");
const validator = require("../../validations/partnerValidations");
//Create partner profile
router.post("/register", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const salt = bcrypt.genSaltSync(10);
    req.body.age = getAge(req.body.birthdate);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    const newPartner = await Partner.create(req.body);
    res.json({
      msg: "Your profile was created successfully",
      data: newPartner
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
//View partners profiles
router.get("/", async (req, res) => {
  const partners = await Partner.find();
  res.json({ data: partners });
});
//View partner profile by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const partner = await Partner.findById(id);
    if (!partner)
      return res.status(404).send({ error: "This profile does not exist" });
    res.json({ data: partner });
  } catch (err) {
    res.json({ msg: err.message });
  }
});
//Update partner profile by id
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const partner = await Partner.findById(id);
    if (!partner)
      return res.status(404).send({ error: "This profile does not exist" });
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    Partner.findByIdAndUpdate(id, req.body, { new: true }, function(
      err,
      updatedPartner
    ) {
      if (!err)
        res.json({
          msg: "Your profile has been updated successfully",
          data: updatedPartner
        });
      else res.json({ msg: err.message });
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
//Delete partner profile by id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.params.id);
    const deletedPartner = await Partner.findByIdAndDelete(id);
    res.json({
      msg: "Your account has been deleted successfully",
      data: deletedPartner
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
module.exports = router;
