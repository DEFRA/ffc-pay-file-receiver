const util = require('util')
const validateMessage = require('./validate-message')
const { VALIDATION } = require('../errors')
const parseMessage = require('./parse-message')
const transferFile = require('../transfer-file')

const processMessage = async (message, receiver) => {
  try {
    console.log('Message received:', util.inspect(message, false, null, true))
    validateMessage(message)
    const { fileName, filePath, shareName } = parseMessage(message)
    await transferFile(shareName, filePath, fileName)

    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process statement:', err)
    if (err.category === VALIDATION) {
      await receiver.deadLetterMessage(message)
    }
  }
}

module.exports = processMessage
