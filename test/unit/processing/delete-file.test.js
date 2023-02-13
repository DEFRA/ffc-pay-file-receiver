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
                      delete: mockDeleteAction
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

const deleteFile = require('../../../app/processing/delete-file')

const mockParsedMessage = require('../../mocks/parsed-message')
const { fileName, directoryName, shareName } = mockParsedMessage

let mockDeleteAction

describe('Process file from storage share file', () => {
  beforeEach(() => {
    mockDeleteAction = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('Search and delete file', () => {
    beforeEach(() => {
    })

    test('confirm file is deleted', async () => {
      await deleteFile(fileName, directoryName, shareName)
      expect(mockDeleteAction).toHaveBeenCalled()
    })
  })
})
