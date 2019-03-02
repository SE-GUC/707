const Joi = require("joi");
module.exports = {
  createValidation: request => {
    const createSchema = {
      messageSubject: Joi.string(),
      messageContent:Joi.string().required(),
      senderID:Joi.string().required(),
      receiverID:Joi.string().required()
    };
    return Joi.validate(request, createSchema);
  }
};