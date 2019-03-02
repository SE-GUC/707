const Joi = require('joi')


module.exports = {
    createValidation: request => {
        const createSchema = {
            
           name: Joi.string().min(2).max(25).required(),
           email:Joi.string().required(),
           password:Joi.string().required(),
           birthdate:Joi.date().required(),
           address:Joi.string().min(10).required(),
           occupation:Joi.string().required(),
           languages:Joi.array().min(1).required(),
           imageURL:Joi.string()
           

           

            
        }
        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
           name: Joi.string().min(2).max(25),
           email:Joi.string(),
           password: Joi.string(),
           address:Joi.string().min(10),
           occupation:Joi.string(),
           languages:Joi.array().min(1),
           imageURL:Joi.string()
          
        }
        return Joi.validate(request, updateSchema)
    },
}