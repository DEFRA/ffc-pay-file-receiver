const config = require('../config')
const { EventPublisher } = require('ffc-pay-event-publisher')
const { SOURCE } = require('../constants/source')
const { RECEIVER_CONNECTION_FAILED } = require('../constants/events')

const sendFailureEvent = async (filename, error) => {
  if (config.useEvents) {
    const event = {
      source: SOURCE,
      type: RECEIVER_CONNECTION_FAILED,
      subject: filename,
      data: {
        message: error.message
      }
    }
    const eventPublisher = new EventPublisher(config.eventsTopic)
    await eventPublisher.publishEvent(event)
  }
}

module.exports = sendFailureEvent
