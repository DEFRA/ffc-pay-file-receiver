const mockBlobServiceClient = {
  getContainerClient: jest.fn().mockReturnValue(undefined)
}

jest.mock('@azure/storage-blob', () => {
  return {
    BlobServiceClient: {
      fromConnectionString: jest.fn().mockReturnValue(mockBlobServiceClient)
    }
  }
})

jest.mock('../../../../../app/config/get-storage-config')
const getStorageConfig = require('../../../../../app/config/get-storage-config')
const { getContainer } = require('../../../../../app/storage/get-container')

let retrievedGetStorageConfig

describe('get container object', () => {
  beforeEach(() => {
    retrievedGetStorageConfig = JSON.parse(JSON.stringify(require('../../../../mocks/storage-config')))
    getStorageConfig.mockResolvedValue(retrievedGetStorageConfig)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should call getStorageConfig', async () => {
    retrievedGetStorageConfig.useBlobConnectionStr = true
    getStorageConfig.mockResolvedValue(retrievedGetStorageConfig)
    await getContainer()
    expect(getStorageConfig).toHaveBeenCalled()
  })
})
