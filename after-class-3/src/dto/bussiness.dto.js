import Joi from "joi";

const productSchema = Joi.object({
  id: Joi.number().required(),
  product: Joi.string().min(3).required(),
  price: Joi.number().required(),
});

const bussinessSchemaDto = Joi.object({
  name: Joi.string().required(),
  products: Joi.array().items(productSchema),
});

export default bussinessSchemaDto;
