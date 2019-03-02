const Joi = require('joi')


module.exports = {
    createValidation: request => {
        const createSchema = {
            
          projectID:Joi.string().required(),
          candidateID:Joi.string().required(),
          motivationLetter:Joi.string().min(100).required()

           

            
        }
        return Joi.validate(request, createSchema)
    }
}