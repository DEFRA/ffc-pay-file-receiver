const parseMessage = require('../../../app/messaging/parse-message')

const mockTransferredMessage = require('../../mocks/transferred-message')
const mockParsedMessage = require('../../mocks/parsed-message')

describe('Process file from storage share file', () => {
  beforeEach(() => {
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('Search and download file', () => {
    beforeEach(() => {
    })

    test('confirm message is parsed', () => {
      const parsedMessage = parseMessage(mockTransferredMessage)
      expect(parsedMessage).toStrictEqual(mockParsedMessage)
    })
  })
})
