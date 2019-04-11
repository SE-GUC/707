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
const User = require("../../models/User").User;
const Candidate = require("../../models/User").Candidate;
const Consultancy = require("../../models/User").Consultancy;
//Send&Receive emails
router.post("/email",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        User.findByIdAndUpdate(req.id, {
            $push: {
                "inbox.sentEmails": {
                    subject: req.body.subject,
                    content: req.body.content,
                    receiverEmail: req.body.receiverEmail
                }
            }
        }, {
            new: true
        }, function (err, senderUser) {
            if (!err)
                User.update({
                    email: req.body.receiverEmail
                }, {
                    $push: {
                        "inbox.receivedEmails": {
                            subject: req.body.subject,
                            content: req.body.content,
                            senderEmail: senderUser.email
                        }
                    }
                }, {
                    new: true
                }, function (err) {
                    if (!err)
                        res.json({
                            msg: "You email is sent successfully",
                            data: req.body
                        });
                    else res.json({
                        error: err.message
                    });
                });
            else res.json({
                error: err.message
            });
        })
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//View all projects
router.get("/projects",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Project.find({}, function (err, foundProjects) {
            if (!err)
                res.json({
                    msg: "All projects information",
                    data: foundProjects
                });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//View all projects only that i can apply
router.get("/projects",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Consultancy.findById(req.id, function (err, foundUser) {
            if (!err)
                Project.find({
                    status: "RequireConsultancy",
                    $expr: {
                        $setIsSubset: ["$requiredSkills", foundUser.skills]
                    }
                }, function (err, foundProjects) {
                    if (!err)
                        res.json({
                            msg: "All available projects for you based on ur skills",
                            data: foundProjects
                        });
                    else res.json({
                        error: err.message
                    });
                });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//View all my pending approval projects
router.get('/pendingProjects',passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Consultancy.findById(req.id, function (err, foundUser) {
            if (!err)
                res.json({
                    msg: "Your pending approval projects information",
                    data: foundUser.pendingProjects
                });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//View all my approved projects
router.get('/approvedProjects',passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Consultancy.findById(req.id, function (err, foundUser) {
            if (!err)
                res.json({
                    msg: "Your approved projects information",
                    data: foundUser.approvedProjects
                });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//apply for a project by its id
router.post("/project/:projectID",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Project.findById(req.params.projectID, function (err, foundProject) {
            if (!err)
                if (!foundProject)
                    res.status(404).send({
                        error: "This project does not exist"
                    });
                else
                    Consultancy.findById(req.id, function (err, foundUser) {
                        if (!err) {
                            const requiredSkills = foundProject.requiredSkills;
                            const skills = foundUser.skills;
                            if (requiredSkills.every(val => skills.includes(val)))
                                Consultancy.findByIdAndUpdate(
                                    req.id, {
                                        $addToSet: {
                                            pendingProjects: foundProject
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
                                            error: err.message
                                        });
                                    });
                            else res.json({
                                error: "You cannot apply for this project because your set of skills are not eough for it"
                            });
                        } else res.json({
                            error: err.message
                        });
                    });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//disapply a project by its id if i am not assigned to
router.delete("/project/:projectID",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Project.findById(req.params.projectID, function (err, foundProject) {
            if (!err)
                if (!foundProject)
                    res.status(404).send({
                        error: "This project does not exist"
                    });
                else
                    Consultancy.findByIdAndUpdate(
                        req.id, {
                            $pull: {
                                pendingProjects: foundProject
                            }
                        }, {
                            new: true
                        },
                        function (err) {
                            if (!err)
                                res.json({
                                    msg: "You have disapplied for this project successfully",
                                    data: foundProject
                                });
                            else res.json({
                                error: err.message
                            });
                        });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//Update my approved project that require a consultancy
router.put("/project/:projectID",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Project.findByIdAndUpdate(req.params.projectID, req.body, {
            new: true
        }, function (err, updatedProject) {
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
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//Create tasks for my approved project
router.post("/project/tasks/:projectID",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Task.create(req.body, function (err, createdTask) {
            if (!err)
                Project.findByIdAndUpdate(
                    req.params.projectID, {
                        $push: {
                            tasks: createdTask
                        }
                    }, {
                        new: true
                    },
                    function (err, foundProject) {
                        if (!err)
                            if (!foundProject)
                                res.status(404).send({
                                    error: "This project does not exist"
                                });
                            else
                                res.json({
                                    msg: "Your task has been added to your project successfully",
                                    data: foundProject.tasks
                                });
                        else res.json({
                            error: err.message
                        });
                    });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//view my approved project's tasks by project's id
router.get("/project/tasks/:projectID",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Project.findById(
            req.params.projectID,
            function (err, foundProject) {
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
                else res.json({
                    error: err.message
                });
            });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//Update my approved project's task by it's id
router.put("/project/tasks/:projectID/:taskID",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Task.findByIdAndUpdate(req.params.taskID, req.body, {
            new: true
        }, function (err, updatedTask) {
            if (!err)
                if (!updatedTask)
                    res.status(404).send({
                        error: "This task does not exist"
                    });
                else
                    Project.update({
                        _id: req.params.projectID,
                        "tasks._id": req.params.taskID
                    }, {
                        "tasks.$": updatedTask
                    }, {
                        new: true
                    }, function (err, foundProject) {
                        if (!err)
                            if (!foundProject)
                                res.status(404).send({
                                    error: "This project does not exist"
                                });
                            else
                                res.json({
                                    msg: "Your project's tasks have been updated successfully",
                                    data: foundProject.tasks
                                });
                        else res.json({
                            error: err.message
                        });
                    });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//Delete my approved project's task by it's id
router.delete("/project/tasks/:projectID/:taskID",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Task.findByIdAndDelete(req.params.taskID, function (err, deletedTask) {
            if (!err)
                if (!deletedTask)
                    res.status(404).send({
                        error: "This task does not exist"
                    });
                else
                    Project.findByIdAndUpdate(req.params.projectID, {
                        $pull: {
                            tasks: deletedTask
                        }
                    }, {
                        new: true
                    }, function (err, foundProject) {
                        if (!err)
                            if (!foundProject)
                                res.status(404).send({
                                    error: "This project does not exist"
                                });
                            else
                                res.json({
                                    msg: "Your task has been deleted from your project successfully",
                                    data: foundProject.tasks
                                });
                        else res.json({
                            error: err.message
                        });
                    });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//View all candidates applying for a task inside my approved project
router.get("/candidate/pendingTasks/:taskID",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Candidate.find({
                "pendingTasks._id": req.params.taskID
            },
            function (err, foundCandidates) {
                if (!err)
                    res.json({
                        msg: "These are the candidates applying for the requested task",
                        data: foundCandidates
                    });
                else res.json({
                    error: err.message
                });
            });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//View the candidate processing a task inside my approved project
router.get("/candidate/approvedTasks/:taskID",passport.authenticate('jwt', {session: false}),async (req, res) => {
    try {
        Candidate.find({
                "approvedTasks._id": req.params.taskID
            },
            function (err, foundCandidate) {
                if (!err)
                    res.json({
                        msg: "This the candidate processing the requested task",
                        data: foundCandidate
                    });
                else res.json({
                    error: err.message
                });
            });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//Approve a candidate by his id for a task he applied for by its id
router.post("/candidate/pendingTasks/:projectID/:taskID/:candidateID",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        if (await (Project.findById(req.params.projectID).status === "RequireCandidate" &&
                Task.findById(req.params.taskID).status === "RequireCandidate"))
            Task.findByIdAndUpdate(req.params.taskID, {
                status: "processing"
            }, {
                new: true
            }, function (err, foundTask) {
                if (!err)
                    if (!foundTask)
                        res.status(404).send({
                            error: "This task does not exist"
                        });
                    else
                        Candidate.update({
                                _id: req.params.candidateID,
                                "pendingTasks._id": req.params.taskID
                            }, {
                                $pull: {
                                    pendingTasks: foundTask
                                },
                                $push: {
                                    approvedTasks: foundTask
                                }
                            }, {
                                new: true
                            },
                            function (err, updatedCandidate) {
                                if (!err)
                                    res.json({
                                        msg: "Now this candidate applying for this task is approved",
                                        data: updatedCandidate,
                                        foundTask
                                    });
                                else res.json({
                                    error: err.message
                                });
                            });
                else res.json({
                    error: err.message
                });
            });
        else
            res.status(400).send({
                error: "This project's task cannot be approved because it's status doesnot require a candidate"
            });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//view the main project of any task
router.get("/project/task/:taskID",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Project.find({
            "tasks._id": req.params.taskID
        }, function (err, foundProject) {
            if (!err)
                res.json({
                    msg: "This is the parent project of ur task information",
                    data: foundProject
                });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//request a new certificate
router.post("/certificate",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Certificate.create(req.body, function (err, createdCertificate) {
            if (!err)
                res.json({
                    msg: "Your certificate has been created successfully",
                    data: createdCertificate
                });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//View all certificates
router.get("/certificates",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Certificate.find({
            available: true
        }, function (err, foundcertificates) {
            if (!err)
                res.json({
                    msg: "All certificates information",
                    data: foundcertificates
                });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//View an existing certificate by it's id
router.get("/certificate/:certificateID",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Certificate.findById(req.params.certificateID, function (err, foundCertificate) {
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
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//apply for a certificate by its id
router.post("/certificate/:certificateID",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Certificate.findById(req.params.certificateID, function (err, foundCertificate) {
            if (!err)
                if (!foundCertificate)
                    res.status(404).send({
                        error: "This certificate does not exist"
                    });
                else
                    Consultancy.findByIdAndUpdate(
                        req.id, {
                            $addToSet: {
                                pendingCertificates: foundCertificate
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
            else res.json({
                msg: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//View pending approval certificate evaluation tests to take
router.get("/certificate/evaluationTests/:certificateID",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Certificate.findById(
            req.params.certificateID,
            function (err, foundCertificate) {
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
                else res.json({
                    error: err.message
                });
            });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//Take the evaluation tests of pending approval certificate by evaluation test id
router.get("/certificate/evaluationTest/:evaluationID",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Evaluation.findById(
            req.params.evaluationID,
            function (err, foundEvaluation) {
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
                else res.json({
                    error: err.message
                });
            });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//Submit the evaluation test of pending approval certificate by evaluation test id and certificate id
router.put("/certificate/evaluationTests/:certificateID/:evaluationID",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Evaluation.findByIdAndUpdate(req.params.evaluationID, req.body, {
            new: true
        }, function (err, updatedEvaluation) {
            if (!err)
                if (!updatedEvaluation)
                    res.status(404).send({
                        error: "This evaluation test does not exist"
                    });
                else
                    Certificate.update({
                        _id: req.params.certificateID,
                        "evaluationTests._id": req.params.evaluationID
                    }, {
                        "evaluationTests.$": updatedEvaluation
                    }, {
                        new: true
                    }, function (err, foundCertificate) {
                        if (!err)
                            if (!foundCertificate)
                                res.status(404).send({
                                    error: "This certificate does not exist"
                                });
                            else
                                res.json({
                                    msg: "Your certificate's evaluation tests have been updated successfully",
                                    data: foundCertificate.evaluationTests
                                });
                        else res.json({
                            error: err.message
                        });
                    });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//Update my set of skills with the acquired certificates that i passed it's evaluation
router.get("/acquiredCertificates/skills",passport.authenticate('jwt', {session: false}),async (req, res) => {
    try {
        Consultancy.findById(req.id, function (err, foundUser) {
            if (!err) {
                var allAcquiredSkills = new Set();
                for (i = 0; i < foundUser.acquiredCertificates.length; i++)
                    for (j = 0; j < foundUser.acquiredCertificates[i].skills.length; j++)
                        allAcquiredSkills.add(foundUser.acquiredCertificates[i].skills[j]);
                Consultancy.findByIdAndUpdate(req.id, {
                    skills: [...allAcquiredSkills]
                }, {
                    new: true
                }, function (err, updatedUser) {
                    if (!err)
                        res.json({
                            msg: "Your skills are updated with your acquired certificates' skills",
                            data: updatedUser.skills
                        });
                    else
                        res.json({
                            error: err.message
                        });
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
});
//View all my recommended projects
router.get("/recommendedProjects",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const foundUser = await Consultancy.findById(req.id);
        Project.find({
            $expr: {
                $setIsSubset: ["$requiredSkills", foundUser.skills]
            }
        }, function (err, foundProjects) {
            if (!err)
                Consultancy.findByIdAndUpdate(req.id, {
                    recommendedProjects: foundProjects
                }, {
                    new: true
                }, function (err, updatedUser) {
                    if (!err)
                        res.json({
                            msg: "All recommended projects for you based on ur skills",
                            data: updatedUser.recommendedProjects
                        });
                    else res.json({
                        error: err.message
                    });
                });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//View all my recommended certificates
router.get("/recommendedCertificates",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const foundUser = await Consultancy.findById(req.id);
        Certificate.find({
            $expr: {
                $setIntersection: ["$skills", foundUser.interests]
            }
        }, function (err, foundCertificates) {
            if (!err)
                Consultancy.findByIdAndUpdate(req.id, {
                    recommendedCertificates: foundCertificates
                }, {
                    new: true
                }, function (err, updatedUser) {
                    if (!err)
                        res.json({
                            msg: "All available recommended certificates for you based on ur interests",
                            data: updatedUser.recommendedCertificates
                        });
                    else res.json({
                        error: err.message
                    });
                });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//Create a new research
router.post("/research",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Research.create(req.body, function (err, createdResearch) {
            if (!err)
                Consultancy.findByIdAndUpdate(
                    req.id, {
                        $push: {
                            researches: createdResearch
                        }
                    }, {
                        new: true
                    },
                    function (err) {
                        if (!err)
                            res.json({
                                msg: "Your research has been created successfully",
                                data: createdResearch
                            });
                        else res.json({
                            error: err.message
                        });
                    });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//View all my researches
router.get('/researches',passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Consultancy.findById(req.id, function (err, foundUser) {
            if (!err)
                res.json({
                    msg: "Your researches information",
                    data: foundUser.researches
                });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//View existing research by id
router.get("/researches/:researchID",passport.authenticate('jwt', {session: false}),async (req, res) => {
    try {
        Research.findById(req.params.researchID, function (err, foundResearch) {
            if (!err)
                res.json({
                    msg: "Research information",
                    data: foundResearch
                });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//Update my research
router.put("/research/:researchID",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Research.findByIdAndUpdate(req.params.researchID, req.body, {
            new: true
        }, function (err, updatedResearch) {
            if (!err)
                if (!updatedResearch)
                    res.status(404).send({
                        error: "This research does not exist"
                    });
                else
                    res.json({
                        msg: "Your research has been updated successfully",
                        data: updatedResearch
                    });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//Delete my research
router.delete("/research/:researchID",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Research.findByIdAndDelete(req.params.researchID, function (err, deletedResearch) {
            if (!err)
                if (!deletedResearch)
                    res.status(404).send({
                        error: "This research does not exist"
                    });
                else
                    res.json({
                        msg: "Your research has been deleted successfully",
                        data: deletedResearch
                    });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//Create a new report
router.post("/report",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Report.create(req.body, function (err, createdReport) {
            if (!err)
                Consultancy.findByIdAndUpdate(
                    req.id, {
                        $push: {
                            reports: createdReport
                        }
                    }, {
                        new: true
                    },
                    function (err) {
                        if (!err)
                            res.json({
                                msg: "Your report has been created successfully",
                                data: createdReport
                            });
                        else res.json({
                            error: err.message
                        });
                    });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//View all my reports
router.get('/reports',passport.authenticate('jwt', {session: false}),async (req, res) => {
    try {
        Consultancy.findById(req.id, function (err, foundUser) {
            if (!err)
                res.json({
                    msg: "Your reports information",
                    data: foundUser.reports
                });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: err.message
        });
    }
});
//Update my report
router.put("/report/:reportID",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Report.findByIdAndUpdate(req.params.reportID, req.body, {
            new: true
        }, function (err, updatedReport) {
            if (!err)
                if (!updatedReport)
                    res.status(404).send({
                        error: "This report does not exist"
                    });
                else
                    res.json({
                        msg: "Your report has been updated successfully",
                        data: updatedReport
                    });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//Delete my report
router.delete("/report/:reportID",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Report.findByIdAndDelete(req.params.reportID, function (err, deletedReport) {
            if (!err)
                if (!deletedReport)
                    res.status(404).send({
                        error: "This report does not exist"
                    });
                else
                    res.json({
                        msg: "Your report has been deleted successfully",
                        data: deletedReport
                    });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//View all announcements
router.get("/announcements",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Announcement.find({}, function (err, foundAnnouncements) {
            if (!err)
                res.json({
                    msg: "All announcements information",
                    data: foundAnnouncements
                });
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//View an existing announcement by it's id
router.get("/announcement/:announcementID",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        Announcement.findById(req.params.announcementID, function (err, foundAnnouncement) {
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
            else res.json({
                error: err.message
            });
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
});
//update my projects with the database
router.put("/update/projects",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const consultancy = await Consultancy.findById(req.id);
        const projects = await Task.find({});
        var pendingProjects = [];
        var approvedProjects = [];
        for (i = 0; i < consultancy.pendingProjects.length; i++)
            for (j = 0; j < projects.length; j++)
                if (consultancy.pendingProjects[i]._id.toString() === projects[j]._id.toString())
                    pendingProjects[i * projects.length + j] = projects[j];
        for (i = 0; i < consultancy.approvedProjects.length; i++)
            for (j = 0; j < projects.length; j++)
                if (consultancy.approvedProjects[i]._id.toString() === projects[j]._id.toString())
                    approvedProjects[i * projects.length + j] = projects[j];
        Consultancy.findByIdAndUpdate(req.id, {
            pendingProjects: pendingProjects,
            approvedProjects: approvedProjects
        }, {
            new: true
        }, function (err) {
            if (!err)
                res.json({
                    msg: "all projects are updated"
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
});
//update my certificates with the database
router.put("/update/certificates",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const consultancy = await Consultancy.findById(req.id);
        const certificates = await Certificate.find({});
        var pendingCertificates = [];
        var acquiredCertificates = [];
        for (i = 0; i < consultancy.pendingCertificates.length; i++)
            for (j = 0; j < certificates.length; j++)
                if (consultancy.pendingCertificates[i]._id.toString() === certificates[j]._id.toString())
                    pendingCertificates[i * certificates.length + j] = certificates[j];
        for (i = 0; i < consultancy.acquiredCertificates.length; i++)
            for (j = 0; j < certificates.length; j++)
                if (consultancy.acquiredCertificates[i]._id.toString() === certificates[j]._id.toString())
                    acquiredCertificates[i * certificates.length + j] = certificates[j];
        Consultancy.findByIdAndUpdate(req.id, {
            acquiredCertificates: acquiredCertificates,
            acquiredCertificates: acquiredCertificates
        }, {
            new: true
        }, function (err) {
            if (!err)
                res.json({
                    msg: "all certificates are updated"
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
});
module.exports = router;