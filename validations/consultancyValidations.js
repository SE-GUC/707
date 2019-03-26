const Joi = require("joi");
module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required()
    };
    return Joi.validate(request, createSchema);
  },
  updateValidation: request => {
    const updateSchema = {
      email: Joi.string(),
      password: Joi.string()
    };
    return Joi.validate(request, updateSchema);
  }
};