import Joi from "joi";

const orderSchemaDto = Joi.object({
  products: Joi.array().items(Joi.number()).required(),
  user: Joi.string().required(),
  bussiness: Joi.string().required(),
});

export default orderSchemaDto;
