jest.mock('../../app/messaging')
const mockMessaging = require('../../app/messaging')

jest.mock('../../app//storage')
const storage = require('../../app/storage')

describe('app', () => {
  beforeEach(() => {
    require('../../app')
  })

  test('starts messaging', async () => {
    expect(mockMessaging.start).toHaveBeenCalled()
  })

  test('initialise storage', async () => {
    expect(storage.initialiseContainers).toHaveBeenCalled()
  })
})
