import Joi from 'joi';

const vendorDetailsSchema = Joi.object({
  businessName: Joi.string().required().messages({ 'string.empty': 'Business Name is required' }),
  country: Joi.string().required().messages({ 'string.empty': 'Country is required' }),
  province: Joi.string().required().messages({ 'string.empty': 'Province is required' }),
  state: Joi.string().required().messages({ 'string.empty': 'State is required' }),
  street: Joi.string().required().messages({ 'string.empty': 'Street Name is required' }),
  wardNo: Joi.string().required().messages({ 'string.empty': 'Ward Number is required' }),
  municipality: Joi.string().allow('').messages({ 'any.only': 'Either Municipality or Rural Municipality must be provided' }),
  ruralMunicipality: Joi.string().allow('').messages({ 'string.empty': 'Rural Municipality must be a string' }),
  image: Joi.string().required().messages({ 'string.empty': 'Vendor Image is required' }),
  contactNo: Joi.string().required().length(10).pattern(/^\d+$/),
  email: Joi.string().email().allow(''),
  vendorType: Joi.string().required().messages({ 'string.empty': 'Vendor Type is required' }),
  zipCode: Joi.string().allow('').messages({ 'string.empty': 'Zip Code is required' }),
  facebookUrl: Joi.string().uri().allow('').messages({ 'string.empty': 'Facebook URL is required' }),
  instagramUrl: Joi.string().uri().allow('').messages({ 'string.empty': 'Instagram URL is required' }),
  twitterUrl: Joi.string().uri().allow('').messages({ 'string.empty': 'Twitter URL is required' }),
  accountHolderName: Joi.string().required().messages({ 'string.empty': 'Account Holder Name is required' }),
  accountNumber: Joi.string().required().messages({ 'string.empty': 'Account Number is required' }),
  bankName: Joi.string().required().messages({ 'string.empty': 'Bank Name is required' })
}).or('municipality', 'ruralMunicipality');

const ownerDetailsSchema = Joi.object({
  firstName: Joi.string().required().messages({ 'string.empty': 'First Name is required' }),
  lastName: Joi.string().required().messages({ 'string.empty': 'Last Name is required' }),
  userName: Joi.string().required().messages({ 'string.empty': 'Username is required' }),
  contactNo: Joi.string().required().length(10).pattern(/^\d+$/),
  country: Joi.string().required().messages({ 'string.empty': 'Country is required' }),
  province: Joi.string().required().messages({ 'string.empty': 'Province is required' }),
  state: Joi.string().required().messages({ 'string.empty': 'State is required' }),
  municipality: Joi.string().allow('').messages({ 'any.only': 'Either Municipality or Rural Municipality must be provided' }),
  ruralMunicipality: Joi.string().allow('').messages({ 'string.empty': 'Rural Municipality must be a string' }),
  wardNo: Joi.string().required().messages({ 'string.empty': 'Ward Number is required' }),
  street: Joi.string().required().messages({ 'string.empty': 'Street Name is required' }),
  zipCode: Joi.string().allow('').messages({ 'string.empty': 'Zip Code is required' }),
  image: Joi.string().allow('')
}).or('municipality', 'ruralMunicipality');

export const addVendorValidationSchema = Joi.object({
  vendor: vendorDetailsSchema,
  owner: ownerDetailsSchema
});
