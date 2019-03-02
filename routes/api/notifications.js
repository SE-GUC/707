const express = require("express");
const router = express.Router();
const Notification = require("../../models/Notification");
const Admin = require("../../models/Admin");
const Candidate = require("../../models/Candidate");
//Create a notification
router.post("/", async (req, res) => {
  try {
    const adminId = await Admin.findById(req.body.senderID);
    if (!adminId)
      return res.status(404).send({ error: "This sender does not exist" });
    const candidateId = await Candidate.findById(req.body.receiverID);
    if (!candidateId)
      return res.status(404).send({ error: "This receiver does not exist" });
    const newNotification = await Notification.create(req.body);
    res.json({
      msg: "Your notification was created successfully",
      data: newNotification
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
//View all notifications
router.get("/", async (req, res) => {
  const notifications = await Notification.find();
  res.json({ data: notifications });
});
//View my notifications
router.get("/mynotifications/:id", async (req, res) => {
  const id = req.params.id;
  const candidate = await Candidate.findById(id);
  if (!candidate)
    return res.status(404).send({ error: "This partner does not exist" });
  const myNotifications = await Notification.find({ receiverID: id });
  res.json({ data: myNotifications });
});
//View a notification by its id
router.get("/:id", async (req, res) => {
  try {
    const notification = await Notfication.findById(req.params.id);
    if (!notification)
      return res
        .status(404)
        .send({ error: "This notification does not exist" });
    res.json({ data: notification });
  } catch (err) {
    res.json({ msg: err.message });
  }
});
//Delete a notification by its id
router.delete("/:id", async (req, res) => {
  try {
    const deletedNotification = await Notification.findByIdAndDelete(
      req.params.id
    );
    res.json({
      msg: "Your notification has been deleted successfully",
      data: deletedNotification
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
module.exports = router;
