const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            description: Joi.string().required()
        }
        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            description: Joi.string()
        }
        return Joi.validate(request, updateSchema)
    }, 
}