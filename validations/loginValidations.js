const Joi = require("joi");
module.exports = {
  createValidation: request => {
    const createSchema = {
      email: Joi.string().required(),
      password: Joi.string().required()
    };
    return Joi.validate(request, createSchema);
  },
  updateValidation: request => {
    const updateSchema = {
      name: Joi.string(),
      email: Joi.string(),
      password: Joi.string()
    };
    return Joi.validate(request, updateSchema);
  }
};