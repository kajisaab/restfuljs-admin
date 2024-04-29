import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

const complexityOptions = {
  min: 5,
  max: 250,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2
};

export const userSignupSchema = Joi.object({
  firstName: Joi.string().required().messages({ 'string.empty': 'First Name is required' }),
  lastName: Joi.string().required().messages({ 'string.empty': 'last Name is required' }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email is required'
  }),
  password: passwordComplexity(complexityOptions),
  userName: Joi.string().required().messages({ 'string.empty': 'User Name is required' }),
  phoneNumber: Joi.string().min(10).message('Phone Number must be at least 10 characters long').max(10).message('Phone Number cannot exceed 10 characters').required().messages({
    'string.empty': 'Phone Number is required'
  }),
  country: Joi.string().required().messages({ 'string.required': 'Country is required' }),
  province: Joi.string().required().messages({ 'string.required': 'Province is required' }),
  state: Joi.string().required().messages({ 'string.required': 'State is required' }),
  street: Joi.string().required().messages({ 'string.required': 'Street Name is required' }),
  wardNo: Joi.string().required().messages({ 'string.required': 'Ward Number is required' }),
  municipality: Joi.string().allow('').messages({ 'string.only': 'Either Municipality or Rural Municipality must be provided' }),
  ruralMunicipality: Joi.string().allow('').messages({ 'string.only': 'Either Municipality or Rural Municipality must be provided' }),
  image: Joi.string().required().messages({ 'string.required': 'Vendor Image is required' }),
  zipCode: Joi.string().allow(null)
}).or('municipality', 'ruralMunicipality');
