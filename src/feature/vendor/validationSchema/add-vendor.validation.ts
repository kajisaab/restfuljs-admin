import Joi from 'joi';

export const addVendorValidationSchema = Joi.object({
  contactNumber: Joi.string()
    .required()
    .messages({ 'string.empty': 'Contact Number is required' }),
  country: Joi.string()
    .required()
    .messages({ 'string.empty': 'Country cannot be empty' }),
  phoneNumber: Joi.string()
    .min(10)
    .message('Phone Number must be at least 10 character')
    .max(10)
    .message('Phone Number cannot exceed 10 characters')
    .required()
    .messages({ 'string.empty': 'Phone Number is required' })
});
