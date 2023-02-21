const { DefaultAzureCredential } = require('@azure/identity')
const { ShareServiceClient } = require('@azure/storage-file-share')
const getStorageConfig = require('./config/get-storage-config')
const getContainer = require('./storage/get-container')

const initialiseContainers = async () => {
  const storageConfig = getStorageConfig()
  if (storageConfig.createContainers) {
    console.log('Making sure blob containers exist')
    const container = await getContainer.getContainer()
    await container.createIfNotExists()
  }
  await initialiseFolders()
}

const initialiseFolders = async () => {
  const storageConfig = getStorageConfig()
  const container = await getContainer.getContainer()
  const placeHolderText = 'Placeholder'
  const client = container.getBlockBlobClient(`${storageConfig.inboundFolder}/default.txt`)
  await client.upload(placeHolderText, placeHolderText.length)
}

const getShareSeviceClient = async () => {
  const storageConfig = getStorageConfig()
  if (storageConfig.useShareConnectionStr) {
    console.log('Using connection string for ShareServiceClient')
    const shareServiceClient = ShareServiceClient.fromConnectionString(storageConfig.shareConnectionString)
    return shareServiceClient
  } else {
    console.log('Using DefaultAzureCredential for ShareServiceClient')
    const uri = `https://${storageConfig.storageShareAccount}.file.core.windows.net`
    const shareServiceClient = ShareServiceClient(uri, new DefaultAzureCredential())
    return shareServiceClient
  }
}

module.exports = {
  getShareSeviceClient,
  initialiseContainers
}
