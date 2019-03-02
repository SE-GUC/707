const express = require("express");
const router = express.Router();
const Invitation = require("../../models/Invitation");
const validator = require("../../validations/invitationValidations");
//Create an invitation
router.post("/", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const newInvitation = await Invitation.create(req.body);
    res.json({
      msg: "Invitation was created successfully",
      data: newInvitation
    });
  } catch (error) {
    res.json({ msg: err.message });
  }
});
//View an invitation
router.get("/", async (req, res) => {
  const invitations = await Invitation.find();
  res.json({ data: invitations });
});
//View an invitation by its id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const invitation = await Invitation.findById(id);
    if (!invitation)
      return res.status(404).send({ error: "This invitation does not exist" });
    res.json({ data: invitation });
  } catch (err) {
    res.json({ msg: err.message });
  }
});
//Update an invitation
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const invitation = await Invitation.findById(id);
    if (!invitation)
      return res.status(404).send({ error: "This invitation does not exist" });
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    Invitation.findByIdAndUpdate(id, req.body, { new: true }, function(
      err,
      updatedInvitation
    ) {
      if (!err)
        res.json({
          msg: "Your invitation has been updated successfully",
          data: updatedInvitation
        });
      else res.json({ msg: err.message });
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
//Delete an invitation
router.delete("/:id", async (req, res) => {
  try {
    const deletedInvitation = await Invitation.findByIdAndDelete(req.params.id);
    res.json({
      msg: "Your invitation has been deleted successfully",
      data: deletedInvitation
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
module.exports = router;
