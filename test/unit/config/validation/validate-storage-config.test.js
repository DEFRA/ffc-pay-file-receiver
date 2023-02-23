jest.mock('../../../../app/config/schema/storage-config-schema')
const schema = require('../../../../app/config/schema/storage-config-schema')

const validateStorageConfig = require('../../../../app/config/validation/validate-storage-config')

let retrievedStorageConfig

describe('validate storageConfig', () => {
  beforeEach(() => {
    retrievedStorageConfig = JSON.parse(JSON.stringify(require('../../../mocks/storage-config')))

    schema.validate.mockReturnValue({ value: retrievedStorageConfig })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should return storageConfig', async () => {
    const result = validateStorageConfig(retrievedStorageConfig)
    expect(result).toBe(retrievedStorageConfig)
  })

  test('should throw when schema.validate throws', async () => {
    schema.validate.mockImplementation(() => { throw new Error('Joi validation issue') })

    const wrapper = async () => {
      validateStorageConfig(retrievedStorageConfig)
    }

    expect(wrapper).rejects.toThrow()
  })

  test('should throw Error when schema.validate throws Error', async () => {
    schema.validate.mockImplementation(() => { throw new Error('Joi validation issue') })

    const wrapper = async () => {
      validateStorageConfig(retrievedStorageConfig)
    }

    expect(wrapper).rejects.toThrow(Error)
  })

  test('should throw error "Joi validation issue" when schema.validate throws with "Joi validation issue"', async () => {
    schema.validate.mockImplementation(() => { throw new Error('Joi validation issue') })

    const wrapper = async () => {
      validateStorageConfig(retrievedStorageConfig)
    }

    expect(wrapper).rejects.toThrow(/^Joi validation issue$/)
  })

  test('should throw when schema.validate returns with error key', async () => {
    schema.validate.mockReturnValue({ error: 'Not a valid object' })

    const wrapper = async () => {
      validateStorageConfig(retrievedStorageConfig)
    }

    expect(wrapper).rejects.toThrow()
  })

  test('should throw Error when schema.validate returns with error key', async () => {
    schema.validate.mockReturnValue({ error: 'Not a valid object' })

    const wrapper = async () => {
      validateStorageConfig(retrievedStorageConfig)
    }

    expect(wrapper).rejects.toThrow(Error)
  })

  test('should throw error which has in it "The storage config is invalid" when schema.validate returns with error key of "Not a valid calculation"', async () => {
    schema.validate.mockReturnValue({ error: 'Not a valid object' })

    const wrapper = async () => {
      validateStorageConfig(retrievedStorageConfig)
    }

    expect(wrapper).rejects.toThrow(/The storage config is invalid/)
  })
})
