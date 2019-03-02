const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Evaluation = require('../../models/Evaluation')
const validator = require('../../validations/evaluationValidations')

//Create an evaluation
router.post('/', async (req,res) => {
    try {
     const isValidated = validator.createValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const newEvaluation = await Evaluation.create(req.body)
     res.json({msg:'Evaluation was created successfully', data: newEvaluation})
    }
    catch(error) {
        console.log(error)
    }  
 })


//View an evaluation
router.get('/', async (req,res) => {
    const evaluations = await Evaluation.find()
    res.json({data: evaluations})
})

//View an evaluation by its id
router.get("/:id", async (req, res) => {
    try{
        const id = req.params.id
        const evaluation = await Evaluation.findById(id)
        if(!evaluation) return res.status(404).send({error: 'This evaluation does not exist'})
        res.json({data: evaluation})}
        catch(err){
            res.json({msg: err.message})
        }
});

//Update an evaluation
router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const evaluation = await Evaluation.findById(id)
     if(!evaluation) return res.status(404).send({error: 'This evaluation does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
      Evaluation.findByIdAndUpdate(id,req.body, { 'new': true }, function(err, updatedEvaluation){
        if(!err)
            res.json({msg: 'Your evaluation has been updated successfully',data: updatedEvaluation})
        else
            res.json({msg: err.message})
    })
    
    
    }
    catch(error) {
        res.json({msg: error.message})
    }  
 })


//Delete an evaluation
router.delete("/:id", async (req, res) => {
    try {
      const deletedEvaluation = await Evaluation.findByIdAndDelete(req.params.id);
      res.json({ msg: "Your evaluation has been deleted successfully",  data: deletedEvaluation });
    } catch (error) {
      res.json({ msg: error.message });
    }
  });
  module.exports = router;