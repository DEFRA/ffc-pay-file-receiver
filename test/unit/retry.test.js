jest.mock('../../app/config/get-storage-config')
const getStorageConfig = require('../../app/config/get-storage-config')

const mockStorageConfig = require('../mocks/storage-config')
const retry = require('../../app/retry')
let mockFunction

describe('retry', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    getStorageConfig.mockReturnValue(mockStorageConfig)
    mockFunction = jest.fn().mockResolvedValue('success')
  })

  test('calls function', async () => {
    await retry(mockFunction)
    expect(mockFunction).toHaveBeenCalled()
  })

  test('calls function once if successful', async () => {
    await retry(mockFunction)
    expect(mockFunction).toHaveBeenCalledTimes(1)
  })

  test('retries function call up to maximum retries', async () => {
    mockFunction.mockRejectedValue('error')
    try {
      await retry(mockFunction, 1)
    } catch {}
    expect(mockFunction).toHaveBeenCalledTimes(2)
  })
})
