jest.mock('@azure/storage-blob', () => {
  return {
    BlobServiceClient: {
      fromConnectionString: jest.fn().mockImplementation(() => {
        return {
          getContainerClient: jest.fn().mockImplementation(() => {
            return {
              createIfNotExists: jest.fn(),
              getBlockBlobClient: jest.fn().mockImplementation(() => {
                return {
                  upload: mockUploadAction
                }
              })
            }
          })
        }
      })
    }
  }
})

const writeFile = require('../../../app/processing/write-file')

const mockParsedMessage = require('../../mocks/parsed-message')
const { fileName } = mockParsedMessage
const fileContent = 'test file content'

let mockUploadAction

describe('Process file from storage share file', () => {
  beforeEach(() => {
    mockUploadAction = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('Upload file to blob storage', () => {
    beforeEach(() => {
    })

    test('confirm file is uploaded', async () => {
      await writeFile(fileName, fileContent)
      expect(mockUploadAction).toHaveBeenCalled()
    })
  })
})
