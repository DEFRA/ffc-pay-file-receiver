const Joi = require('joi')

module.exports = Joi.object({
  AzureFileShare: Joi.string().required(),
  OutputFileName: Joi.string().required(),
  ProcessingLocation: Joi.string().required()
})
