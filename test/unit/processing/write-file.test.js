jest.mock('../../../app/config/get-storage-config')
const getStorageConfig = require('../../../app/config/get-storage-config')

const mockStorageConfig = require('../../mocks/storage-config')
const mockUpload = jest.fn()
const mockGetBlockBlobClient = {
  upload: mockUpload
}

const mockGetContainer = {
  getBlockBlobClient: jest.fn().mockReturnValue(mockGetBlockBlobClient)
}

jest.mock('../../../app/storage', () => {
  return {
    getContainer: jest.fn().mockReturnValue(mockGetContainer),
    getInboundFolder: jest.fn().mockReturnValue(undefined)
  }
})

const writeFile = require('../../../app/processing/write-file')

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
      await writeFile(fileName, directoryName, shareName)

      expect(mockUpload).toHaveBeenCalled()
    })
  })
})
