import Joi from "joi";

const createValidator = Joi.object({
  name: Joi.string().required().email(),
  description: Joi.string(),
  brand: Joi.string(),
  price: Joi.number()
});

export { createValidator };
