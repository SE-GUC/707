const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Email = require("../../models/Email");
const Admin = require("../../models/Admin");
const Candidate = require("../../models/Candidate");
const Consultancy = require("../../models/Consultancy");
const Partner = require("../../models/Partner");
const Project = require("../../models/Project");
const validator = require("../../validations/consultancyValidations");
const passport = require('passport');
//Create consultancy profile
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
        Consultancy.create(req.body, function (err, newConsultancy) {
          if (!err)
            res.json({
              msg: "Your profile has been created successfully",
              data: newConsultancy
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
//View consultancy profile by id
router.get("/profile", passport.authenticate('jwt', {session: false}),async (req, res) => {
  try {
    const consultancy = await Consultancy.findById(req.id);
    if (!consultancy)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    res.json({
      data: consultancy
    });
  } catch (err) {
    res.json({
      msg: err.message
    });
  }
});
//Update consultancy profile by id
router.put("/updateProfile",passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const consultancy = await Consultancy.findById(req.id);
    if (!consultancy)
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
        email: consultancy.email
      }, {
        email: req.body.email
      }, function (err) {
        if (!err) {
          Consultancy.findByIdAndUpdate(req.id, req.body, {
            new: true
          }, function (
            err,
            updatedConsultancy
          ) {
            if (!err)
              res.json({
                msg: "Your profile has been updated successfully",
                data: updatedConsultancy
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
      await Consultancy.findByIdAndUpdate(req.id, req.body, {
        new: true
      }, function (
        err,
        updatedConsultancy
      ) {
        if (!err)
          res.json({
            msg: "Your profile has been updated successfully",
            data: updatedConsultancy
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
//Delete consultancy profile by id
router.delete("/delete",passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const deletedConsultancy = await Consultancy.findByIdAndDelete(
      req.id
    );
    if (!deletedConsultancy)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    res.json({
      msg: "Your account has been deleted successfully",
      data: deletedConsultancy
    });
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
//Create a new conversation by stating receiver email
router.post("/conversations/start",passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const consultancy = await Consultancy.findById(req.id);
    if (!consultancy)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    const senderID = req.id;
    const receiverEmail = req.body.email;
    if (!receiverEmail)
      return res.status(404).send({
        error: "You have to enter a valid email"
      });
    const senderConsultancy = await Consultancy.findById(senderID);
    if (receiverEmail === senderConsultancy.email)
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
    for (i = 0; i < senderConsultancy.conversations.length; i++)
      if (senderConsultancy.conversations[i].receiverEmail === receiverEmail)
        return res.status(404).send({
          error: "this user is already found in your conversations"
        });
    const senderConversation = {
      receiverEmail: receiverEmail
    };
    const receiverConversation = {
      receiverEmail: senderConsultancy.email
    };
    if (receiverAdmin != null || receiverCandidate != null || receiverPartner != null || receiverConsultancy != null) {
      Consultancy.update({
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
router.get("/conversations/get",passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const senderConsultancy = await Consultancy.findById(req.id);
    if (!senderConsultancy)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    res.json({
      data: senderConsultancy.conversations
    });
  } catch (err) {
    res.json({
      msg: err.message
    });
  }
});
//Get an existing conversation by stating receiver email
router.get("/conversations/get/:email", passport.authenticate('jwt', {session: false}),async (req, res) => {
  try {
    const senderConsultancy = await Consultancy.findById(req.id);
    if (!senderConsultancy)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    for (i = 0; i < senderConsultancy.conversations.length; i++)
      if (senderConsultancy.conversations[i].receiverEmail === req.params.email)
        res.json({
          data: senderConsultancy.conversations[i]
        });
  } catch (err) {
    res.json({
      msg: err.message
    });
  }
});
//Delete an existing conversation by stating receiver email
router.delete("/conversations/delete", passport.authenticate('jwt', {session: false}),async (req, res) => {
  try {
    const consultancy = await Consultancy.findById(req.id);
    if (!consultancy)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    const senderID = req.id;
    const receiverEmail = req.body.email;
    if (!receiverEmail)
      return res.status(404).send({
        error: "You have to enter an email to delete a conversation"
      });
    const senderConsultancy = await Consultancy.findById(senderID);
    if (receiverEmail === senderConsultancy.email)
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
      Consultancy.update({
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
            receiverEmail: senderConsultancy.email
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
            receiverEmail: senderConsultancy.email
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
            receiverEmail: senderConsultancy.email
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
            receiverEmail: senderConsultancy.email
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
router.post("/conversations/send",passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const consultancy = await Consultancy.findById(req.id);
    if (!consultancy)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    const senderID = req.id;
    const receiverEmail = req.body.email;
    const emailContent = req.body.content;
    const emailType = req.body.type;
    const senderConsultancy = await Consultancy.findById(senderID);
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
      Consultancy.update({
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
        "conversations.receiverEmail": senderConsultancy.email
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
        "conversations.receiverEmail": senderConsultancy.email
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
        "conversations.receiverEmail": senderConsultancy.email
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
        "conversations.receiverEmail": senderConsultancy.email
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
router.get('/get/projects', passport.authenticate('jwt', {session: false}),async (req, res) => {
  const consultancy = await Consultancy.findById(req.id);
    if (!consultancy)
      return res.status(404).send({
        error: "This profile does not exist"
      });
  const projects = await Project.find({
    approveAdmin: true,
    requireConsultancy: true,
    assigned: false
  });
  res.json({
    data: projects
  })
});
//search projects only that i can apply by name not exact value (search engine)
router.get('/searchProjects/:name',passport.authenticate('jwt', {session: false}), async (req, res) => {
  const consultancy = await Consultancy.findById(req.id);
  if (!consultancy)
    return res.status(404).send({
      error: "This profile does not exist"
    });
  const projects = await Project.find({
    approveAdmin: true,
    requireConsultancy: true,
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
//View all projects' names i am assigned to
router.get('/projects',passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const consultancy = await Consultancy.findById(req.id);
    if (!consultancy)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    res.json({
      data: names(consultancy.projects)
    });
  } catch (error) {
    res.json({
      msg: error
    });
  }
});
//Select a project by its id after viewing all my projects' names
router.get("/project/select/:projectID",passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const consultancy = await Consultancy.findById(req.id);
    if (!consultancy)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    Project.findById(req.params.projectID, function (err, foundProject) {
      if (!err) {
        Consultancy.update({
          "projects._id": req.params.projectID
        }, {
          "projects.$": foundProject
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
router.get("/project/:projectID", passport.authenticate('jwt', {session: false}),async (req, res) => {
  try {
    const consultancy = await Consultancy.findById(req.id);
    if (!consultancy)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    Project.findById(req.params.projectID, function (err, foundProject) {
      if (!err) {
        Consultancy.findByIdAndUpdate(
          req.id, {
            $addToSet: {
              projects: foundProject
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
//Set project tasks and update all its attributes
router.put("/project/:projectID", passport.authenticate('jwt', {session: false}),async (req, res) => {
  try {
    const consultancy = await Consultancy.findById(req.id);
    if (!consultancy)
      return res.status(404).send({
        error: "This profile does not exist"
      });
    Project.findByIdAndUpdate(req.params.projectID, req.body, {
      new: true
    }, function (err, updatedProject) {
      if (!err)
        res.json({
          msg: "Consultancy updated the project successfully",
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
//View all candidates applying for a by project by its id
router.get("/project/:projectID", async (req, res) => {
  try {
    const consultancy = await Consultancy.findById(req.id);
    if (!consultancy)
      return res.status(404).send({
        error: "This profile does not exist"
      });
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
router.post("/project/:projectID/:candidateID", passport.authenticate('jwt', {session: false}),async (req, res) => {
  try {
    const consultancy = await Consultancy.findById(req.id);
    if (!consultancy)
      return res.status(404).send({
        error: "This profile does not exist"
      });
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
module.exports = router;