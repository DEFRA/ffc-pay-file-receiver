const mockPublishEvent = jest.fn()

const MockEventPublisher = jest.fn().mockImplementation(() => {
  return {
    publishEvent: mockPublishEvent
  }
})

jest.mock('ffc-pay-event-publisher', () => {
  return {
    EventPublisher: MockEventPublisher
  }
})

jest.mock('../../../app/config')
const config = require('../../../app/config')

const { RECEIVER_CONNECTION_FAILED } = require('../../../app/constants/events')
const { SOURCE } = require('../../../app/constants/source')
const filename = require('../../mocks/file-name')
const error = require('../../mocks/error')

const sendFailureEvent = require('../../../app/event/send-failure-event')

describe('publishing events', () => {
  beforeEach(() => {
    config.useEvents = true
    config.eventsTopic = 'events'
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should send event if events enabled', async () => {
    await sendFailureEvent(error, filename)
    expect(mockPublishEvent).toHaveBeenCalled()
  })

  test('should not send event if events disabled', async () => {
    config.useEvents = false
    await sendFailureEvent(error, filename)
    expect(mockPublishEvent).not.toHaveBeenCalled()
  })

  test('should send event to correct topic', async () => {
    await sendFailureEvent(error, filename)
    expect(MockEventPublisher.mock.calls[0][0]).toBe(config.eventsTopic)
  })

  test('should raise an event with file-receiver source', async () => {
    await sendFailureEvent(error, filename)
    expect(mockPublishEvent.mock.calls[0][0].source).toBe(SOURCE)
  })

  test('should raise correct event type', async () => {
    await sendFailureEvent(error, filename)
    expect(mockPublishEvent.mock.calls[0][0].type).toBe(RECEIVER_CONNECTION_FAILED)
  })
})
