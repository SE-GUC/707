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
//View partners profiles
router.get("/", async (req, res) => {
  const partners = await Partner.find();
  res.json({ data: partners });
});
//View partner profile by id
router.get("/:id", async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
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
    const partner = await Partner.findById(req.params.id);
    if (!partner)
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
    Partner.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
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
    const deletedPartner = await Partner.findByIdAndDelete(req.params.id);
    res.json({
      msg: "Your account has been deleted successfully",
      data: deletedPartner
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
//<<<<<<< Partner
// create project
//router.post("/CreateProject", async (req, res) => {
  //try {
    //const isValidated = validator.createValidation(req.body);
    //if (isValidated.error)
      //return res
        //.status(400)
      //  .send({ error: isValidated.error.details[0].message });
    //const newProject = [
      //{
        //type: req.body.type,
        //name: req.body.name,
        //description: req.body.description,
        //requireConsultancy: req.body. requireConsultancy,
        //lifecycle: { description: req.body.lifecycledes, status:req.body.status ,percentage:req.body.percentage},
       //tasks:[{name: req.body.taskname,
        //description: req.body.taskdesc,
        //effortLevel: req.body.effortLevel,
        //deliveryTime: req.body.deliveryTime,
        //commitmentLevel: req.body.commitmentLevel,
        //experienceLevel:req.body.experienceLevel ,
        ///requiredSkills: req.body.requiredSkills,
        //monetaryCompensation: req.body.monetaryCompensation}]

      //}]
    //res.json({
      //msg: "Your Project was created successfully",
      //data: newProject
    //});
  //} catch (error) {
    //res.json({ msg: error.message });
  //}
//});
//=======
//>>>>>>> Dev
module.exports = router;
