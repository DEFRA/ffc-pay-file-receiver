const schema = require('./schema')
const { VALIDATION } = require('../errors')

const validateMessage = (message) => {
  const validationResult = schema.validate(message, { abortEarly: false, allowUnknown: true })
  if (validationResult.error) {
    const error = new Error(`Message content is invalid, ${validationResult.error.message}`)
    error.category = VALIDATION
    throw error
  }
}

module.exports = validateMessage
