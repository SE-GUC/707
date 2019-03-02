const express = require("express");
const router = express.Router();
const Message = require("../../models/Message");
const Admin = require("../../models/Admin");
const Partner = require("../../models/Partner");
//Create a message
router.post("/:id", async (req, res) => {
  try {
    const adminId = await Admin.findById(req.params.id);
    if (!adminId) {
      const partnerId = await Partner.findById(req.params.id);
      if (!partnerId) {
        return res.status(404).send({ error: "This sender does not exist" });
      } else {
        const adminId = await Admin.findById(req.body.receiverID);
        if (!adminId)
          return res
            .status(404)
            .send({ error: "This receiver does not exist" });
      }
    } else {
      const partnerId = await Partner.findById(req.body.receiverID);
      if (!partnerId)
        return res.status(404).send({ error: "This receiver does not exist" });
    }
    req.body.senderID = req.params.id;
    const newMessage = await Message.create(req.body);
    res.json({
      msg: "Your message was created successfully",
      data: newMessage
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
//View all messages
router.get("/", async (req, res) => {
  const messages = await Message.find();
  res.json({ data: messages });
});
//View my messages(sent and received)
router.get("/mymessages/:id", async (req, res) => {
  const id = req.params.id;
  const admin = await Admin.findById(id);
  if (!admin) {
    const partner = await Partner.findById(id);
    if (!partner)
      return res.status(404).send({ error: "This user does not exist" });
  }
  const myMessages = await Message.find({
    $or: [{ senderID: id }, { receiverID: id }]
  });
  res.json({ data: myMessages });
});
//View a message by its id
router.get("/:id", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message)
      return res.status(404).send({ error: "This message does not exist" });
    res.json({ data: message });
  } catch (err) {
    res.json({ msg: err.message });
  }
});
//Delete a message by its id
router.delete("/:id", async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    res.json({
      msg: "Your message has been deleted successfully",
      data: deletedMessage
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
module.exports = router;
