const config = require('../config')
const processFileMessage = require('./process-file-message')
const { MessageReceiver } = require('ffc-messaging')
let messageReceiver

const start = async () => {
  const messageAction = message => processFileMessage(message, messageReceiver)
  messageReceiver = new MessageReceiver(config.fileReceiverSubscription, messageAction)
  await messageReceiver.subscribe()

  console.info('Ready to transfer file')
}

const stop = async () => {
  await messageReceiver.closeConnection()
}

module.exports = { start, stop }
