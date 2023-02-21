jest.mock('../../../app/config/get-storage-config')
const getStorageConfig = require('../../../app/config/get-storage-config')

const mockStorageConfig = require('../../mocks/storage-config')
const mockDelete = jest.fn()
const mockGetFileClient = {
  delete: mockDelete
}
const mockGetDirectoryClient = {
  getFileClient: jest.fn().mockReturnValue(mockGetFileClient)
}
const mockGetShareClient = {
  getDirectoryClient: jest.fn().mockReturnValue(mockGetDirectoryClient)
}

const mockGetShareSeviceClient = {
  getShareClient: jest.fn().mockReturnValue(mockGetShareClient)
}

jest.mock('../../../app/storage', () => {
  return {
    getShareSeviceClient: jest.fn().mockReturnValue(mockGetShareSeviceClient)
  }
})

const deleteFile = require('../../../app/processing/delete-file')

const mockParsedMessage = require('../../mocks/parsed-message')
const { fileName, directoryName, shareName } = mockParsedMessage

describe('Process file from storage share file', () => {
  beforeEach(() => {
    getStorageConfig.mockReturnValue(mockStorageConfig)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('Search and delete file', () => {
    beforeEach(() => {
    })

    test('confirm file is deleted', async () => {
      await deleteFile(fileName, directoryName, shareName)

      expect(mockDelete).toHaveBeenCalled()
    })
  })
})
