import Joi from 'joi';

const vendorDetailsSchema = Joi.object({
  businessName: Joi.string().required().messages({ 'string.required': 'Business Name is required' }),
  businessContactDetail: Joi.string().required().length(10).pattern(/^\d+$/),
  country: Joi.string().required().messages({ 'string.required': 'Country is required' }),
  province: Joi.string().required().messages({ 'string.required': 'Province is required' }),
  state: Joi.string().required().messages({ 'string.required': 'State is required' }),
  street: Joi.string().required().messages({ 'string.required': 'Street Name is required' }),
  wardNo: Joi.string().required().messages({ 'string.required': 'Ward Number is required' }),
  municipality: Joi.string().allow('').messages({ 'string.only': 'Either Municipality or Rural Municipality must be provided' }),
  ruralMunicipality: Joi.string().allow('').messages({ 'string.only': 'Either Municipality or Rural Municipality must be provided' }),
  image: Joi.string().required().messages({ 'string.required': 'Vendor Image is required' }),
  vendorEmail: Joi.string().email().allow(null),
  vendorType: Joi.string().required().messages({ 'string.required': 'Vendor Type is required' }),
  zipCode: Joi.string().allow(null),
  facebookUrl: Joi.string().uri().allow(null),
  instagramUrl: Joi.string().uri().allow(null),
  twitterUrl: Joi.string().uri().allow(null),
  accountHolderName: Joi.string().required().messages({ 'string.required': 'Account Holder Name is required' }),
  accountNumber: Joi.string().required().messages({ 'string.required': 'Account Number is required' }),
  bankName: Joi.string().required().messages({ 'string.required': 'Bank Name is required' })
}).or('municipality', 'ruralMunicipality');

const ownerDetailsSchema = Joi.object({
  firstName: Joi.string().required().messages({ 'string.required': 'First Name is required' }),
  lastName: Joi.string().required().messages({ 'string.required': 'Last Name is required' }),
  userName: Joi.string().required().messages({ 'string.required': 'Username is required' }),
  contactNumber: Joi.string().required().length(10).pattern(/^\d+$/),
  coutnry: Joi.string().required().messages({ 'string.required': 'Country is required' }),
  province: Joi.string().required().messages({ 'string.required': 'Province is required' }),
  state: Joi.string().required().messages({ 'string.required': 'State is required' }),
  municipality: Joi.string().allow('').messages({ 'string.only': 'Either Municipality or Rural Municipality must be provided' }),
  ruralMunicipality: Joi.string().allow('').messages({ 'string.only': 'Either Municipality or Rural Municipality must be provided' }),
  wardNo: Joi.string().required().messages({ 'string.required': 'Ward Number is required' }),
  street: Joi.string().required().messages({ 'string.required': 'Street Name is required' }),
  zipCode: Joi.string().allow(null)
}).or('municipality', 'ruralMunicipality');

export const addVendorValidationSchema = Joi.object({
  vendor: vendorDetailsSchema,
  owner: ownerDetailsSchema
});
