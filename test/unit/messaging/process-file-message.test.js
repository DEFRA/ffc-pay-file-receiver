jest.mock('../../../app/messaging/validate-message')
const validateMessage = require('../../../app/messaging/validate-message')

jest.mock('../../../app/messaging/parse-message')
const parseMessage = require('../../../app/messaging/parse-message')

jest.mock('../../../app/processing/transfer-file')
const transferFile = require('../../../app/processing/transfer-file')

const processFileMessage = require('../../../app/messaging/process-file-message')
const { VALIDATION } = require('../../../app/errors')

const mockParsedMessage = require('../../mocks/parsed-message')
const mockTransferMessage = require('../../mocks/transferred-message')

let receiver
let message

describe('Process file message', () => {
  beforeEach(() => {
    receiver = {
      completeMessage: jest.fn(),
      deadLetterMessage: jest.fn()
    }
    parseMessage.mockResolvedValue(mockParsedMessage)
    transferFile.mockResolvedValue(undefined)
    validateMessage.mockReturnValue({ value: 'a' })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('When successful message', () => {
    beforeEach(() => {
      message = {
        body: mockTransferMessage
      }
    })

    test('completes message on success', async () => {
      await processFileMessage(message, receiver)
      expect(receiver.completeMessage).toHaveBeenCalledWith(message)
    })

    test('completes message on success only once', async () => {
      await processFileMessage(message, receiver)
      expect(receiver.completeMessage).toHaveBeenCalledTimes(1)
    })

    test('calls validateMessage only once', async () => {
      await processFileMessage(message, receiver)
      expect(validateMessage).toHaveBeenCalledTimes(1)
    })

    test('calls validateMessage', async () => {
      await processFileMessage(message, receiver)
      expect(validateMessage).toHaveBeenCalledWith(message.body)
    })

    test('calls transferFile with request only once', async () => {
      await processFileMessage(message, receiver)
      expect(transferFile).toHaveBeenCalledTimes(1)
    })

    test('calls parseMessage only once', async () => {
      await processFileMessage(message, receiver)
      expect(parseMessage).toHaveBeenCalledTimes(1)
    })

    test('calls parseMessage with message body', async () => {
      await processFileMessage(message, receiver)
      expect(parseMessage).toHaveBeenCalledWith(message.body)
    })
  })

  describe('When unsuccessful message is non-validation issue', () => {
    beforeEach(() => {
      transferFile.mockRejectedValue(new Error('Unable to process message'))
    })

    test('does not complete message', async () => {
      await processFileMessage(message, receiver)
      expect(receiver.completeMessage).not.toHaveBeenCalled()
    })

    test('does not dead letter message', async () => {
      await processFileMessage(message, receiver)
      expect(receiver.deadLetterMessage).not.toHaveBeenCalled()
    })
  })

  describe('When unsuccessful message is validation issue', () => {
    beforeEach(() => {
      const error = new Error('Invalid request')
      error.category = VALIDATION
      validateMessage.mockImplementation(() => { throw error })
    })

    test('dead letters message', async () => {
      await processFileMessage(message, receiver)
      expect(receiver.deadLetterMessage).toHaveBeenCalledWith(message)
    })

    test('dead letters message only once', async () => {
      await processFileMessage(message, receiver)
      expect(receiver.deadLetterMessage).toHaveBeenCalledTimes(1)
    })

    test('does not complete message', async () => {
      await processFileMessage(message, receiver)
      expect(receiver.completeMessage).not.toHaveBeenCalled()
    })
  })
})
