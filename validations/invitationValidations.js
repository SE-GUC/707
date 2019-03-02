const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            location: Joi.string().required(),
            senderID: Joi.string().required(),
            receiverID: Joi.string().required()
        }
        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            location: Joi.string(),
            senderID: Joi.string(),
            receiverID: Joi.string()
        }
        return Joi.validate(request, updateSchema)
    }, 
}