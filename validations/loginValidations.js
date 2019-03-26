const Joi = require("joi");
module.exports = {
  createValidation: request => {
    const createSchema = {
      
      email: Joi.string().required(),
      password: Joi.string().required()
    };
    return Joi.validate(request, createSchema);
  }
   
};