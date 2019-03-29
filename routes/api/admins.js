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
//View all admins profiles
router.get("/get/admins", async (req, res) => {
  const admins = await Admin.find();
  res.json({
    data: admins
  });
});
//View all candidates profiles
router.get("/get/candidates", async (req, res) => {
  const candidates = await Candidate.find();
  res.json({
    data: candidates
  });
});
//View all consultancies profiles
router.get("/get/consultancies", async (req, res) => {
  const consultancies = await Consultancy.find();
  res.json({
    data: consultancies
  });
});
//View all partners profiles
router.get("/get/partners", async (req, res) => {
  const partners = await Partner.find();
  res.json({
    data: partners
  });
});
//View all certificates
router.get("/get/certificates", async (req, res) => {
  const certificates = await Certificate.find();
  res.json({
    data: certificates
  });
});
//View all projects
router.get("/get/projects", async (req, res) => {
  const projects = await Project.find();
  res.json({
    data: projects
  });
});
//View all emails
router.get("/get/emails", async (req, res) => {
  const emails = await Email.find();
  res.json({
    data: emails
  });
});
//search admins by name not exact value (search engine)
router.get('/searchAdmins/:name', async (req, res) => {
  const admins = await Admin.find({
    name: {
      $regex: new RegExp(req.params.name)
    },
  });
  res.json({
    data: admins
  });
});
//search candidates by name not exact value (search engine)
router.get('/searchCandidates/:name', async (req, res) => {
  const candidates = await Candidate.find({
    name: {
      $regex: new RegExp(req.params.name)
    },
  });
  res.json({
    data: candidates
  });
});
//search consultancies by name not exact value (search engine)
router.get('/searchConsultancies/:name', async (req, res) => {
  const consultancies = await Consultancy.find({
    name: {
      $regex: new RegExp(req.params.name)
    },
  });
  res.json({
    data: consultancies
  });
});
//search partners by name not exact value (search engine)
router.get('/searchPartners/:name', async (req, res) => {
  const partners = await Partner.find({
    name: {
      $regex: new RegExp(req.params.name)
    },
  });
  res.json({
    data: partners
  });
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
//search projects by name not exact value (search engine)
router.get('/searchProjects/:name', async (req, res) => {
  const projects = await Project.find({
    name: {
      $regex: new RegExp(req.params.name)
    },
  });
  res.json({
    data: projects
  });
});
//search emails by name not exact value (search engine)
router.get('/searchEmails/:name', async (req, res) => {
  const emails = await Email.find({
    email: {
      $regex: new RegExp(req.params.name)
    },
  });
  res.json({
    data: emails
  });
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
    if (receiverAdmin != null || receiverCandidate != null || receiverPartner != null || receiverConsultancy != null) {
      Admin.update({
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
    if (receiverAdmin != null || receiverCandidate != null || receiverPartner != null || receiverConsultancy != null) {
      Admin.update({
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
    if (receiverAdmin != null || receiverCandidate != null || receiverPartner != null || receiverConsultancy != null) {
      Admin.update({
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
        "conversations.receiverEmail": senderAdmin.email
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
        "conversations.receiverEmail": senderAdmin.email
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
        "conversations.receiverEmail": senderAdmin.email
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
        "conversations.receiverEmail": senderAdmin.email
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
//View an existing project by its id
router.get("/project/:id", async (req, res) => {
  try {
    const project = Project.findById(req.params.id);
    if (!project)
      return res.status(404).send({
        error: "This project does not exist"
      });
    res.json({
      data: project
    });
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
//(Accept/Reject) a submitted project after negotiating and update all its attributes
router.put("/project/:projectID", async (req, res) => {
  try {
    Project.findByIdAndUpdate(req.params.projectID, req.body, {
      new: true
    }, function (err, updatedProject) {
      if (!err)
        res.json({
          msg: "Admin updated the project successfully",
          data: updatedProject
        });
      else res.json({
        msg: err.message
      });
    });
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
//Delete a submitted project by project id
router.delete("/project/:projectID", async (req, res) => {
  try {
    Project.findByIdAndDelete(req.params.projectID, function (err, deletedProject) {
      if (!err)
        Partner.update({
          "projects._id": req.params.projectID
        }, {
          $pull: {
            projects: deletedProject
          }
        }, {
          new: true
        }, function (err) {
          if (!err)
            Consultancy.update({
              "projects._id": req.params.projectID
            }, {
              $pull: {
                projects: deletedProject
              }
            }, {
              new: true
            }, function (err) {
              if (!err) {
                Candidate.updateMany({
                  "appliedProjects._id": req.params.projectID
                }, {
                  $pull: {
                    projects: deletedProject
                  }
                }, {
                  new: true
                }, function (err) {
                  if (!err)
                    Candidate.updateMany({
                      "approvedProjects._id": req.params.projectID
                    }, {
                      $pull: {
                        projects: deletedProject
                      }
                    }, {
                      new: true
                    }, function (err) {
                      if (!err)
                        res.json({
                          msg: "This project has been deleted successfully",
                          data: deletedProject
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
        });
      else res.json({
        msg: err.message
      });
    });
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
//View all candidates applying for a by project by its id
router.get("/projects/:projectID", async (req, res) => {
  try {
    Project.findById(req.params.projectID, function (err, foundProject) {
      if (!err) {
        Candidate.find({
            "appliedProjects._id": req.params.projectID
          },
          function (err, foundCandidates) {
            if (!err)
              res.json({
                msg: "These are the candidates applying for requested project",
                data: foundCandidates,
                foundProject
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
//Approve a candidate by his id for a project he applied for by its id
router.post("/project/:projectID/:candidateID", async (req, res) => {
  try {
    Project.findById(req.params.projectID, function (err, foundProject) {
      if (!err) {
        Candidate.update({
            _id: req.params.candidateID,
            "appliedProjects._id": req.params.projectID
          }, {
            $pull: {
              appliedProjects: foundProject
            },
            $push: {
              approvedProjects: foundProject
            }
          }, {
            new: true
          },
          function (err) {
            if (!err)
              res.json({
                msg: "Now the candidate applying for this project is approved",
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
//create a new certificate
router.post("/certificate", async (req, res) => {
  try {
    const certificate = await Certificate.create(req.body);
    res.json({
      msg: certificate
    });
  } catch (error) {
    res.json({
      msg: error
    });
  }
});
//View an existing certificate by it's id
router.get("/certificate/:id", async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate)
      return res.status(404).send({
        error: "This certificate does not exist"
      });
    res.json({
      data: certificate
    });
  } catch (err) {
    res.json({
      msg: err.message
    });
  }
});
//Update an existing certificate by it's id
router.put("/certificate/:id", async (req, res) => {
  try {
    Certificate.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }, function (err, updatedCertificate) {
      if (!err)
        res.json({
          msg: "This certificate has been updated successfully",
          data: updatedCertificate
        });
      else res.json({
        msg: err.message
      });
    });
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
//Delete an existing certificate by it's id
router.delete("/certificate/:id", async (req, res) => {
  try {
    const deletedCertificate = await Certificate.findByIdAndDelete(req.params.id);
    res.json({
      msg: "This certificate has been deleted successfully",
      data: deletedCertificate
    });
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
//Approve a candidate's evaluation by his id for a certficate he passed by it's id
router.post("/certificate/:certificateID/:candidateID", async (req, res) => {
  try {
    Certificate.findById(req.params.certificateID, function (err, foundCertificate) {
      if (!err) {
        Candidate.update({
            _id: req.params.candidateID,
            "appliedCertificates._id": req.params.certificateID
          }, {
            $pull: {
              appliedCertificates: foundCertificate
            },
            $push: {
              approvedCertificates: foundCertificate
            }
          }, {
            new: true
          },
          function (err) {
            if (!err)
              res.json({
                msg: "Now the candidate applying for this certificate is approved and received the certificate",
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