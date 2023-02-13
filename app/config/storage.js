const Joi = require('joi')

// Define config schema
const schema = Joi.object({
  blobConnectionString: Joi.string().required(),
  shareConnectionString: Joi.string().required(),
  storageBlobAccount: Joi.string().required(),
  storageShareAccount: Joi.string().required(),
  container: Joi.string().default('dax'),
  inboundFolder: Joi.string().default('inbound'),
  useBlobConnectionStr: Joi.boolean().default(false),
  useShareConnectionStr: Joi.boolean().default(false),
  createContainers: Joi.boolean().default(true)
})

// Build config
const config = {
  storageBlobAccount: process.env.AZURE_STORAGE_BLOB_ACCOUNT_NAME,
  storageShareAccount: process.env.AZURE_STORAGE_SHARE_ACCOUNT_NAME,
  blobConnectionString: process.env.AZURE_STORAGE_BLOB_CONNECTION_STRING,
  shareConnectionString: process.env.AZURE_STORAGE_SHARE_CONNECTION_STRING,
  container: process.env.AZURE_STORAGE_BLOB_CONTAINER,
  inboundFolder: process.env.AZURE_STORAGE_BLOB_FOLDER,
  useBlobConnectionStr: process.env.AZURE_STORAGE_BLOB_USE_CONNECTION_STRING,
  useShareConnectionStr: process.env.AZURE_STORAGE_SHARE_USE_CONNECTION_STRING
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The storage config is invalid. ${result.error.message}`)
}

module.exports = result.value
