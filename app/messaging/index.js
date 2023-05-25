const { MessageReceiver } = require('ffc-messaging')
const config = require('../config')
const processFileMessage = require('./process-file-message')
const { keepAlive } = require('../keep-alive')
let messageReceiver

const start = async () => {
  if (config.enabled) {
    const messageAction = message => processFileMessage(message, messageReceiver)
    messageReceiver = new MessageReceiver(config.fileReceiverSubscription, messageAction)
    await messageReceiver.subscribe()

    console.info('Ready to transfer file')
  } else {
    console.info('File transfers are disabled in this environment')
    keepAlive()
  }
}

const stop = async () => {
  if (config.enabled) {
    await messageReceiver.closeConnection()
  }
}

module.exports = { start, stop }
