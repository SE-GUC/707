const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Email = require("../../models/Email");
const Admin = require("../../models/Admin");
const Candidate = require("../../models/Candidate");
const Consultancy = require("../../models/Consultancy");
const Partner = require("../../models/Partner");
const Project = require("../../models/Project");
const Certificate = require("../../models/Certificate");
const validator = require("../../validations/candidateValidations");
//Create candidate profile
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
        Candidate.create(req.body, function (err, newCandidate) {
          if (!err)
            res.json({
              msg: "Your profile has been created successfully",
              data: newCandidate
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
//View candidate profile by id
router.get("/:id", async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    res.json({
      data: candidate
    });
  } catch (err) {
    res.json({
      msg: err.message
    });
  }
});
//Update candidate profile by id
router.put("/:id", async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate)
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
        email: candidate.email
      }, {
        email: req.body.email
      }, function (err) {
        if (!err) {
          Candidate.findByIdAndUpdate(req.params.id, req.body, {
            new: true
          }, function (
            err,
            updatedCandidate
          ) {
            if (!err)
              res.json({
                msg: "Your profile has been updated successfully",
                data: updatedCandidate
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
      await Candidate.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      }, function (
        err,
        updatedCandidate
      ) {
        if (!err)
          res.json({
            msg: "Your profile has been updated successfully",
            data: updatedCandidate
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
//Delete candidate profile by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedCandidate = await Candidate.findByIdAndDelete(req.params.id);
    res.json({
      msg: "Your account has been deleted successfully",
      data: deletedCandidate
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
    const senderCandidate = await Candidate.findById(senderID);
    if (receiverEmail === senderCandidate.email)
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
    for (i = 0; i < senderCandidate.conversations.length; i++)
      if (senderCandidate.conversations[i].receiverEmail === receiverEmail)
        return res.status(404).send({
          error: "this user is already found in your conversations"
        });
    const senderConversation = {
      receiverEmail: receiverEmail
    };
    const receiverConversation = {
      receiverEmail: senderCandidate.email
    };
    if (receiverAdmin != null || receiverCandidate != null || receiverPartner != null || receiverConsultancy != null) {
      Candidate.update({
        _id: senderID
      }, {
        $push: {
          conversations: senderConversation
        }
      }, function () {});
    }
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
    const senderCandidate = await Candidate.findById(req.params.id);
    if (!senderCandidate)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    res.json({
      data: senderCandidate.conversations
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
    const senderCandidate = await Candidate.findById(req.params.id);
    if (!senderCandidate)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    for (i = 0; i < senderCandidate.conversations.length; i++)
      if (senderCandidate.conversations[i].receiverEmail === req.params.email)
        res.json({
          data: senderCandidate.conversations[i]
        });
  } catch (err) {
    res.json({
      msg: err.message
    });
  }
});
//Delete an existing conversation by stating receiver email
router.delete("/conversation/:id/:email", async (req, res) => {
  try {
    const senderID = req.params.id;
    const receiverEmail = req.params.email;
    if (!receiverEmail)
      return res.status(404).send({
        error: "You have to enter an email to delete a conversation"
      });
    const senderCandidate = await Candidate.findById(senderID);
    if (receiverEmail === senderCandidate.email)
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
    if (receiverAdmin != null || receiverCandidate != null || receiverPartner != null || receiverConsultancy != null) {
      Candidate.update({
        _id: senderID
      }, {
        $pull: {
          conversations: {
            receiverEmail: receiverEmail
          }
        }
      }, function () {});
    }
    if (receiverAdmin != null) {
      Admin.update({
        email: receiverEmail
      }, {
        $pull: {
          conversations: {
            receiverEmail: senderCandidate.email
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
            receiverEmail: senderCandidate.email
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
            receiverEmail: senderCandidate.email
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
            receiverEmail: senderCandidate.email
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
    const senderCandidate = await Candidate.findById(senderID);
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
    if (receiverAdmin != null || receiverCandidate != null || receiverPartner != null || receiverConsultancy != null) {
      Candidate.update({
        _id: senderID,
        "conversations.receiverEmail": receiverEmail
      }, {
        $push: {
          "conversations.$.sentEmails": {
            content: emailContent,
            emailType: emailType
          }
        }
      }, function () {});
    }
    if (receiverAdmin != null) {
      Admin.update({
        _id: receiverAdmin._id,
        "conversations.receiverEmail": senderCandidate.email
      }, {
        $push: {
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
        "conversations.receiverEmail": senderCandidate.email
      }, {
        $push: {
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
        "conversations.receiverEmail": senderCandidate.email
      }, {
        $push: {
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
        "conversations.receiverEmail": senderCandidate.email
      }, {
        $push: {
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
//View all projects only that i can apply
router.get('/get/projects', async (req, res) => {
  const projects = await Project.find({
    approveAdmin: true,
    assigned: false
  });
  res.json({
    data: projects
  })
});
//search projects only that i can apply by name not exact value (search engine)
router.get('/searchProjects/:name', async (req, res) => {
  const projects = await Project.find({
    approveAdmin: true,
    assigned: false,
    name: {
      $regex: new RegExp(req.params.name)
    },
  });
  res.json({
    data: projects
  });
});
//Get names of any json array
function names(array) {
  var names = [];
  for (i = 0; i < array.length; i++)
    names[i] = array[i].name;
  return names;
}
//View all projects' names i applied for
router.get('/appliedProjects/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate)
      return res.status(404).send({
        error: "This candidate does not exist"
      });
    res.json({
      data: names(candidate.appliedProjects)
    });
  } catch (error) {
    res.json({
      msg: error
    });
  }
});
//View all projects' names i am approved to
router.get('/approvedProjects/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate)
      return res.status(404).send({
        error: "This candidate does not exist"
      });
    res.json({
      data: names(candidate.approvedProjects)
    });
  } catch (error) {
    res.json({
      msg: error
    });
  }
});
//Select a project by its id after viewing all my projects' names
router.get("/project/select/:projectID", async (req, res) => {
  try {
    Project.findById(req.params.projectID, function (err, foundProject) {
      if (!err) {
        Candidate.updateMany({
          "appliedProjects._id": req.params.projectID
        }, {
          "appliedProjects.$": foundProject
        }, {
          new: true
        }, function (err) {
          if (!err)
            Candidate.updateMany({
              "approvedProjects._id": req.params.projectID
            }, {
              "approvedProjects.$": foundProject
            }, {
              new: true
            }, function (err) {
              if (!err)
                res.json({
                  msg: "This is the selected project",
                  data: foundProject
                });
              else res.json({
                msg: err.message
              });
            });
          else res.json({
            msg: err.message
          });
        });
      } else res.json({
        msg: err.message
      });
    });
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
//apply for a project by its id
router.post("/project/:id/:projectID", async (req, res) => {
  try {
    Project.findById(req.params.projectID, function (err, foundProject) {
      if (!err) {
        Candidate.findByIdAndUpdate(
          req.params.id, {
            $addToSet: {
              appliedProjects: foundProject
            }
          }, {
            new: true
          },
          function (err) {
            if (!err)
              res.json({
                msg: "You have applied for this project successfully",
                data: foundProject
              });
            else res.json({
              msg: err.message
            });
          });
      } else res.json({
        msg: err.message
      });
    });
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
//disapply a project by its id if i am not assigned to
router.delete("/project/:id/:projectID", async (req, res) => {
  try {
    Project.findById(req.params.projectID, function (err, foundProject) {
      if (!err) {
        Candidate.findByIdAndUpdate(
          req.params.id, {
            $pull: {
              appliedProjects: foundProject
            }
          }, {
            new: true
          },
          function (err, updatedCandidate) {
            if (!err) {
              var flag = false;
              for (i = 0; i < updatedCandidate.approvedProjects.length; i++)
                if (updatedCandidate.approvedProjects[i]._id.toString() === foundProject._id.toString())
                  flag = true;
              if (!flag)
                res.json({
                  msg: "You are no longer applied for this project",
                  data: foundProject
                });
              else
                res.json({
                  msg: "You are already approved for this project that u cannot remove",
                  data: foundProject
                });
            } else res.json({
              msg: err.message
            });
          });
      } else res.json({
        msg: err.message
      });
    });
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
//View all certificates' names
router.get('/get/certificates', async (req, res) => {
  const certificates = await Certificate.find();
  res.json({
    data: names(certificates)
  })
});
//search certificates by name not exact value (search engine)
router.get('/searchCertificates/:name', async (req, res) => {
  const certificates = await Certificate.find({
    name: {
      $regex: new RegExp(req.params.name)
    },
  });
  res.json({
    data: certificates
  });
});
//Select a certificate by its id after viewing all my certificates' names
router.get("/certificate/select/:certificateID", async (req, res) => {
  try {
    Certificate.findById(req.params.certificateID, function (err, foundCertificate) {
      if (!err) {
        Candidate.updateMany({
          "appliedCertificates._id": req.params.certificateID
        }, {
          "appliedCertificates.$": foundCertificate
        }, {
          new: true
        }, function (err) {
          if (!err)
            Candidate.updateMany({
              "appliedCertificates._id": req.params.certificateID
            }, {
              "appliedCertificates.$": foundCertificate
            }, {
              new: true
            }, function (err) {
              if (!err)
                res.json({
                  msg: "This is the selected certificate",
                  data: foundCertificate
                });
              else res.json({
                msg: err.message
              });
            });
          else res.json({
            msg: err.message
          });
        });
      } else res.json({
        msg: err.message
      });
    });
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
//apply for a certificate by its id
router.post("/certificate/:id/:certificateID", async (req, res) => {
  try {
    Certificate.findById(req.params.certificateID, function (err, foundCertificate) {
      if (!err) {
        Candidate.findByIdAndUpdate(
          req.params.id, {
            $addToSet: {
              appliedCertificates: foundCertificate
            }
          }, {
            new: true
          },
          function (err) {
            if (!err)
              res.json({
                msg: "You have applied for this certificate successfully",
                data: foundCertificate
              });
            else res.json({
              msg: err.message
            });
          });
      } else res.json({
        msg: err.message
      });
    });
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
module.exports = router;