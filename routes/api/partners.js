const express = require("express");
const router = express.Router();
const passport = require("passport");
const Announcement = require("../../models/Announcement");
const Project = require("../../models/Project");
const Report = require("../../models/Report");
const Research = require("../../models/Research");
const Task = require("../../models/Task");
const Candidate = require("../../models/User").Candidate;
const Consultancy = require("../../models/User").Consultancy;
const Partner = require("../../models/User").Partner;
//Create a project by filling only (minimum) description
router.post(
  "/project",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Project.create(req.body, function(err, createdProject) {
        if (!err)
          Partner.findByIdAndUpdate(
            req.id,
            {
              $push: {
                pendingProjects: createdProject
              }
            },
            {
              new: true
            },
            function(err) {
              if (!err)
                res.json({
                  msg: "Your project has been created successfully",
                  data: createdProject
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
//View all my pending approval projects from the admin
router.get(
  "/pendingProjects",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Partner.findById(req.id, function(err, foundUser) {
        if (!err)
          res.json({
            msg: "Your pending approval projects information",
            data: foundUser.pendingProjects
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
//View all my approved projects by the admin (waiting for consultancy or candidates to apply based on my choice in negotiation)
router.get(
  "/approvedProjects",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Partner.findById(req.id, function(err, foundUser) {
        if (!err)
          res.json({
            msg: "Your approved projects information",
            data: foundUser.approvedProjects
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
//Update my project if its status is negotiation
router.put(
  "/project/:projectID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (
        (await Project.findById(req.params.projectID)).status === "Negotiation"
      )
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
                res.json({
                  msg: "Your project has been updated successfully",
                  data: updatedProject
                });
            else
              res.json({
                error: err.message
              });
          }
        );
      else
        res.status(400).send({
          error:
            "This project cannot be updated because it is approved by the admin"
        });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//Delete a submitted project if its status is negotiation
router.delete(
  "/project/:projectID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (
        (await Project.findById(req.params.projectID)).status === "Negotiation"
      )
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
      else
        res.status(400).send({
          error:
            "This project cannot be deleted because it is approved by the admin"
        });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//Create tasks for my project if its status is negotiation
router.post(
  "/project/tasks/:projectID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (
        (await Project.findById(req.params.projectID)).status === "Negotiation"
      )
        Task.create(req.body, function(err, createdTask) {
          if (!err)
            Project.findByIdAndUpdate(
              req.params.projectID,
              {
                $push: {
                  tasks: createdTask
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
                        "Your task has been added to your project successfully",
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
      else
        res.status(400).send({
          error:
            "This project cannot be updated with new tasks because it is approved by the admin"
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
      if (
        (await Project.findById(req.params.projectID)).status === "Negotiation"
      )
        Task.findByIdAndUpdate(
          req.params.taskID,
          req.body,
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
      else
        res.status(400).send({
          error:
            "This project's tasks cannot be updated because it is approved by the admin"
        });
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
      if (
        (await Project.findById(req.params.projectID)).status === "Negotiation"
      )
        Task.findByIdAndDelete(req.params.taskID, function(err, deletedTask) {
          if (!err)
            if (!deletedTask)
              res.status(404).send({
                error: "This task does not exist"
              });
            else
              Project.findByIdAndUpdate(
                req.params.projectID,
                {
                  $pull: {
                    tasks: deletedTask
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
      else
        res.status(400).send({
          error:
            "This project's tasks cannot be deleted because it is approved by the admin"
        });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//view the main project of any task
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
//View all consultancies applying for my project
router.get(
  "/consultancy/pendingProjects/:projectID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Consultancy.find(
        {
          "pendingProjects._id": req.params.projectID
        },
        function(err, foundConsultancies) {
          if (!err)
            res.json({
              msg: "These are the consultancies applying for my project",
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
//View the consultancy processing my project
router.get(
  "/consultancy/approvedProjects/:projectID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Consultancy.find(
        {
          "approvedProjects._id": req.params.projectID
        },
        function(err, foundConsultancy) {
          if (!err)
            res.json({
              msg: "This is the consultancy processing my project",
              data: foundConsultancy
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
//Approve a consultancy by its id for a project it applied for by its id
router.post(
  "/consultancy/pendingProjects/:projectID/:consultancyID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (
        (await Project.findById(req.params.projectID)).status ===
        "RequireConsultancy"
      )
        Project.findByIdAndUpdate(
          req.params.projectID,
          {
            status: "RequireCandidate"
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
                Consultancy.update(
                  {
                    _id: req.params.consultancyID,
                    "pendingProjects._id": req.params.projectID
                  },
                  {
                    $pull: {
                      pendingProjects: {_id: req.params.projectID}

                    },
                    $push: {
                      approvedProjects: foundProject
                    }
                  },
                  {
                    new: true
                  },
                  function(err, updatedConsultancy) {
                    if (!err)
                      res.json({
                        msg:
                          "Now this consultancy applying for this project is approved",
                        data: updatedConsultancy,
                        foundProject
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
          error:
            "This project cannot be approved because it's status doesnot require a consultancy"
        });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//View all candidates applying for a task inside my project
router.get(
  "/candidate/pendingTasks/:taskID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Candidate.find(
        {
          "pendingTasks._id": req.params.taskID
        },
        function(err, foundCandidates) {
          if (!err)
            res.json({
              msg: "These are the candidates applying for the requested task",
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
//View the candidate processing a task inside my project
router.get(
  "/candidate/approvedTasks/:taskID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      Candidate.find(
        {
          "approvedTasks._id": req.params.taskID
        },
        function(err, foundCandidate) {
          if (!err)
            res.json({
              msg: "This the candidate processing the requested task",
              data: foundCandidate
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
//Approve a candidate by his id for a task he applied for by its id
router.post(
  "/candidate/pendingTasks/:projectID/:taskID/:candidateID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const project= await(Project.findById(req.params.projectID))
      const task= await(Task.findById(req.params.taskID))
     
      if (project.status === "processing" && task.status === "RequireCandidate")
      
        Task.findByIdAndUpdate(
          req.params.taskID,
          {
            status: "processing"
          },
          {
            new: true
          },
          function(err, foundTask) {
            if (!err)
              if (!foundTask)
                res.status(404).send({
                  error: "This task does not exist"
                });
              else
                Candidate.update(
                  {
                    _id: req.params.candidateID,
                    "pendingTasks._id": req.params.taskID
                  },
                  {
                    $pull: {
                      pendingTasks: foundTask
                    },
                    $push: {
                      approvedTasks: foundTask
                    }
                  },
                  {
                    new: true
                  },
                  function(err, updatedCandidate) {
                    if (!err)
                      res.json({
                        msg:
                          "Now this candidate applying for this task is approved",
                        data: updatedCandidate,
                        foundTask
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
          error:
            "This project's task cannot be approved because it's status doesnot require a candidate"
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
//update my projects with the database
router.put(
  "/update/projects",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const partner = await Partner.findById(req.id);
      const projects = await Project.find({});
      var pendingProjects = [];
      var approvedProjects = [];
      let count=0
      for (i = 0; i < partner.pendingProjects.length; i++)
        for (j = 0; j < projects.length; j++)
          if (
            partner.pendingProjects[i]._id.toString() ===
            projects[j]._id.toString()
          )
            pendingProjects[i * projects.length + j] = projects[j];
      for (i = 0; i < partner.approvedProjects.length; i++)
        for (j = 0; j < projects.length; j++)
          if (
            partner.approvedProjects[i]._id.toString() ===
            projects[j]._id.toString()
          )
            approvedProjects[count] = projects[j];
            count+=1
      Partner.findByIdAndUpdate(
        req.id,
        {
          pendingProjects: pendingProjects,
          approvedProjects: approvedProjects
        },
        {
          new: true
        },
        function(err) {
          if (!err)
            res.json({
              msg: "all projects are updated"
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
