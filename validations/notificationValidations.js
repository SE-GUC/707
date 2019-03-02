const Joi = require("joi");
module.exports = {
  createValidation: request => {
    const createSchema = {
      notificationType: Joi.string().required(),
      notificationContent: Joi.string()
        .min(10)
        .required(),
      senderID: Joi.string().required(),
      receiverID: Joi.string().required()
    };
    return Joi.validate(request, createSchema);
  },
  updateValidation: request => {
    const updateSchema = {
      notificationContent: Joi.string()
    };
    return Joi.validate(request, updateSchema);
  }
};
