const Joi = require("joi");
module.exports = {
  createValidation: request => {
    const createSchema = {
      description: Joi.string()
        .min(25)
        .required()
    };
    return Joi.validate(request, createSchema);
  },
  updateValidation: request => {
    const updateSchema = {
      description: Joi.string().min(25)
    };
    return Joi.validate(request, updateSchema);
  }
};
