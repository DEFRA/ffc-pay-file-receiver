const Joi = require('joi')
const { PRODUCTION } = require('../constants/environments')

const mqSchema = Joi.object({
  messageQueue: {
    host: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    connectionString: Joi.string(),
    useCredentialChain: Joi.bool().default(false),
    appInsights: Joi.object()
  },
  fileReceiverSubscription: {
    address: Joi.string(),
    topic: Joi.string(),
    type: Joi.string().default('subscription')
  }
})

const mqConfig = {
  messageQueue: {
    host: process.env.MESSAGE_QUEUE_HOST,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD,
    connectionString: process.env.MESSAGE_QUEUE_CONNECTION_STRING,
    useCredentialChain: process.env.MESSAGE_USE_CREDENTIAL_CHAIN,
    appInsights: process.env.NODE_ENV === PRODUCTION ? require('applicationinsights') : undefined
  },
  fileReceiverSubscription: {
    address: process.env.FILECONSUME_SUBSCRIPTION_ADDRESS,
    topic: process.env.FILECONSUME_TOPIC_ADDRESS,
    type: 'subscription'
  }
}

const mqResult = mqSchema.validate(mqConfig, {
  abortEarly: false
})

if (mqResult.error) {
  throw new Error(`The message queue config is invalid. ${mqResult.error.message}`)
}

const fileReceiverSubscription = { ...mqResult.value.messageQueue, ...mqResult.value.fileReceiverSubscription }

module.exports = {
  fileReceiverSubscription
}
