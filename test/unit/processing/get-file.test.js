jest.mock('../../../app/config/get-storage-config')
const getStorageConfig = require('../../../app/config/get-storage-config')
const mockFileContent = 'payment details'
const mockStorageConfig = require('../../mocks/storage-config')
const mockDelete = jest.fn()

const mockGetFileClient = {
  download: jest.fn().mockResolvedValue({ readableStreamBody: mockFileContent }),
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
const getFile = require('../../../app/processing/get-file')

const mockParsedMessage = require('../../mocks/parsed-message')
const { fileName, directoryName, shareName } = mockParsedMessage

describe('Process file from storage share file', () => {
  beforeEach(() => {
    getStorageConfig.mockReturnValue(mockStorageConfig)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('Search and download file', () => {
    beforeEach(() => {
    })

    test('confirm file is downloaded', async () => {
      const file = await getFile(fileName, directoryName, shareName)
      expect(file).toBe(mockFileContent)
    })
  })
})
