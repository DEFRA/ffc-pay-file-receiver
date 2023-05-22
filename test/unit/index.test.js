jest.mock('../../app/config')
const config = require('../../app/config')

jest.mock('../../app/messaging')
const mockMessaging = require('../../app/messaging')

jest.mock('../../app/storage/initialize-container')
const storage = require('../../app/storage/initialize-container')

describe('app', () => {
  beforeEach(() => {
    config.enabled = true
    require('../../app')
  })

  test('starts messaging if messaging enabled', async () => {
    expect(mockMessaging.start).toHaveBeenCalled()
  })

  test('does not start messaging if messaging disabled', async () => {
    config.enabled = false
    expect(mockMessaging.start).not.toHaveBeenCalled()
  })

  test('initialise storage', async () => {
    expect(storage.initialiseContainers).toHaveBeenCalled()
  })
})
