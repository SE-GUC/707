const Joi = require("joi");
module.exports = {
  createValidation: request => {
    const createSchema = {
      projectID: Joi.string().required(),
      lifeCycleState: Joi.string().required(),
      lifeCyclePercentage: Joi.number()
        .min(0)
        .max(100)
        .required(),
      lifeCycleStateDescription: Joi.string().required()
    };
    return Joi.validate(request, createSchema);
  },
  updateValidation: request => {
    const updateSchema = {
      lifeCycleState: Joi.string(),
      lifeCyclePercentage: Joi.number()
        .min(0)
        .max(100),
      lifeCycleStateDescription: Joi.string()
    };
    return Joi.validate(request, updateSchema);
  }
};
