const config = require('../config')
const { createServiceBusClient, createReceiver, subscribeReceiver, closeSenders } = require('./service-bus')
const processFileMessage = require('./process-file-message')
const { keepAlive } = require('../keep-alive')

let sbClient
let messageReceiver

const start = async () => {
  if (config.enabled) {
    sbClient = createServiceBusClient(config.fileReceiverSubscription)
    messageReceiver = createReceiver(sbClient, config.fileReceiverSubscription)
    const messageAction = (message, receiver) => processFileMessage(message, receiver)
    const errorHandler = (err) => console.error('Error receiving message:', err)

    subscribeReceiver(messageReceiver, messageAction, errorHandler, config.fileReceiverSubscription)

    console.info('Ready to transfer file')
  } else {
    console.info('File transfers are disabled in this environment')
    keepAlive()
  }
}

const stop = async () => {
  if (sbClient) {
    try {
      await sbClient.close()
    } catch (err) {
      console.error('Error closing Service Bus client:', err)
    }
    sbClient = null
  }
  await closeSenders()
  messageReceiver = null
}

module.exports = { start, stop }
