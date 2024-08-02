import Joi from "joi";

const registerValidator = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

const loginValidator = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

export { registerValidator, loginValidator };
