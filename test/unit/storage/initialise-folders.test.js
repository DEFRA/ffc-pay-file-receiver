jest.mock('../../../app/config/get-storage-config')
const getStorageConfig = require('../../../app/config/get-storage-config')
jest.mock('../../../app/storage/get-container')
const { getContainer } = require('../../../app/storage/get-container')
const { initialiseFolders } = require('../../../app/storage/initialise-folders')

let retreivedGetStorageConfig

describe('get and transform payment request information for building a statement object', () => {
  beforeEach(() => {
    retreivedGetStorageConfig = JSON.parse(JSON.stringify(require('../../mocks/storage-config')))
    getStorageConfig.mockResolvedValue(retreivedGetStorageConfig)
    const mockUpload = jest.fn()
    const mockGetBlockBlobClient = {
      upload: mockUpload
    }

    const mockGetContainer = {
      getBlockBlobClient: jest.fn().mockReturnValue(mockGetBlockBlobClient)
    }
    getContainer.mockResolvedValue(mockGetContainer)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should call getStorageConfig', async () => {
    await initialiseFolders()
    expect(getStorageConfig).toHaveBeenCalled()
  })
})
