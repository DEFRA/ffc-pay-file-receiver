const util = require('util')
const validateMessage = require('./validate-message')
const { VALIDATION } = require('../errors')
const parseMessage = require('./parse-message')
const transferFile = require('../processing/transfer-file')

const processFileMessage = async (message, receiver) => {
  try {
    const fileMessage = message.body
    console.log('Message received:', util.inspect(fileMessage, false, null, true))
    validateMessage(fileMessage)
    const { fileName, directoryName, shareName } = parseMessage(fileMessage)
    await transferFile(fileName, directoryName, shareName)

    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    if (err.category === VALIDATION) {
      await receiver.deadLetterMessage(message)
    }
  }
}

module.exports = processFileMessage
