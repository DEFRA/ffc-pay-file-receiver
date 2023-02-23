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

let retreivedGetStorageConfig

describe('get container object', () => {
  beforeEach(() => {
    retreivedGetStorageConfig = JSON.parse(JSON.stringify(require('../../../../mocks/storage-config')))
    getStorageConfig.mockResolvedValue(retreivedGetStorageConfig)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should call getStorageConfig', async () => {
    retreivedGetStorageConfig.useBlobConnectionStr = true
    getStorageConfig.mockResolvedValue(retreivedGetStorageConfig)
    await getContainer()
    expect(getStorageConfig).toHaveBeenCalled()
  })
})
