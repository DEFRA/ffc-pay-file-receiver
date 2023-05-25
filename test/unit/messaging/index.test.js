const mockSubscribe = jest.fn()
const mockCloseConnection = jest.fn()

const MockMessageReceiver = jest.fn().mockImplementation(() => {
  return {
    subscribe: mockSubscribe,
    closeConnection: mockCloseConnection
  }
})

jest.mock('ffc-messaging', () => {
  return {
    MessageReceiver: MockMessageReceiver
  }
})

jest.mock('../../../app/messaging/process-file-message')

const config = require('../../../app/config')

const { start, stop } = require('../../../app/messaging')

beforeEach(() => {
  jest.clearAllMocks()

  config.enabled = true
})

describe('messaging start', () => {
  test('creates new message receiver if service enabled', async () => {
    await start()
    expect(MockMessageReceiver).toHaveBeenCalledTimes(1)
  })

  test('does not create new message receiver if service disabled', async () => {
    config.enabled = false
    await start()
    expect(MockMessageReceiver).toHaveBeenCalledTimes(0)
  })

  test('subscribes to message receiver if service enabled', async () => {
    await start()
    expect(mockSubscribe).toHaveBeenCalledTimes(1)
  })

  test('does not subscribe to message receiver if service disabled', async () => {
    config.enabled = false
    await start()
    expect(mockSubscribe).toHaveBeenCalledTimes(0)
  })
})

describe('messaging stop', () => {
  test('closes connection if service enabled', async () => {
    await stop()
    expect(mockCloseConnection).toHaveBeenCalledTimes(1)
  })

  test('does not close connection if service disabled', async () => {
    config.enabled = false
    await stop()
    expect(mockCloseConnection).toHaveBeenCalledTimes(0)
  })
})
