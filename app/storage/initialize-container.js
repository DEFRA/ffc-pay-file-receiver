const getStorageConfig = require('../config/get-storage-config')
const { getContainer } = require('./get-container')
const { initialiseFolders } = require('./initialise-folders')

const initialiseContainers = async () => {
  const storageConfig = await getStorageConfig()
  if (storageConfig.createContainers) {
    console.log('Making sure blob containers exist')
    const container = await getContainer()
    await container.createIfNotExists()
  }
  await initialiseFolders()
}

module.exports = {
  initialiseContainers
}
