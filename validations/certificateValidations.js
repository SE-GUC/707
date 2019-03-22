const Joi = require("joi");
module.exports = {
  createValidation: request => {
    const createSchema = {
      description: Joi.string().required(),
      category: Joi.string(),
      name: Joi.string()
    };
    return Joi.validate(request, createSchema);
  },
  updateValidation: request => {
    const updateSchema = {
      description: Joi.string(),
      category: Joi.string(),
      name: Joi.string()
    };
    return Joi.validate(request, updateSchema);
  }
};
