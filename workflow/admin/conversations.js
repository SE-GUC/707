const express = require("express");
const router = express.Router();
const Admin = require("../../models/Admin");
const Candidate = require("../../models/Candidate");
const Partner = require("../../models/Partner");
const Consultancy = require("../../models/Consultancy");
//Create a conversation
router.post("/:id", async (req, res) => {
  try {
    const senderID = req.params.id;
    const receiverEmail = req.body.email;
    if (!receiverEmail)
      return res.status(404).send({
        error: "You have to enter a valid email"
      });
    const senderAdmin = await Admin.findById(senderID);
    if (receiverEmail === senderAdmin.email)
      return res.status(404).send({
        error: "You can't have a conversation with yourself"
      });
    const receiverAdmin = await Admin.findOne({
      email: receiverEmail
    });
    const receiverCandidate = await Candidate.findOne({
      email: receiverEmail
    });
    const receiverPartner = await Partner.findOne({
      email: receiverEmail
    });
    const receiverConsultancy = await Consultancy.findOne({
      email: receiverEmail
    });
    for (i = 0; i < senderAdmin.conversations.length; i++)
      if (senderAdmin.conversations[i].receiverEmail === receiverEmail)
        return res.status(404).send({
          error: "this user is already found in your conversations"
        });
    const senderConversation = {
      SentMessages: [],
      RecievedMessages: [],
      receiverEmail: receiverEmail
    };
    const receiverConversation = {
      SentMessages: [],
      RecievedMessages: [],
      receiverEmail: senderAdmin.email
    };
    if (receiverAdmin != null) {
      Admin.update({
        _id: senderID
      }, {
        $push: {
          conversations: senderConversation
        }
      }, function () {});
      Admin.update({
        email: receiverEmail
      }, {
        $push: {
          conversations: receiverConversation
        }
      }, function () {});
      return res.status(200).send({
        msg: "New admin conversation is created"
      });
    }
    if (receiverCandidate != null) {
      Admin.update({
        _id: senderID
      }, {
        $push: {
          conversations: senderConversation
        }
      }, function () {});
      Candidate.update({
        email: receiverEmail
      }, {
        $push: {
          conversations: receiverConversation
        }
      }, function () {});
      return res.status(200).send({
        msg: "New candidate conversation is created"
      });
    }
    if (receiverPartner != null) {
      Admin.update({
        _id: senderID
      }, {
        $push: {
          conversations: senderConversation
        }
      }, function () {});
      Partner.update({
        email: receiverEmail
      }, {
        $push: {
          conversations: receiverConversation
        }
      }, function () {});
      return res.status(200).send({
        msg: "New partner conversation is created"
      });
    }
    if (receiverConsultancy != null) {
      Admin.update({
        _id: senderID
      }, {
        $push: {
          conversations: senderConversation
        }
      }, function () {});
      Consultancy.update({
        email: receiverEmail
      }, {
        $push: {
          conversations: receiverConversation
        }
      }, function () {});
      return res.status(200).send({
        msg: "New consultancy conversation is created"
      });
    }
    return res.status(404).send({
      error: "this user isnot found or this email is invalid"
    });
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
//Get all my conversations
router.get("/:id", async (req, res) => {
  try {
    const senderAdmin = await Admin.findById(req.params.id);
    if (!senderAdmin)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    res.json({
      data: senderAdmin.conversations
    });
  } catch (err) {
    res.json({
      msg: err.message
    });
  }
});
//Get an existing conversation by email
router.get("/:id/:email", async (req, res) => {
  try {
    const senderAdmin = await Admin.findById(req.params.id);
    if (!senderAdmin)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    const email = req.params.email;
    for (i = 0; i < senderAdmin.conversations.length; i++)
      if (senderAdmin.conversations[i].receiverEmail === email)
        return res.json({
          data: senderAdmin.conversations[i]
        });
  } catch (err) {
    res.json({
      msg: err.message
    });
  }
});
//Delete a conversation
router.delete("/:id", async (req, res) => {
  try {
    const senderID = req.params.id;
    const receiverEmail = req.body.email;
    if (!receiverEmail)
      return res.status(404).send({
        error: "You have to enter an email to delete a conversation"
      });
    const senderAdmin = await Admin.findById(senderID);
    if (receiverEmail === senderAdmin.email)
      return res.status(404).send({
        error: "You can't have a conversation with yourself to delete it"
      });
    const receiverAdmin = await Admin.findOne({
      email: receiverEmail
    });
    const receiverCandidate = await Candidate.findOne({
      email: receiverEmail
    });
    const receiverPartner = await Partner.findOne({
      email: receiverEmail
    });
    const receiverConsultancy = await Consultancy.findOne({
      email: receiverEmail
    });
    var flag = false;
    var senderConversations = [];
    for (i = 0; i < senderAdmin.conversations.length; i++)
      if (senderAdmin.conversations[i].receiverEmail === receiverEmail)
        flag = true;
      else
        senderConversations[i] = senderAdmin.conversations[i];
    if (!flag)
      return res.status(404).send({
        error: "this user is not found in your conversations"
      });
    var receiverConversations = [];
    if (receiverAdmin != null) {
      for (i = 0; i < receiverAdmin.conversations.length; i++)
        if (receiverAdmin.conversations[i].receiverEmail !== senderAdmin.email)
          receiverConversations[i] = receiverAdmin.conversations[i];
      Admin.update({
        _id: senderID
      }, {
        conversations: senderConversations
      }, function () {});
      Admin.update({
        email: receiverEmail
      }, {
        conversations: receiverConversations
      }, function () {});
      return res.status(200).send({
        msg: "Admin conversation is deleted"
      });
    }
    if (receiverCandidate != null) {
      for (i = 0; i < receiverCandidate.conversations.length; i++)
        if (receiverCandidate.conversations[i].receiverEmail !== senderAdmin.email)
          receiverConversations[i] = receiverCandidate.conversations[i];
      Admin.update({
        _id: senderID
      }, {
        conversations: senderConversations
      }, function () {});
      Candidate.update({
        email: receiverEmail
      }, {
        conversations: receiverConversations
      }, function () {});
      return res.status(200).send({
        msg: "Candidate conversation is deleted"
      });
    }
    if (receiverPartner != null) {
      for (i = 0; i < receiverPartner.conversations.length; i++)
        if (receiverPartner.conversations[i].receiverEmail !== senderAdmin.email)
          receiverConversations[i] = receiverPartner.conversations[i];
      Admin.update({
        _id: senderID
      }, {
        conversations: senderConversations
      }, function () {});
      Partner.update({
        email: receiverEmail
      }, {
        conversations: receiverConversations
      }, function () {});
      return res.status(200).send({
        msg: "Partner conversation is deleted"
      });
    }
    if (receiverConsultancy != null) {
      for (i = 0; i < receiverConsultancy.conversations.length; i++)
        if (receiverConsultancy.conversations[i].receiverEmail !== senderAdmin.email)
          receiverConversations[i] = receiverConsultancy.conversations[i];
      Admin.update({
        _id: senderID
      }, {
        conversations: senderConversations
      }, function () {});
      Consultancy.update({
        email: receiverEmail
      }, {
        conversations: receiverConversations
      }, function () {});
      return res.status(200).send({
        msg: "Consultancy conversation is deleted"
      });
    }
    return res.status(404).send({
      error: "this user isnot found or this email is invalid"
    });
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
module.exports = router;