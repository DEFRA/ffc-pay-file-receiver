const schema = require('../schema/storage-config-schema')

const validateStorageConfig = (storageConfig) => {
  const result = schema.validate(storageConfig, {
    abortEarly: false
  })

  if (result.error) {
    throw new Error(`The storage config is invalid. ${result.error.message}`)
  }

  return result.value
}

module.exports = validateStorageConfig
