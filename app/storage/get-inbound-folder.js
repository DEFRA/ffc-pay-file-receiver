const getStorageConfig = require('../config/get-storage-config')

const getInboundFolder = () => {
  const storageConfig = getStorageConfig()
  return storageConfig.inboundFolder
}

module.exports = getInboundFolder
