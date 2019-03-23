const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Partner = require("../../models/Partner");
const Project = require("../../models/Project");
//const Admin = require("../../models/Admin");

const validator = require("../../validations/partnerValidations");
//Create partner profile
router.post("/register", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    const newPartner = await Partner.create(req.body);
    res.json({
      msg: "Your profile was created successfully",
      data: newPartner
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
//View partners profiles
router.get("/", async (req, res) => {
  const partners = await Partner.find();
  res.json({ data: partners });
});
//View partner profile by id
router.get("/:id", async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner)
      return res.status(404).send({ error: "This profile does not exist" });
    res.json({ data: partner });
  } catch (err) {
    res.json({ msg: err.message });
  }
});
//Update partner profile by id
router.put("/:id", async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner)
      return res.status(404).send({ error: "This profile does not exist" });
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    if (req.params.password != null) {
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);
    }
    Partner.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
      err,
      updatedPartner
    ) {
      if (!err)
        res.json({
          msg: "Your profile has been updated successfully",
          data: updatedPartner
        });
      else res.json({ msg: err.message });
    });
  } catch (error) {
    res.json({ msg: error.message });
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
    res.json({ msg: error.message });
  }
});
// create project
router.post("/createProject/:id", async (req, res) => {
  //Admin.findAndUpdate(req.params.id,{$push:{awaitingApprovalProjects:{}}})
  try {
    const newProject = await Project.create(req.body);
    const partner = await Partner.findById(req.params.id);
    if (!partner)
      return res.status(404).send({ error: "This profile does not exist" });

    Partner.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          projects: {
            _id: newProject._id,
            type: newProject.type,
            name: newProject.name,
            description: newProject.description,
            requireConsultancy: newProject.requireConsultancy,
            approveAdmin:false
          }
        }
      },
      function() {}
    );
    Admin.updateMany({}, {
      $push: {
        projects: {
          _id: newProject._id,
          type: newProject.type,
          name: newProject.name,
          description: newProject.description,
          requireConsultancy: newProject.requireConsultancy,
          approveAdmin:false
        }
      }
    },
    function() {}
  );
  } catch (error) {
    res.json({ msg: error.message });
  }
});

//Update project by id
router.put("/updateProject/:id/:id2", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const partner = await Partner.findById(req.params.id2);
    if(!project){
      return res.status(404).send({ error: "This project does not exsist" });
    }else{
      if(project.approveAdmin){
        return res.status(404).send({ error: "This project cannot be updated it is already accepted by the admin" });
      }else{
        Project.findByIdAndUpdate(req.params.id, req.body, function() {});
        Partner.findByIdAndUpdate(
          req.params.id2,
          {
            $set: {
              projects: {
                type: req.body.type,
                name: req.body.name,
                description: req.body.description,
                requireConsultancy:req.body.requireConsultancy
              }
            }
          },
          function() {}
        );
        Admin.updateMany({}, {
          $set: {
            projects: {
              type: req.body.type,
              name: req.body.name,
              description: req.body.description,
              requireConsultancy: req.body.requireConsultancy
            }
          }
        },
        function() {}
      );
      }
    
    }
  } catch (error) {
    res.json({ msg: error.message });
  }

});
//partners view projects
router.get("/viewProjects/:id", async (req, res) => {
  try{
  const partner = await Partner.findById(req.params.id);
  if(!partner){
    return res.status(404).send({ error: "This partner does not exsist" });
  }
  res.json({data:partner.projects});
}catch (error) {
  res.json({ msg: error.message });
} 
});
//delete project by id
router.delete("/deleteProject/:id/:id2", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const partner = await Partner.findById(req.params.id2);
    if(!project){
      return res.status(404).send({ error: "This project does not exsist" });
    }else{
      if(project.approveAdmin){
        return res.status(404).send({ error: "This project cannot be deleted it is already accepted by the admin" });
      }else{
        Project.findByIdAndDelete(req.params.id, function() {});
        Partner.findByIdAndUpdate(
          req.params.id2,
          {
            
              projects: { $pull:{
                type:"",
                name: "",
                description: "",
                requireConsultancy:""
              }
              }
           
          },
          function() {}
        );
        Admin.updateMany({}, {
         
            projects: { $pull:{
              _id:project.id,
              type: "",
              name: "",
              description:"",
              requireConsultancy: ""
            }
            }
         
        },
        function() {}
      );
      }
    
    }
  } catch (error) {
    res.json({ msg: error.message });
  }

});
module.exports = router;
