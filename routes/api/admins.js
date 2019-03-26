const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const passport = require('passport')
const tokenKey = require('../../config/keys').secretOrKey
require('../../config/passport')(passport)
const Admin = require("../../models/Admin");
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
    const newAdmin = await Admin.create(req.body);
    res.json({
      msg: "Your profile was created successfully",
      data: newAdmin
    });
  } catch (error) {
    res.json({
      msg: error
    });
  }
});


//View admins profiles
router.get('/',  async (req, res) => {
    const admins = await Admin.find()
    res.json({ data: admins })
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
    const partner = await Partner.findById(req.params.id3);
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
    const partner = await Partner.findById(req.params.id3);
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
//view certificates with id
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
      $set: {
        "projects.$.tasks": task
      }

    })

  } catch (error) {
    res.json({
      msg: error.message
    });
  }
});
module.exports = router;