const validateMessage = require('./validate-message')
const parseMessage = require('./parse-message')
const transferFile = require('../processing/transfer-file')
const { VALIDATION } = require('../constants/errors')
const { sendFailureEvent } = require('../event')

const processFileMessage = async (message, receiver) => {
  try {
    const fileMessage = message.body
    validateMessage(fileMessage)
    const { fileName, directoryName, shareName } = parseMessage(fileMessage)
    console.log(`Message received: ${fileName} from ${shareName}`)
    await transferFile(fileName, directoryName, shareName)

    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await sendFailureEvent(err, message.OutputFileName)
    if (err.category === VALIDATION) {
      await receiver.deadLetterMessage(message)
    }
  }
}

module.exports = processFileMessage
