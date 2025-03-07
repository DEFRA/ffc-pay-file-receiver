const Joi = require('joi')

module.exports = Joi.object({
  blobConnectionString: Joi.string().required(),
  shareConnectionString: Joi.string().required(),
  storageBlobAccount: Joi.string().required(),
  storageShareAccount: Joi.string().required(),
  container: Joi.string().default('dax'),
  inboundFolder: Joi.string().default('inbound'),
  useBlobConnectionStr: Joi.boolean().default(false),
  useShareConnectionStr: Joi.boolean().default(true),
  createContainers: Joi.boolean().default(true),
  managedIdentityClientId: Joi.string().optional()
})
