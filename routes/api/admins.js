const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Email = require("../../models/Email");
const Admin = require("../../models/Admin");
const Candidate = require("../../models/Candidate");
const Consultancy = require("../../models/Consultancy");
const Partner = require("../../models/Partner");
const validator = require("../../validations/adminValidations");
//Create admin profile
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
        Admin.create(req.body, function (err, newAdmin) {
          if (!err)
            res.json({
              msg: "Your profile has been created successfully",
              data: newAdmin
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
      msg: error
    });
  }
});
//View admins profiles
router.get('/', async (req, res) => {
  const admins = await Admin.find()
  res.json({
    data: admins
  })
});
//View admin profile by id
router.get("/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    res.json({
      data: admin
    });
  } catch (err) {
    res.json({
      msg: err.message
    });
  }
});
//Update admin profile by id
router.put("/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin)
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
        email: admin.email
      }, {
        email: req.body.email
      }, function (err) {
        if (!err) {
          Admin.findByIdAndUpdate(req.params.id, req.body, {
            new: true
          }, function (
            err,
            updatedAdmin
          ) {
            if (!err)
              res.json({
                msg: "Your profile has been updated successfully",
                data: updatedAdmin
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
      await Admin.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      }, function (
        err,
        updatedAdmin
      ) {
        if (!err)
          res.json({
            msg: "Your profile has been updated successfully",
            data: updatedAdmin
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
//Delete admin profile by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    res.json({
      msg: "Your account has been deleted successfully",
      data: deletedAdmin
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
      receiverEmail: receiverEmail
    };
    const receiverConversation = {
      receiverEmail: senderAdmin.email
    };
    Admin.update({
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
//Get an existing conversation by stating receiver email
router.get("/conversation/:id/:email", async (req, res) => {
  try {
    const senderAdmin = await Admin.findById(req.params.id);
    if (!senderAdmin)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    for (i = 0; i < senderAdmin.conversations.length; i++)
      if (senderAdmin.conversations[i].receiverEmail === req.params.email)
        res.json({
          data: senderAdmin.conversations[i]
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
    Admin.update({
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
            receiverEmail: senderAdmin.email
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
            receiverEmail: senderAdmin.email
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
            receiverEmail: senderAdmin.email
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
            receiverEmail: senderAdmin.email
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
    const senderAdmin = await Admin.findById(senderID);
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
    Admin.update({
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
        "conversations.receiverEmail": senderAdmin.email
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
        "conversations.receiverEmail": senderAdmin.email
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
        "conversations.receiverEmail": senderAdmin.email
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
        "conversations.receiverEmail": senderAdmin.email
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
//admins view projects
router.get("/viewProjects/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).send({
        error: "This admin does not exsist"
      });
    }
    res.json({
      data: admin.projects
    });
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
//admins accept projects
router.put("/acceptProjects/:id/:id2/:id3", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    const project = await Project.findById(req.params.id2);
    if (!admin) {
      return res.status(404).send({
        error: "This admin does not exsist"
      });
    } else {
      Project.findByIdAndUpdate(req.params.id2, {
        approveAdmin: true
      }, function () {});
      Partner.findByIdAndUpdate(
        req.params.id3, {
          $push: {
            projects: {
              _id: req.params.id2,
              type: project.type,
              name: project.name,
              description: project.description,
              requireConsultancy: project.requireConsultancy,
              approveAdmin: true
            }
          }
        },
        function () {}
      );
      Admin.updateMany({}, {
          $push: {
            projects: {
              _id: req.params.id2,
              type: project.type,
              name: project.name,
              description: project.description,
              requireConsultancy: project.requireConsultancy,
              approveAdmin: true
            }
          }
        },
        function () {}
      );
    }
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
//admins reject projects
router.put("/rejectProjects/:id/:id2/:id3", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    const project = await Project.findById(req.params.id2);
    if (!admin) {
      return res.status(404).send({
        error: "This admin does not exsist"
      });
    } else {
      Project.findByIdAndUpdate(req.params.id2, {
        approveAdmin: false
      }, function () {});
      Partner.findByIdAndUpdate(
        req.params.id3, {
          $push: {
            projects: {
              _id: req.params.id2,
              type: project.type,
              name: project.name,
              description: project.description,
              requireConsultancy: project.requireConsultancy,
              approveAdmin: false
            }
          }
        },
        function () {}
      );
      Admin.updateMany({}, {
          $push: {
            projects: {
              _id: req.params.id2,
              type: project.type,
              name: project.name,
              description: project.description,
              requireConsultancy: project.requireConsultancy,
              approveAdmin: false
            }
          }
        },
        function () {}
      );
    }
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
//create a new certificate
router.post("/createCertificate/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    const newEvaluation = await Evaluation.create(req.body);
    const newCertificate = await Certificate.create(req.body);
    Certificate.findByIdAndUpdate(
      newCertificate._id, {
        evaluation: newEvaluation
      },
      function () {}
    );
    Admin.updateMany({}, {
        $push: {
          certificates: {
            _id: newCertificate._id,
            category: newCertificate.category,
            name: newCertificate.name,
            description: newCertificate.description,
            evaluation: newEvaluation
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
//view certificates by id
router.get("/getCertificates/:id", async (req, res) => {
  const certificates = await Certificate.find();
  res.json({
    data: certificates
  });
});
///delete certificate by certificate id
router.post("/deleteCertificate/:id", async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    const evaluation = certificate.evaluation;
    if (!certificate)
      return res.status(404).send({
        error: "This certificate does not exist"
      });
    Evaluation.findByIdAndDelete(evaluation._id, function () {});
    Certificate.findByIdAndDelete(certificate._id, function () {});
    Admin.updateMany({}, {
        $pull: {
          certificates: {
            _id: certificate._id
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
//insert project attributes
router.post("/createProjectAttributes/:id/:idpartner", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const partner = await Partner.findById(req.params.idpartner);
    const task = await Task.create(req.body);
    Project.findByIdAndUpdate(
      project._id, {
        $push: {
          tasks: task
        }
      },
      function () {}
    );
    Partner.updateOne({
        _id: partner._id,
        "projects._id": project._id
      }, {
        $addToSet: {
          "projects.$.tasks": task
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
module.exports = router;