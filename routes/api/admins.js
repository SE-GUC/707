const express = require("express");
const router = express.Router();
const passport = require("passport");
const Announcement = require("../../models/Announcement");
const Certificate = require("../../models/Certificate");
const Evaluation = require("../../models/Evaluation");
const Project = require("../../models/Project");
const Report = require("../../models/Report");
const Research = require("../../models/Research");
const Task = require("../../models/Task");
const Candidate = require("../../models/User").Candidate;
const Consultancy = require("../../models/User").Consultancy;
const Partner = require("../../models/User").Partner;
//View all projects
router.get(
  "/projects",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Project.find({}, function(err, foundProjects) {
        if (!err)
          res.json({
            msg: "All projects information",
            data: foundProjects
          });
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//View all pending approval projects
router.get(
  "/awaitingprojects",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Project.find(
        {
          status: "Negotiation"
        },
        function(err, foundProjects) {
          if (!err)
            res.json({
              msg: "All projects information",
              data: foundProjects
            });
          else
            res.json({
              error: err.message
            });
        }
      );
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//View an existing project by its id
router.get(
  "/project/:projectID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Project.findById(req.params.projectID, function(err, foundProject) {
        if (!err)
          if (!foundProject)
            res.status(404).send({
              error: "This project does not exist"
            });
          else
            res.json({
              msg: "This project information",
              data: foundProject
            });
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//Approve a submitted project after negotiating with the partner and update all negotiated attributes and status based needs for consultancy or candidates
router.put(
  "/project/:projectID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Project.findByIdAndUpdate(
        req.params.projectID,
        req.body,
        {
          new: true
        },
        function(err, updatedProject) {
          if (!err)
            if (!updatedProject)
              res.status(404).send({
                error: "This project does not exist"
              });
            else
              Partner.update(
                {
                  "pendingProjects._id": req.params.projectID
                },
                {
                  $pull: {
                    pendingProjects: { _id: req.params.projectID }
                  },
                  $push: {
                    approvedProjects: updatedProject
                  }
                },
                {
                  new: true
                },
                function(err) {
                  if (!err)
                    if (updatedProject.status === "RequireConsultancy")
                      res.json({
                        msg:
                          "Now this project is approved and waiting for consultancy to apply",
                        data: updatedProject
                      });
                    else
                      res.json({
                        msg:
                          "Now this project is approved and waiting for candidates to apply on its tasks",
                        data: updatedProject
                      });
                  else
                    res.json({
                      error: err.message
                    });
                }
              );
          else
            res.json({
              error: err.message
            });
        }
      );
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//Delete a submitted project by project id
router.delete(
  "/project/:projectID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Project.findByIdAndDelete(req.params.projectID, function(
        err,
        deletedProject
      ) {
        if (!err)
          if (!deletedProject)
            res.status(404).send({
              error: "This project does not exist"
            });
          else
            res.json({
              msg: "This project has been deleted successfully",
              data: deletedProject
            });
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//View all tasks
router.get(
  "/tasks",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Task.find({}, function(err, foundTasks) {
        if (!err)
          res.json({
            msg: "All tasks information",
            data: foundTasks
          });
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//View an existing task by its id
router.get(
  "/task/:taskID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Task.findById(req.params.taskID, function(err, foundTask) {
        if (!err)
          if (!foundTask)
            res.status(404).send({
              error: "This task does not exist"
            });
          else
            res.json({
              msg: "This task information",
              data: foundTask
            });
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//view all project's tasks by project's id
router.get(
  "/project/tasks/:projectID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Project.findById(req.params.projectID, function(err, foundProject) {
        if (!err)
          if (!foundProject)
            res.status(404).send({
              error: "This project does not exist"
            });
          else
            res.json({
              msg: "Your project's tasks",
              data: foundProject.tasks
            });
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//Update project's task by it's id
router.put(
  "/project/tasks/:projectID/:taskID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Task.findByIdAndUpdate(
        req.params.taskID,
        req.body,
        {
          new: true
        },
        function(err, updatedtask) {
          if (!err)
            if (!updatedtask)
              res.status(404).send({
                error: "This task does not exist"
              });
            else
              Project.update(
                {
                  _id: req.params.projectID,
                  "tasks._id": req.params.taskID
                },
                {
                  "tasks.$": updatedtask
                },
                {
                  new: true
                },
                function(err, foundProject) {
                  if (!err)
                    if (!foundProject)
                      res.status(404).send({
                        error: "This project does not exist"
                      });
                    else
                      res.json({
                        msg:
                          "Your project's tasks have been updated successfully",
                        data: foundProject.tasks
                      });
                  else
                    res.json({
                      error: err.message
                    });
                }
              );
          else
            res.json({
              error: err.message
            });
        }
      );
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//Delete project's task by it's id
router.delete(
  "/project/tasks/:projectID/:taskID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Task.findByIdAndDelete(req.params.taskID, function(err, deletedtask) {
        if (!err)
          if (!deletedtask)
            res.status(404).send({
              error: "This task does not exist"
            });
          else
            Project.findByIdAndUpdate(
              req.params.projectID,
              {
                $pull: {
                  tasks: deletedtask
                }
              },
              {
                new: true
              },
              function(err, foundProject) {
                if (!err)
                  if (!foundProject)
                    res.status(404).send({
                      error: "This project does not exist"
                    });
                  else
                    res.json({
                      msg:
                        "Your task has been deleted from your project successfully",
                      data: foundProject.tasks
                    });
                else
                  res.json({
                    error: err.message
                  });
              }
            );
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//create a new certificate
router.post(
  "/certificate",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Certificate.create(req.body, function(err, createdCertificate) {
        if (!err)
          res.json({
            msg: "Your certificate has been created successfully",
            data: createdCertificate
          });
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//View all certificates
router.get(
  "/certificates",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Certificate.find({}, function(err, foundCertificates) {
        if (!err)
          res.json({
            msg: "All certificates information",
            data: foundCertificates
          });
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//View all requested certificates
router.get(
  "/requestedCertificates",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Certificate.find(
        {
          available: false
        },
        function(err, foundCertificates) {
          if (!err)
            res.json({
              msg: "All certificates information",
              data: foundCertificates
            });
          else
            res.json({
              error: err.message
            });
        }
      );
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//View an existing certificate by it's id
router.get(
  "/certificate/:certificateID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Certificate.findById(req.params.certificateID, function(
        err,
        foundCertificate
      ) {
        if (!err)
          if (!foundCertificate)
            res.status(404).send({
              error: "This certificate does not exist"
            });
          else
            res.json({
              msg: "This certificate information",
              data: foundCertificate
            });
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//Update an existing certificate by it's id
router.put(
  "/certificate/:certificateID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Certificate.findByIdAndUpdate(
        req.params.certificateID,
        req.body,
        {
          new: true
        },
        function(err, updatedCertificate) {
          if (!err)
            if (!updatedCertificate)
              res.status(404).send({
                error: "This certificate does not exist"
              });
            else
              res.json({
                msg: "Your certificate has been updated successfully",
                data: updatedCertificate
              });
          else
            res.json({
              error: err.message
            });
        }
      );
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//Delete an existing certificate by it's id
router.delete(
  "/certificate/:certificateID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Certificate.findByIdAndDelete(req.params.certificateID, function(
        err,
        deletedCertificate
      ) {
        if (!err)
          if (!deletedCertificate)
            res.status(404).send({
              error: "This certificate does not exist"
            });
          else
            res.json({
              msg: "This certificate has been deleted successfully",
              data: deletedCertificate
            });
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//Create evaluation tests for a certificate
router.post(
  "/certificate/evaluationTests/:certificateID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Evaluation.create(req.body, function(err, createdEvaluation) {
        if (!err)
          Certificate.findByIdAndUpdate(
            req.params.certificateID,
            {
              $push: {
                evaluationTests: createdEvaluation
              }
            },
            {
              new: true
            },
            function(err, foundCertificate) {
              if (!err)
                if (!foundCertificate)
                  res.status(404).send({
                    error: "This certificate does not exist"
                  });
                else
                  res.json({
                    msg:
                      "Your evaluation test has been added to your certificate successfully",
                    data: foundCertificate.evaluationTests
                  });
              else
                res.json({
                  error: err.message
                });
            }
          );
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//View an existing certificate's evaluation tests by it's id
router.get(
  "/certificate/evaluationTests/:certificateID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Certificate.findById(req.params.certificateID, function(
        err,
        foundCertificate
      ) {
        if (!err)
          if (!foundCertificate)
            res.status(404).send({
              error: "This certificate does not exist"
            });
          else
            res.json({
              msg: "Your certificate's evaluation tests",
              data: foundCertificate.evaluationTests
            });
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//View the evaluation test of a certificate by evaluation test id
router.get(
  "/certificate/evaluationTest/:evaluationID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Evaluation.findById(req.params.evaluationID, function(
        err,
        foundEvaluation
      ) {
        if (!err)
          if (!foundEvaluation)
            res.status(404).send({
              error: "This evaluation test does not exist"
            });
          else
            res.json({
              msg: "Your certificate's evaluation test",
              data: foundEvaluation
            });
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//View all evaluation Tests for all certificates combined
router.get(
  "/evaluations",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Evaluation.find({}, function(err, foundEvaluation) {
        if (!err)
          res.json({
            msg: "All evaluations information",
            data: foundEvaluation
          });
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//Update certificate's evaluation tests by it's id
router.put(
  "/certificate/evaluationTests/:certificateID/:evaluationID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Evaluation.findByIdAndUpdate(
        req.params.evaluationID,
        req.body,
        {
          new: true
        },
        function(err, updatedEvaluation) {
          if (!err)
            if (!updatedEvaluation)
              res.status(404).send({
                error: "This evaluation test does not exist"
              });
            else
              Certificate.update(
                {
                  _id: req.params.certificateID,
                  "evaluationTests._id": req.params.evaluationID
                },
                {
                  "evaluationTests.$": updatedEvaluation
                },
                {
                  new: true
                },
                function(err, foundCertificate) {
                  if (!err)
                    if (!foundCertificate)
                      res.status(404).send({
                        error: "This certificate does not exist"
                      });
                    else
                      res.json({
                        msg:
                          "Your certificate's evaluation tests have been updated successfully",
                        data: foundCertificate.evaluationTests
                      });
                  else
                    res.json({
                      error: err.message
                    });
                }
              );
          else
            res.json({
              error: err.message
            });
        }
      );
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//Delete certificate's evaluation test by it's id
router.delete(
  "/certificate/evaluationTests/:certificateID/:evaluationID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Evaluation.findByIdAndDelete(req.params.evaluationID, function(
        err,
        deletedEvaluation
      ) {
        if (!err)
          if (!deletedEvaluation)
            res.status(404).send({
              error: "This evaluation test does not exist"
            });
          else
            Certificate.findByIdAndUpdate(
              req.params.certificateID,
              {
                $pull: {
                  evaluationTests: deletedEvaluation
                }
              },
              {
                new: true
              },
              function(err, foundCertificate) {
                if (!err)
                  if (!foundCertificate)
                    res.status(404).send({
                      error: "This certificate does not exist"
                    });
                  else
                    res.json({
                      msg:
                        "Your evaluation test has been deleted from your certificate successfully",
                      data: foundCertificate.evaluationTests
                    });
                else
                  res.json({
                    error: err.message
                  });
              }
            );
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//View all candidates applying for a certain certificate
router.get(
  "/candidate/pendingCertificates/:certificateID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Candidate.find(
        {
          "pendingCertificates._id": req.params.certificateID
        },
        function(err, foundCandidates) {
          if (!err)
            res.json({
              msg:
                "These are the candidates applying for the requested certificate",
              data: foundCandidates
            });
          else
            res.json({
              error: err.message
            });
        }
      );
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//View a submitted certificate evaluation's answer for a candidate by his id to approve
router.get(
  "/pendingCertificates/evaluationTests/:candidateID/:evaluationID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Candidate.findById(req.id, function(err, foundUser) {
        if (!err) {
          for (i = 0; i < foundUser.pendingCertificates.length; i++)
            for (
              j = 0;
              j < foundUser.pendingCertificates[i].evaluationTests.length;
              j++
            )
              if (
                foundUser.pendingCertificates[i].evaluationTests[
                  j
                ]._id.toString() === req.params.evaluationID.toString()
              )
                return res.json({
                  msg: "This is the evaluation answer",
                  data:
                    foundUser.pendingCertificates[i].evaluationTests[j].answer
                });
          return res.status(404).send({
            error: "This evaluation does not exist"
          });
        } else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//Approve a submitted certificate evaluation for a candidate
router.post(
  "/pendingCertificates/:certificateID/:candidateID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Certificate.findById(req.params.certificateID, function(
        err,
        foundCertificate
      ) {
        if (!err)
          if (!foundCertificate)
            res.status(404).send({
              error: "This certificate does not exist"
            });
          else
            Candidate.update(
              {
                _id: req.params.candidateID,
                "pendingCertificates._id": req.params.certificateID
              },
              {
                $pull: {
                  pendingCertificates: foundCertificate
                },
                $push: {
                  acquiredCertificates: foundCertificate
                }
              },
              {
                new: true
              },
              function(err) {
                if (!err)
                  res.json({
                    msg:
                      "Now this certificate's evaluation is approved and posted on your profile",
                    data: foundCertificate
                  });
                else
                  res.json({
                    error: err.message
                  });
              }
            );
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//View all consultancies applying for a certain certificate
router.get(
  "/candidate/pendingCertificates/:certificateID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Consultancy.find(
        {
          "pendingCertificates._id": req.params.certificateID
        },
        function(err, foundConsultancies) {
          if (!err)
            res.json({
              msg:
                "These are the consultancies applying for the requested certificate",
              data: foundConsultancies
            });
          else
            res.json({
              error: err.message
            });
        }
      );
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//View a submitted certificate evaluation's answer for a consultancy by id to approve
router.get(
  "/pendingCertificates/evaluationTests/:consultancyID/:evaluationID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Consultancy.findById(req.id, function(err, foundUser) {
        if (!err) {
          for (i = 0; i < foundUser.pendingCertificates.length; i++)
            for (
              j = 0;
              j < foundUser.pendingCertificates[i].evaluationTests.length;
              j++
            )
              if (
                foundUser.pendingCertificates[i].evaluationTests[
                  j
                ]._id.toString() === req.params.evaluationID.toString()
              )
                return res.json({
                  msg: "This is the evaluation answer",
                  data:
                    foundUser.pendingCertificates[i].evaluationTests[j].answer
                });
          return res.status(404).send({
            error: "This evaluation does not exist"
          });
        } else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//Approve a submitted certificate evaluation for a consultancy
router.post(
  "/pendingCertificates/:certificateID/:consultancyID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Certificate.findById(req.params.certificateID, function(
        err,
        foundCertificate
      ) {
        if (!err)
          if (!foundCertificate)
            res.status(404).send({
              error: "This certificate does not exist"
            });
          else
            Consultancy.update(
              {
                _id: req.params.consultancyID,
                "pendingCertificates._id": req.params.certificateID
              },
              {
                $pull: {
                  pendingCertificates: foundCertificate
                },
                $push: {
                  acquiredCertificates: foundCertificate
                }
              },
              {
                new: true
              },
              function(err) {
                if (!err)
                  res.json({
                    msg:
                      "Now this certificate's evaluation is approved and posted on your profile",
                    data: foundCertificate
                  });
                else
                  res.json({
                    error: err.message
                  });
              }
            );
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//create a new announcement
router.post(
  "/announcement",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Announcement.create(req.body, function(err, createdAnnouncement) {
        if (!err)
          res.json({
            msg: "Your announcement has been created successfully",
            data: createdAnnouncement
          });
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//View all announcements
router.get(
  "/announcements",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Announcement.find({}, function(err, foundAnnouncements) {
        if (!err)
          res.json({
            msg: "All announcements information",
            data: foundAnnouncements
          });
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//View an existing announcement by it's id
router.get(
  "/announcement/:announcementID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Announcement.findById(req.params.announcementID, function(
        err,
        foundAnnouncement
      ) {
        if (!err)
          if (!foundAnnouncement)
            res.status(404).send({
              error: "This announcement does not exist"
            });
          else
            res.json({
              msg: "This announcement information",
              data: foundAnnouncement
            });
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//Update an existing announcement by it's id
router.put(
  "/announcement/:announcementID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Announcement.findByIdAndUpdate(
        req.params.announcementID,
        req.body,
        {
          new: true
        },
        function(err, updatedAnnouncement) {
          if (!err)
            if (!updatedAnnouncement)
              res.status(404).send({
                error: "This announcement does not exist"
              });
            else
              res.json({
                msg: "Your announcement has been updated successfully",
                data: updatedAnnouncement
              });
          else
            res.json({
              error: err.message
            });
        }
      );
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//Delete an existing announcement by it's id
router.delete(
  "/announcement/:announcementID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Announcement.findByIdAndDelete(req.params.announcementID, function(
        err,
        deletedAnnouncement
      ) {
        if (!err)
          if (!deletedAnnouncement)
            res.status(404).send({
              error: "This announcement does not exist"
            });
          else
            res.json({
              msg: "This announcement has been deleted successfully",
              data: deletedAnnouncement
            });
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//View all researches
router.get(
  "/researches",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Research.find({}, function(err, foundResearches) {
        if (!err)
          res.json({
            msg: "All researches information",
            data: foundResearches
          });
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//View existing research by id
router.get(
  "/research/:researchID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Research.findById(req.params.researchID, function(err, foundResearch) {
        if (!err)
          res.json({
            msg: "Research information",
            data: foundResearch
          });
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//View all reports
router.get(
  "/reports",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Report.find({}, function(err, foundReports) {
        if (!err)
          res.json({
            msg: "All reports information",
            data: foundReports
          });
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//View existing report by id
router.get(
  "/report/:reportID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Report.findById(req.params.reportID, function(err, foundReport) {
        if (!err)
        return(
          res.json({
            msg: "Report information",
            data: foundReport
          }));
        else
        return(
          res.json({
            error: err.message
          }));
      });
    } catch (error) {
      return(
      res.json({
        error: error.message
      }));
    }
  }
);
//View all certificates
router.get(
  "/evaluationTests",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Evaluation.find({}, function(err, foundevaluations) {
        if (!err)
          res.json({
            msg: "All evaluations information",
            data: foundevaluations
          });
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
module.exports = router;
