jest.useFakeTimers()

const { keepAlive } = require('../../app/keep-alive')

describe('keep alive', () => {
  test('should call setInterval', () => {
    keepAlive()
    expect(setInterval).toHaveBeenCalled()
  })
})
