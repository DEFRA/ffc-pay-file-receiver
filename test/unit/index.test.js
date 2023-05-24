jest.mock('../../app/messaging')
const mockMessaging = require('../../app/messaging')

jest.mock('../../app/storage/initialize-container')
const storage = require('../../app/storage/initialize-container')

describe('app', () => {
  beforeEach(() => {
    require('../../app')
  })

  test('starts messaging if messaging enabled', async () => {
    expect(mockMessaging.start).toHaveBeenCalled()
  })

  test('initialise storage', async () => {
    expect(storage.initialiseContainers).toHaveBeenCalled()
  })
})
