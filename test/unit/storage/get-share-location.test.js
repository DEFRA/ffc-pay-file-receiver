jest.mock('../../../app/config/get-storage-config')
const getStorageConfig = require('../../../app/config/get-storage-config')
const { getShareLocation } = require('../../../app/storage/get-share-location')

let retreivedGetStorageConfig

describe('get shared location object', () => {
  beforeEach(() => {
    retreivedGetStorageConfig = JSON.parse(JSON.stringify(require('../../mocks/storage-config')))
    getStorageConfig.mockResolvedValue(retreivedGetStorageConfig)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should call getStorageConfig', async () => {
    await getShareLocation()
    expect(getStorageConfig).toHaveBeenCalled()
  })
})
