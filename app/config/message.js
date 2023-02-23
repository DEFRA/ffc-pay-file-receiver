const Joi = require('joi')

const mqSchema = Joi.object({
  messageQueue: {
    host: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
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
    useCredentialChain: process.env.NODE_ENV === 'production',
    appInsights: process.env.NODE_ENV === 'production' ? require('applicationinsights') : undefined
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
