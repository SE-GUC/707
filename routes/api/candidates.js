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
//View all tasks only that i can apply
router.get(
  "/tasks",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Candidate.findById(req.id, function(err, foundUser) {
        if (!err)
          Task.find(
            {
              status: "RequireCandidate",
              $expr: {
                $setIsSubset: ["$requiredSkills", foundUser.skills]
              }
            },
            function(err, foundTasks) {
              if (!err)
                res.json({
                  msg: "All available tasks for you based on ur skills",
                  data: foundTasks
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
//View all my pending approval tasks
router.get(
  "/pendingTasks",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Candidate.findById(req.id, function(err, foundUser) {
        if (!err)
          res.json({
            msg: "Your pending approval tasks information",
            data: foundUser.pendingTasks
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
//View all my approved tasks
router.get(
  "/approvedTasks",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Candidate.findById(req.id, function(err, foundUser) {
        if (!err)
          res.json({
            msg: "Your approved tasks information",
            data: foundUser.approvedTasks
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
//apply for a task by its id
router.post(
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
            Candidate.findById(req.id, function(err, foundUser) {
              if (!err) {
                const requiredSkills = foundTask.requiredSkills;
                const skills = foundUser.skills;
                if (requiredSkills.every(val => skills.includes(val)))
                  Candidate.findByIdAndUpdate(
                    req.id,
                    {
                      $addToSet: {
                        pendingTasks: foundTask
                      }
                    },
                    {
                      new: true
                    },
                    function(err) {
                      if (!err)
                        res.json({
                          msg: "You have applied for this task successfully",
                          data: foundTask
                        });
                      else
                        res.json({
                          error: err.message
                        });
                    }
                  );
                else
                  res.json({
                    error:
                      "You cannot apply for this task because your set of skills are not eough for it"
                  });
              } else
                res.json({
                  error: err.message
                });
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
//disapply a task by its id if i am not assigned to
router.delete(
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
            Candidate.findByIdAndUpdate(
              req.id,
              {
                $pull: {
                  pendingTasks: foundTask
                }
              },
              {
                new: true
              },
              function(err) {
                if (!err)
                  res.json({
                    msg: "You have disapplied for this task successfully",
                    data: foundTask
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
//view the main project of my task
router.get(
  "/project/task/:taskID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Project.find(
        {
          "tasks._id": req.params.taskID
        },
        function(err, foundProject) {
          if (!err)
            res.json({
              msg: "This is the parent project of ur task information",
              data: foundProject
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
//Update my task's taskcyle
router.put(
  "/project/tasks/:projectID/:taskID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const Candidate = await Candidate.find({
        "approvedTasks._id": req.params.taskID
      });
      if (!Candidate)
        Task.findByIdAndUpdate(
          req.params.taskID,
          {
            taskcyle: req.body
          },
          {
            new: true
          },
          function(err, updatedTask) {
            if (!err)
              if (!updatedTask)
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
                    "tasks.$": updatedTask
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
                            "Your task's cycle have been updated successfully",
                          data: updatedTask
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
      else
        res.status(400).send({
          error: "This task cannot be updated because u are not assigned to it"
        });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//request a new certificate
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
//View all available certificates
router.get(
  "/certificates",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Certificate.find(
        {
          available: true
        },
        function(err, foundcertificates) {
          if (!err)
            res.json({
              msg: "All certificates information",
              data: foundcertificates
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
//View all my pending evaluation certificates
router.get(
  "/pendingCertificates",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Candidate.findById(req.id, function(err, foundUser) {
        if (!err)
          res.json({
            msg: "Your pending evaluation certificates information",
            data: foundUser.pendingCertificates
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
//View all my acquired certificates
router.get(
  "/acquiredCertificates",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Candidate.findById(req.id, function(err, foundUser) {
        if (!err)
          res.json({
            msg: "Your acquired certificates information",
            data: foundUser.acquiredCertificates
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
//apply for a certificate by its id
router.post(
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
            Candidate.findByIdAndUpdate(
              req.id,
              {
                $addToSet: {
                  pendingCertificates: foundCertificate
                }
              },
              {
                new: true
              },
              function(err) {
                if (!err)
                  res.json({
                    msg: "You have applied for this certificate successfully",
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
//disapply a certificate by its id
router.delete(
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
            Candidate.findByIdAndUpdate(
              req.id,
              {
                $pull: {
                  pendingCertificates: foundCertificate
                }
              },
              {
                new: true
              },
              function(err) {
                if (!err)
                  res.json({
                    msg:
                      "You have disapplied for this certificate successfully",
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
//View pending approval certificate evaluation tests to take
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
//Take the evaluation tests of pending approval certificate by evaluation test id
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
//Submit the evaluation test of pending approval certificate by evaluation test id and certificate id
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
//Update my set of skills with the acquired certificates that i passed it's evaluation
router.get(
  "/acquiredCertificates/skills",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Candidate.findById(req.id, function(err, foundUser) {
        if (!err) {
          var allAcquiredSkills = new Set();
          for (i = 0; i < foundUser.acquiredCertificates.length; i++)
            for (
              j = 0;
              j < foundUser.acquiredCertificates[i].skills.length;
              j++
            )
              allAcquiredSkills.add(
                foundUser.acquiredCertificates[i].skills[j]
              );
          Candidate.findByIdAndUpdate(
            req.id,
            {
              skills: [...allAcquiredSkills]
            },
            {
              new: true
            },
            function(err, updatedUser) {
              if (!err)
                res.json({
                  msg:
                    "Your skills are updated with your acquired certificates' skills",
                  data: updatedUser.skills
                });
              else
                res.json({
                  error: err.message
                });
            }
          );
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
//View all my recommended tasks
router.get(
  "/recommendedTasks",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const foundUser = await Candidate.findById(req.id);
      Task.find(
        {
          $expr: {
            $setIsSubset: ["$requiredSkills", foundUser.skills]
          }
        },
        function(err, foundTasks) {
          if (!err)
            Candidate.findByIdAndUpdate(
              req.id,
              {
                recommendedTasks: foundTasks
              },
              {
                new: true
              },
              function(err, updatedUser) {
                if (!err)
                  res.json({
                    msg: "All recommended tasks for you based on ur skills",
                    data: updatedUser.recommendedTasks
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
//View all recommended certificates
router.get(
  "/recommendedCertificates",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const foundUser = await Candidate.findById(req.id);
      Certificate.find(
        {
          $expr: {
            $setIntersection: ["$skills", foundUser.interests]
          }
        },
        function(err, foundCertificates) {
          if (!err)
            Candidate.findByIdAndUpdate(
              req.id,
              {
                recommendedCertificates: foundCertificates
              },
              {
                new: true
              },
              function(err, updatedUser) {
                if (!err)
                  res.json({
                    msg:
                      "All available recommended certificates for you based on ur interests",
                    data: updatedUser.recommendedCertificates
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
          if (!foundResearch)
            res.status(404).send({
              error: "This research does not exist"
            });
          else
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
          if (!foundReport)
            res.status(404).send({
              error: "This report does not exist"
            });
          else
            res.json({
              msg: "Report information",
              data: foundReport
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
//update my tasks with the database
router.put(
  "/update/tasks",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const candidate = await Candidate.findById(req.id);
      const tasks = await Task.find({});
      var pendingTasks = [];
      var approvedTasks = [];
      for (i = 0; i < candidate.pendingTasks.length; i++)
        for (j = 0; j < tasks.length; j++)
          if (
            candidate.pendingTasks[i]._id.toString() === tasks[j]._id.toString()
          )
            pendingTasks[i * tasks.length + j] = tasks[j];
      for (i = 0; i < candidate.approvedTasks.length; i++)
        for (j = 0; j < tasks.length; j++)
          if (
            candidate.approvedTasks[i]._id.toString() ===
            tasks[j]._id.toString()
          )
            approvedTasks[i * tasks.length + j] = tasks[j];
      Candidate.findByIdAndUpdate(
        req.id,
        {
          pendingTasks: pendingTasks,
          approvedTasks: approvedTasks
        },
        {
          new: true
        },
        function(err) {
          if (!err)
            res.json({
              msg: "all tasks are updated"
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
//update my certificates with the database
router.put(
  "/update/certificates",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const candidate = await Candidate.findById(req.id);
      const certificates = await Certificate.find({});
      var pendingCertificates = [];
      var acquiredCertificates = [];
      for (i = 0; i < candidate.pendingCertificates.length; i++)
        for (j = 0; j < certificates.length; j++)
          if (
            candidate.pendingCertificates[i]._id.toString() ===
            certificates[j]._id.toString()
          )
            pendingCertificates[i * certificates.length + j] = certificates[j];
      for (i = 0; i < candidate.acquiredCertificates.length; i++)
        for (j = 0; j < certificates.length; j++)
          if (
            candidate.acquiredCertificates[i]._id.toString() ===
            certificates[j]._id.toString()
          )
            acquiredCertificates[i * certificates.length + j] = certificates[j];
      Candidate.findByIdAndUpdate(
        req.id,
        {
          acquiredCertificates: acquiredCertificates,
          acquiredCertificates: acquiredCertificates
        },
        {
          new: true
        },
        function(err) {
          if (!err)
            res.json({
              msg: "all certificates are updated"
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
module.exports = router;
