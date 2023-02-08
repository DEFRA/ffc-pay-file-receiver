const Joi = require('joi')

// Define config schema
const schema = Joi.object({
  blobConnectionString: Joi.string().required(),
  shareConnectionString: Joi.string().required(),
  container: Joi.string().default('dax'),
  inboundFolder: Joi.string().default('inbound')
})

// Build config
const config = {
  blobConnectionString: process.env.BATCH_STORAGE,
  shareConnectionString: process.env.DAX_STORAGE,
  container: process.env.BATCH_STORAGE_CONTAINER,
  inboundFolder: process.env.BATCH_STORAGE_FOLDER
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
