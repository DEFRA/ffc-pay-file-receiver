const { MessageReceiver } = require('ffc-messaging')
const config = require('../config')
const processFileMessage = require('./process-file-message')
const { keepAlive } = require('../keep-alive')
const { sendFailureEvent } = require('../event')
let messageReceiver

const start = async () => {
  if (config.enabled) {
    const messageAction = message => processFileMessage(message, messageReceiver)
    messageReceiver = new MessageReceiver(config.fileReceiverSubscription, messageAction)
    const messageError = (args) => {
      console.error(args.error)
      sendFailureEvent(undefined, args.error)
    }
    await messageReceiver.subscribe(messageError)

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
