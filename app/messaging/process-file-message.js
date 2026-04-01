const util = require('util')
const validateMessage = require('./validate-message')
const parseMessage = require('./parse-message')
const transferFile = require('../processing/transfer-file')
const { VALIDATION } = require('../constants/errors')
const { sendFailureEvent } = require('../event')

const processFileMessage = async (message, receiver) => {
  let fileMessage

  try {
    fileMessage = message.body

    console.log('[processFileMessage] Message received:', util.inspect(fileMessage, false, null, true))

    validateMessage(fileMessage)

    const { fileName, directoryName, shareName } = parseMessage(fileMessage)

    await transferFile(fileName, directoryName, shareName)

    console.log('[processFileMessage] File processed successfully')

    await receiver.completeMessage(message)
  } catch (err) {
    console.error('[processFileMessage] Processing failed:', {
      message: err.message,
      stack: err.stack
    })

    // --- SAFELY extract filename ---
    const filename =
      fileMessage?.OutputFileName ||
      fileMessage?.fileName ||
      'unknown-file'

    console.log('[processFileMessage] Sending failure event for:', filename)

    // --- NEVER let this throw ---
    try {
      await sendFailureEvent(err, filename)
    } catch (eventErr) {
      console.error('[processFileMessage] Failure event also failed:', {
        message: eventErr.message
      })
    }

    // --- MESSAGE HANDLING ---
    try {
      if (err.category === VALIDATION) {
        console.log('[processFileMessage] Dead lettering message (validation error)')
        await receiver.deadLetterMessage(message)
      } else {
        console.log('[processFileMessage] Abandoning message for retry')
        await receiver.abandonMessage(message)
      }
    } catch (settleErr) {
      console.error('[processFileMessage] Failed to settle message:', {
        message: settleErr.message
      })
    }
  }
}

module.exports = processFileMessage
