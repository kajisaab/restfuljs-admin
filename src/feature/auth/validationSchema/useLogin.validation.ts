import Joi from 'joi';

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required'
  })
});
