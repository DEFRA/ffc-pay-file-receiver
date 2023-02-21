jest.mock('../../../app/config/schema/storage-config-schema')
const schema = require('../../../app/config/schema/storage-config-schema')

const getStorageConfig = require('../../../app/config/get-storage-config')

let retrievedStorageConfig

describe('get and transform payment request information for building a statement object', () => {
  beforeEach(() => {
    retrievedStorageConfig = JSON.parse(JSON.stringify(require('../../../test/mocks/storage-config')))
    schema.validate.mockReturnValue({ value: retrievedStorageConfig })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should call schema.validate when a paymentRequest is given', async () => {
    await getStorageConfig()
    expect(schema.validate).toHaveBeenCalled()
  })

  test('should call schema.validate once when a paymentRequest is given', async () => {
    await getStorageConfig()
    expect(schema.validate).toHaveBeenCalledTimes(1)
  })

  test('should throw when schema.validate returns with error key', async () => {
    schema.validate.mockReturnValue({ error: 'Not a valid object' })

    const wrapper = async () => {
      await getStorageConfig()
    }

    expect(wrapper).rejects.toThrow()
  })

  test('should throw Error when schema.validate returns with error key', async () => {
    schema.validate.mockReturnValue({ error: 'Not a valid object' })

    const wrapper = async () => {
      await getStorageConfig()
    }

    expect(wrapper).rejects.toThrow(Error)
  })

  test('should throw error which starts "The storage config is invalid" when schema.validate returns with error key of "Joi validation issue"', async () => {
    schema.validate.mockReturnValue({ error: 'Not a valid object' })

    const wrapper = async () => {
      await getStorageConfig()
    }

    expect(wrapper).rejects.toThrow(/The storage config is invalid/)
  })
})
