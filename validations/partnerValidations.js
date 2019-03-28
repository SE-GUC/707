const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);
module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      birthdate: Joi.date().format(['YYYY/MM/DD', 'DD-MM-YYYY']),
      address: Joi.string(),
      occupation: Joi.string()
    };
    return Joi.validate(request, createSchema);
  },
  updateValidation: request => {
    const updateSchema = {
      name: Joi.string(),
      email: Joi.string(),
      password: Joi.string(),
      birthdate: Joi.date().format(['YYYY/MM/DD', 'DD-MM-YYYY']),
      address: Joi.string(),
      occupation: Joi.string()
    };
    return Joi.validate(request, updateSchema);
  }
};