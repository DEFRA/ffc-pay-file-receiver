jest.useFakeTimers()

const setIntervalSpy = jest.spyOn(global, 'setInterval')

const { keepAlive } = require('../../app/keep-alive')

describe('keep alive', () => {
  test('should call setInterval', () => {
    keepAlive()
    expect(setIntervalSpy).toHaveBeenCalled()
  })
})
