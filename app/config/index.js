const Joi = require('joi')
const mqConfig = require('./message')
const getStorageConfig = require('./get-storage-config')
const { DEVELOPMENT, TEST, PRODUCTION } = require('../constants/environments')

const schema = Joi.object({
  env: Joi.string().valid('development', 'test', 'production').default('development'),
  totalRetries: Joi.number().default(30),
  retryInterval: Joi.number().default(2000),
  enabled: Joi.boolean().default(false)
})

const config = {
  env: process.env.NODE_ENV,
  totalRetries: process.env.TOTAL_RETRIES,
  retryInterval: process.env.RETRY_INTERVAL,
  enabled: process.env.FILE_RECEIVER_ENABLED
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

const value = result.value
const storageConfig = getStorageConfig()

value.isDev = value.env === DEVELOPMENT
value.isTest = value.env === TEST
value.isProd = value.env === PRODUCTION
value.fileReceiverSubscription = mqConfig.fileReceiverSubscription
value.storageConfig = storageConfig

module.exports = value
