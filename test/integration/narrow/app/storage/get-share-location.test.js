jest.mock('@azure/storage-file-share', () => {
  return {
    ShareServiceClient: {
      fromConnectionString: jest.fn().mockReturnValue(undefined)
    }
  }
})

jest.mock('../../../../../app/config/get-storage-config')
const getStorageConfig = require('../../../../../app/config/get-storage-config')
const { getShareLocation } = require('../../../../../app/storage/get-share-location')

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
    retreivedGetStorageConfig.useShareConnectionStr = true
    getStorageConfig.mockResolvedValue(retreivedGetStorageConfig)
    await getShareLocation()
    expect(getStorageConfig).toHaveBeenCalled()
  })
})
