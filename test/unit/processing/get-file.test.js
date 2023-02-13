jest.mock('@azure/storage-file-share', () => {
  return {
    ShareServiceClient: {
      fromConnectionString: jest.fn().mockImplementation(() => {
        return {
          getShareClient: jest.fn().mockImplementation(() => {
            return {
              getDirectoryClient: jest.fn().mockImplementation(() => {
                return {
                  getFileClient: jest.fn().mockImplementation(() => {
                    return {
                      download: mockDownload
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  }
})

const getFile = require('../../../app/processing/get-file')

const mockParsedMessage = require('../../mocks/parsed-message')
const { fileName, directoryName, shareName } = mockParsedMessage
const fileContent = 'payment details'

let mockDownload

describe('Process file from storage share file', () => {
  beforeEach(() => {
    mockDownload = jest.fn().mockReturnValue({
      readableStreamBody: fileContent
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('Search and download file', () => {
    beforeEach(() => {
    })

    test('confirm file is downloaded', async () => {
      const file = await getFile(fileName, directoryName, shareName)
      expect(file).toBe(fileContent)
    })
  })
})
