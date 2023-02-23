jest.mock('../../app/config/get-storage-config')
const getStorageConfig = require('../../app/config/get-storage-config')

jest.mock('../../app/messaging')
const mockMessaging = require('../../app/messaging')

jest.mock('../../app/storage/initialize-container')
const storage = require('../../app/storage/initialize-container')

const mockStorageConfig = require('../mocks/storage-config')

describe('app', () => {
  beforeEach(() => {
    getStorageConfig.mockReturnValue(mockStorageConfig)
    require('../../app')
  })

  test('starts messaging', async () => {
    expect(mockMessaging.start).toHaveBeenCalled()
  })

  test('initialise storage', async () => {
    expect(storage.initialiseContainers).toHaveBeenCalled()
  })
})
