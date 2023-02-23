const getStorageConfig = require('../config/get-storage-config')

const getInboundFolder = async () => {
  const storageConfig = await getStorageConfig()
  return storageConfig.inboundFolder
}

module.exports = getInboundFolder
