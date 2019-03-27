const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Email = require("../../models/Email");
const Admin = require("../../models/Admin");
const Candidate = require("../../models/Candidate");
const Consultancy = require("../../models/Consultancy");
const Partner = require("../../models/Partner");
const Project = require("../../models/Project");
const validator = require("../../validations/partnerValidations");
//Create partner profile
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
    await Email.create(req.body, function (err) {
      if (!err) {
        Partner.create(req.body, function (err, newPartner) {
          if (!err)
            res.json({
              msg: "Your profile has been created successfully",
              data: newPartner
            });
          else res.json({
            msg: err.message
          });
        });
      } else
        return res.status(400).send({
          error: "This email already exists!"
        });
    });
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
//View partners profiles
router.get("/", async (req, res) => {
  const partners = await Partner.find();
  res.json({
    data: partners
  });
});
//View partner profile by id
router.get("/:id", async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    res.json({
      data: partner
    });
  } catch (err) {
    res.json({
      msg: err.message
    });
  }
});
//Update partner profile by id
router.put("/:id", async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner)
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
    if (req.body.password != null) {
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);
    }
    if (req.body.email != null) {
      await Email.findOneAndUpdate({
        email: partner.email
      }, {
        email: req.body.email
      }, function (err) {
        if (!err) {
          Partner.findByIdAndUpdate(req.params.id, req.body, {
            new: true
          }, function (
            err,
            updatedPartner
          ) {
            if (!err)
              res.json({
                msg: "Your profile has been updated successfully",
                data: updatedPartner
              });
            else res.json({
              msg: err.message
            });
          });
        } else
          return res.status(400).send({
            error: "This email already exists!"
          });
      });
    } else {
      await Partner.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      }, function (
        err,
        updatedPartner
      ) {
        if (!err)
          res.json({
            msg: "Your profile has been updated successfully",
            data: updatedPartner
          });
        else res.json({
          msg: err.message
        });
      });
    }
  } catch (error) {
    res.json({
      msg: error.message
    });
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
    res.json({
      msg: error.message
    });
  }
});
//Create a new conversation by stating receiver email
router.post("/conversation/:id", async (req, res) => {
  try {
    const senderID = req.params.id;
    const receiverEmail = req.body.email;
    if (!receiverEmail)
      return res.status(404).send({
        error: "You have to enter a valid email"
      });
    const senderPartner = await Partner.findById(senderID);
    if (receiverEmail === senderPartner.email)
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
    for (i = 0; i < senderPartner.conversations.length; i++)
      if (senderPartner.conversations[i].receiverEmail === receiverEmail)
        return res.status(404).send({
          error: "this user is already found in your conversations"
        });
    const senderConversation = {
      receiverEmail: receiverEmail
    };
    const receiverConversation = {
      receiverEmail: senderPartner.email
    };
    Partner.update({
      _id: senderID
    }, {
      $push: {
        conversations: senderConversation
      }
    }, function () {});
    if (receiverAdmin != null) {
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
//Get all my existing conversations
router.get("/conversation/:id", async (req, res) => {
  try {
    const senderPartner = await Partner.findById(req.params.id);
    if (!senderPartner)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    res.json({
      data: senderPartner.conversations
    });
  } catch (err) {
    res.json({
      msg: err.message
    });
  }
});
//Get an existing conversation by stating receiver email
router.get("/conversation/:id/:email", async (req, res) => {
  try {
    const senderPartner = await Partner.findById(req.params.id);
    if (!senderPartner)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    for (i = 0; i < senderPartner.conversations.length; i++)
      if (senderPartner.conversations[i].receiverEmail === req.params.email)
        res.json({
          data: senderPartner.conversations[i]
        });
  } catch (err) {
    res.json({
      msg: err.message
    });
  }
});
//Delete an existing conversation by stating receiver email
router.delete("/conversation/:id", async (req, res) => {
  try {
    const senderID = req.params.id;
    const receiverEmail = req.body.email;
    if (!receiverEmail)
      return res.status(404).send({
        error: "You have to enter an email to delete a conversation"
      });
    const senderPartner = await Partner.findById(senderID);
    if (receiverEmail === senderPartner.email)
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
    Partner.update({
      _id: senderID
    }, {
      $pull: {
        conversations: {
          receiverEmail: receiverEmail
        }
      }
    }, function () {});
    if (receiverAdmin != null) {
      Admin.update({
        email: receiverEmail
      }, {
        $pull: {
          conversations: {
            receiverEmail: senderPartner.email
          }
        }
      }, function () {});
      return res.status(200).send({
        msg: "Admin conversation is deleted"
      });
    }
    if (receiverCandidate != null) {
      Candidate.update({
        email: receiverEmail
      }, {
        $pull: {
          conversations: {
            receiverEmail: senderPartner.email
          }
        }
      }, function () {});
      return res.status(200).send({
        msg: "Candidate conversation is deleted"
      });
    }
    if (receiverPartner != null) {
      Partner.update({
        email: receiverEmail
      }, {
        $pull: {
          conversations: {
            receiverEmail: senderPartner.email
          }
        }
      }, function () {});
      return res.status(200).send({
        msg: "Partner conversation is deleted"
      });
    }
    if (receiverConsultancy != null) {
      Consultancy.update({
        email: receiverEmail
      }, {
        $pull: {
          conversations: {
            receiverEmail: senderPartner.email
          }
        }
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
//send an email inside an existing conversation by stating receiver email and email content and email type
router.post("/conversation/email/:id", async (req, res) => {
  try {
    const senderID = req.params.id;
    const receiverEmail = req.body.email;
    const emailContent = req.body.content;
    const emailType = req.body.type;
    const senderPartner = await Partner.findById(senderID);
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
    Partner.update({
      _id: senderID,
      "conversations.receiverEmail": receiverEmail
    }, {
      $addToSet: {
        "conversations.$.sentEmails": {
          content: emailContent,
          emailType: emailType
        }
      }
    }, function () {});
    if (receiverAdmin != null) {
      Admin.update({
        _id: receiverAdmin._id,
        "conversations.receiverEmail": senderPartner.email
      }, {
        $addToSet: {
          "conversations.$.receivedEmails": {
            content: emailContent,
            emailType: emailType
          }
        }
      }, function () {});
      return res.status(200).send({
        msg: "Admin email is sent"
      });
    }
    if (receiverCandidate != null) {
      Candidate.update({
        _id: receiverCandidate._id,
        "conversations.receiverEmail": senderPartner.email
      }, {
        $addToSet: {
          "conversations.$.receivedEmails": {
            content: emailContent,
            emailType: emailType
          }
        }
      }, function () {});
      return res.status(200).send({
        msg: "Candidate email is sent"
      });
    }
    if (receiverPartner != null) {
      Partner.update({
        _id: receiverPartner._id,
        "conversations.receiverEmail": senderPartner.email
      }, {
        $addToSet: {
          "conversations.$.receivedEmails": {
            content: emailContent,
            emailType: emailType
          }
        }
      }, function () {});
      return res.status(200).send({
        msg: "Partner email is sent"
      });
    }
    if (receiverConsultancy != null) {
      Consultancy.update({
        _id: receiverConsultancy._id,
        "conversations.receiverEmail": senderPartner.email
      }, {
        $addToSet: {
          "conversations.$.receivedEmails": {
            content: emailContent,
            emailType: emailType
          }
        }
      }, function () {});
      return res.status(200).send({
        msg: "Consultancy email is sent"
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
//create a project
router.post("/createProject/:id", async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    const partner = await Partner.findById(req.params.id);
    if (!partner)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    Partner.findByIdAndUpdate(
      req.params.id, {
        $push: {
          projects: {
            _id: newProject._id,
            type: newProject.type,
            name: newProject.name,
            description: newProject.description,
            requireConsultancy: newProject.requireConsultancy,
            approveAdmin: false
          }
        }
      },
      function () {}
    );
   
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
//Update project by id
router.put("/updateProject/:id/:id2", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const partner = await Partner.findById(req.params.id2);
    if (!project) {
      return res.status(404).send({
        error: "This project does not exsist"
      });
    } else {
      if (project.approveAdmin) {
        return res.status(404).send({
          error: "This project cannot be updated it is already accepted by the admin"
        });
      } else {
        Project.findByIdAndUpdate(req.params.id, req.body, function () {});
        Partner.findByIdAndUpdate(
          req.params.id2, {
            $set: {
              projects: {
                type: req.body.type,
                name: req.body.name,
                description: req.body.description,
                requireConsultancy: req.body.requireConsultancy
              }
            }
          },
          function () {}
        );
       
      }
    }
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
//partners view projects
router.get("/viewProjects/:id", async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).send({
        error: "This partner does not exsist"
      });
    }
    res.json({
      data: partner.projects
    });
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
//delete project by id
router.delete("/deleteProject/:id/:id2", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const partner = await Partner.findById(req.params.id2);
    if (!project) {
      return res.status(404).send({
        error: "This project does not exsist"
      });
    } else {
      if (project.approveAdmin) {
        return res.status(404).send({
          error: "This project cannot be deleted it is already accepted by the admin"
        });
      } else {
        Project.findByIdAndDelete(req.params.id, function () {});
        Partner.findByIdAndUpdate(
          req.params.id2, {
            projects: {
              $pull: {
                type: "",
                name: "",
                description: "",
                requireConsultancy: ""
              }
            }
          },
          function () {}
        );
       
      }
    }
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
module.exports = router;