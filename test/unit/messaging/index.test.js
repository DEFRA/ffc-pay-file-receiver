jest.mock('../../../app/messaging/service-bus', () => ({
  createServiceBusClient: (...args) => mockCreateServiceBusClient(...args),
  createReceiver: (...args) => mockCreateReceiver(...args),
  subscribeReceiver: (...args) => mockSubscribeReceiver(...args),
  closeSenders: (...args) => mockCloseSenders(...args)
}))

jest.mock('../../../app/messaging/process-file-message')

jest.mock('../../../app/keep-alive')

jest.mock('../../../app/config')

const mockCreateServiceBusClient = jest.fn()
const mockCreateReceiver = jest.fn()
const mockSubscribeReceiver = jest.fn()
const mockCloseSenders = jest.fn()
const mockSbClientClose = jest.fn()
const mockReceiver = { close: jest.fn() }

describe('messaging', () => {
  let messaging
  let config
  let mockKeepAlive
  let processFileMessage

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()

    config = require('../../../app/config')
    mockKeepAlive = require('../../../app/keep-alive').keepAlive
    processFileMessage = require('../../../app/messaging/process-file-message')
    messaging = require('../../../app/messaging')

    config.enabled = true
    config.fileReceiverSubscription = {
      address: 'test-subscription',
      topic: 'test-topic',
      type: 'subscription'
    }
    mockCreateServiceBusClient.mockReturnValue({ close: mockSbClientClose })
    mockCreateReceiver.mockReturnValue(mockReceiver)
  })

  describe('start', () => {
    test('creates Service Bus client if service enabled', async () => {
      await messaging.start()
      expect(mockCreateServiceBusClient).toHaveBeenCalledTimes(1)
      expect(mockCreateServiceBusClient).toHaveBeenCalledWith(config.fileReceiverSubscription)
    })

    test('creates receiver if service enabled', async () => {
      await messaging.start()
      expect(mockCreateReceiver).toHaveBeenCalledTimes(1)
      expect(mockCreateReceiver).toHaveBeenCalledWith(expect.any(Object), config.fileReceiverSubscription)
    })

    test('does not create Service Bus client if service disabled', async () => {
      config.enabled = false
      await messaging.start()
      expect(mockCreateServiceBusClient).not.toHaveBeenCalled()
    })

    test('does not create receiver if service disabled', async () => {
      config.enabled = false
      await messaging.start()
      expect(mockCreateReceiver).not.toHaveBeenCalled()
    })

    test('subscribes receiver if service enabled', async () => {
      await messaging.start()
      expect(mockSubscribeReceiver).toHaveBeenCalledTimes(1)
      expect(mockSubscribeReceiver).toHaveBeenCalledWith(
        mockReceiver,
        expect.any(Function),
        expect.any(Function),
        config.fileReceiverSubscription
      )
    })

    test('does not subscribe receiver if service disabled', async () => {
      config.enabled = false
      await messaging.start()
      expect(mockSubscribeReceiver).not.toHaveBeenCalled()
    })

    test('calls keep alive if service disabled', async () => {
      config.enabled = false
      await messaging.start()
      expect(mockKeepAlive).toHaveBeenCalledTimes(1)
    })

    test('message action calls processFileMessage with message and receiver', async () => {
      await messaging.start()
      const action = mockSubscribeReceiver.mock.calls[0][1]
      const message = { body: {} }
      await action(message, mockReceiver)
      expect(processFileMessage).toHaveBeenCalledWith(message, mockReceiver)
    })
  })

  describe('stop', () => {
    test('closes Service Bus client if started', async () => {
      await messaging.start()
      await messaging.stop()
      expect(mockSbClientClose).toHaveBeenCalledTimes(1)
    })

    test('calls closeSenders', async () => {
      await messaging.stop()
      expect(mockCloseSenders).toHaveBeenCalledTimes(1)
    })

    test('does not throw if client close fails', async () => {
      await messaging.start()
      mockSbClientClose.mockRejectedValue(new Error('close failed'))
      await expect(messaging.stop()).resolves.not.toThrow()
    })

    test('handles stop when start has not been called', async () => {
      await messaging.stop()
      expect(mockSbClientClose).not.toHaveBeenCalled()
      expect(mockCloseSenders).toHaveBeenCalledTimes(1)
    })
  })
})
