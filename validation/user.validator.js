import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().min(1).max(100).required().messages({
    "string.empty": '"name" cannot be empty',
    "string.min": '"name" should have at least 1 character',
    "string.max": '"name" should not exceed 100 characters',
  }),

  username: Joi.string().min(3).max(30).required().messages({
    "string.empty": '"username" cannot be empty',
    "string.min": '"username" should have at least 3 characters',
    "string.max": '"username" should not exceed 30 characters',
  }),

  email: Joi.string().email().required().messages({
    "string.email": '"email" must be a valid email',
    "string.empty": '"email" cannot be empty',
  }),

  password: Joi.string().min(6).required().messages({
    "string.empty": '"password" cannot be empty',
    "string.min": '"password" should have at least 6 characters',
  }),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": '"email" must be a valid email',
    "string.empty": '"email" cannot be empty',
  }),

  password: Joi.string().min(6).required().messages({
    "string.empty": '"password" cannot be empty',
    "string.min": '"password" should have at least 6 characters',
  }),
});
export default { userSchema, loginUserSchema };
