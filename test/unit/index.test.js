const config = require('../../app/config')

jest.mock('../../app/messaging')
const mockMessaging = require('../../app/messaging')

jest.mock('../../app/storage/initialize-container')
const storage = require('../../app/storage/initialize-container')

describe('app when enabled', () => {
  beforeEach(() => {
    config.enabled = true
    require('../../app')
  })

  test('starts messaging if messaging enabled', async () => {
    expect(mockMessaging.start).toHaveBeenCalled()
  })

  test('initialise storage', async () => {
    expect(storage.initialiseContainers).toHaveBeenCalled()
  })
})

describe('app when disabled', () => {
  beforeEach(() => {
    config.enabled = false
    require('../../app')
  })

  test('does not start messaging if disabled', async () => {
    expect(mockMessaging.start).not.toHaveBeenCalled()
  })

  test('does not initialise storage if disabled', async () => {
    expect(storage.initialiseContainers).not.toHaveBeenCalled()
  })
})
