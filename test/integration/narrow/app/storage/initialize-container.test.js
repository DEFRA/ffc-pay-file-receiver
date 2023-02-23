jest.mock('../../../../../app/config/get-storage-config')
const getStorageConfig = require('../../../../../app/config/get-storage-config')
jest.mock('../../../../../app/storage/initialise-folders')

const mockGetContainer = {
  createIfNotExists: jest.fn().mockReturnValue(undefined)
}

jest.mock('../../../../../app/storage/get-container', () => {
  return {
    getContainer: jest.fn().mockReturnValue(mockGetContainer)
  }
})
const { initialiseFolders } = require('../../../../../app/storage/initialise-folders')
const { initialiseContainers } = require('../../../../../app/storage/initialize-container')

let retreivedGetStorageConfig

describe('get and transform payment request information for building a statement object', () => {
  beforeEach(() => {
    retreivedGetStorageConfig = JSON.parse(JSON.stringify(require('../../../../mocks/storage-config')))
    const mockFileContent = 'payment details'
    const mockDelete = jest.fn()

    const mockGetFileClient = {
      download: jest.fn().mockResolvedValue({ readableStreamBody: mockFileContent }),
      delete: mockDelete
    }
    initialiseFolders.mockResolvedValue(mockGetFileClient)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should call getStorageConfig when create container is true', async () => {
    retreivedGetStorageConfig.createContainers = true
    getStorageConfig.mockResolvedValue(retreivedGetStorageConfig)
    await initialiseContainers()
    expect(getStorageConfig).toHaveBeenCalled()
  })
})
