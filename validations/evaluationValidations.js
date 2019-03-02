const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            evaluationType: Joi.string().required(),
            evaluationContent: Joi.string().min(10).max(1000000).required(),
            totalScore: Joi.number().required(),
            passingScore:Joi.number().required()
        }
        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            evaluationType: Joi.string(),
            evaluationContent: Joi.string().min(10).max(1000000),
            totalScore: Joi.number(),
            passingScore:Joi.number()
        }
        return Joi.validate(request, updateSchema)
    }, 
}