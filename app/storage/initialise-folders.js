const getStorageConfig = require('../config/get-storage-config')
const { getContainer } = require('./get-container')

const initialiseFolders = async () => {
  const storageConfig = getStorageConfig()
  const container = await getContainer()
  const placeHolderText = 'Placeholder'
  const client = container.getBlockBlobClient(`${storageConfig.inboundFolder}/default.txt`)
  await client.upload(placeHolderText, placeHolderText.length)
}

module.exports = {
  initialiseFolders
}
