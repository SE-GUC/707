const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Lifecycle = require('../../models/Lifecycle')
const Project = require('../../models/Project')
const validator = require('../../validations/lifecycleValidations')

//Create a lifecycle
router.post('/', async (req,res) => {
    try {
        
        const isValidated = validator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const project=  await Project.findById(req.body.projectID);
        if(!project)  return res.status(404).send({error: "This project does not exist"});
        const newLifecycle = await Lifecycle.create(req.body)
        res.json({msg:'Lifecycle was created successfully', data: newLifecycle})
       }
       catch(error) {
        res.json({msg: err.message})
       }  
 })
 

//View lifecycles
router.get('/', async (req,res) => {
    const lifecycles = await Lifecycle.find()
    res.json({data: lifecycles})
})

//View a lifecycle by its id
router.get("/:id", async (req, res) => {
    try{
    const id = req.params.id
    const lifecycle = await Lifecycle.findById(id)
    if(!lifecycle) return res.status(404).send({error: 'This lifecycle does not exist'})
    res.json({data: lifecycle})}
    catch(err){
        res.json({msg: err.message})
    }
});

//Update a lifecycle by its id
router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const lifecycle = await Lifecycle.findById(id)
     if(!lifecycle) return res.status(404).send({error: 'This lifecycle does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
      Lifecycle.findByIdAndUpdate(id,req.body, { 'new': true }, function(err, updatedLifecycle){
        if(!err)
            res.json({msg: 'Your lifecyle has been updated successfully',data: updatedLifecycle})
        else
            res.json({msg: err.message})
    })
    
    
    }
    catch(error) {
        res.json({msg: error.message})
    }  
 })



//Delete a lifecycle by its id
router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedLifecycle = await Lifecycle.findByIdAndDelete(id)
     res.json({msg:'Your lifecycle has been deleted successfully', data: deletedLifecycle})
    }
    catch(error) {
        
        res.json({msg: error.message})   
     }  
 })

module.exports = router