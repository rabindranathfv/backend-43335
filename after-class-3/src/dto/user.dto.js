import Joi from "joi";

const userSchemaDto = Joi.object({
  name: Joi.string().required().messages({
    "string.base": `"name" should be a type of 'text'`,
    "any.required": `"a" is a required field`,
  }),
  email: Joi.string().email().required(),
  role: Joi.string().valid("ADMIN", "USER").required(),
  orders: Joi.array(),
});

export default userSchemaDto;
