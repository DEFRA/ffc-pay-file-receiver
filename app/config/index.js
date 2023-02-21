const Joi = require('joi')
const mqConfig = require('./message')
const getStorageConfig = require('./get-storage-config')

const schema = Joi.object({
  env: Joi.string().valid('development', 'test', 'production').default('development'),
  totalRetries: Joi.number().default(10),
  retryInterval: Joi.number().default(1000)
})

const config = {
  env: process.env.NODE_ENV,
  totalRetries: process.env.TOTAL_RETRIES,
  retryInterval: process.env.RETRY_INTERVAL
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

const value = result.value

const storageConfig = getStorageConfig()

value.isDev = value.env === 'development'
value.isTest = value.env === 'test'
value.isProd = value.env === 'production'
value.fileReceiverSubscription = mqConfig.fileReceiverSubscription
value.storageConfig = storageConfig

module.exports = value
