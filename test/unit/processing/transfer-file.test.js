jest.mock('../../../app/config/get-storage-config')
const getStorageConfig = require('../../../app/config/get-storage-config')

jest.mock('../../../app/processing/delete-file')
const deleteFile = require('../../../app/processing/delete-file')

jest.mock('../../../app/processing/get-file')
const getFile = require('../../../app/processing/get-file')

jest.mock('../../../app/processing/write-file')
const writeFile = require('../../../app/processing/write-file')

const transferFile = require('../../../app/processing/transfer-file')

const mockStorageConfig = require('../../mocks/storage-config')

const mockParsedMessage = require('../../mocks/parsed-message')
const { fileName, directoryName, shareName } = mockParsedMessage

describe('Process transfer file', () => {
  beforeEach(() => {
    getStorageConfig.mockResolvedValue(mockStorageConfig)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('Check download, upload and delete process', () => {
    test('calls getFile', async () => {
      await transferFile(fileName, directoryName, shareName)
      expect(getFile).toHaveBeenCalled()
    })

    test('calls writeFile', async () => {
      await transferFile(fileName, directoryName, shareName)
      expect(writeFile).toHaveBeenCalled()
    })

    test('calls deleteFile', async () => {
      await transferFile(fileName, directoryName, shareName)
      expect(deleteFile).toHaveBeenCalled()
    })
  })
})
