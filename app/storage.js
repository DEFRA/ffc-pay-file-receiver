const { DefaultAzureCredential } = require('@azure/identity')
const { BlobServiceClient } = require('@azure/storage-blob')
const { ShareServiceClient } = require('@azure/storage-file-share')
const getStorageConfig = require('./config/get-storage-config')

// const container = blobServiceClient.getContainerClient(storageConfig.container)
const getInboundFolder = () => {
  const storageConfig = getStorageConfig()
  return storageConfig.inboundFolder
}

const initialiseContainers = async () => {
  const storageConfig = getStorageConfig()
  if (storageConfig.createContainers) {
    console.log('Making sure blob containers exist')
    const container = await getContainer()
    await container.createIfNotExists()
  }
  await initialiseFolders()
}

const initialiseFolders = async () => {
  const storageConfig = getStorageConfig()
  const container = await getContainer()
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

const getContainer = async () => {
  const storageConfig = getStorageConfig()
  if (storageConfig.useBlobConnectionStr) {
    console.log('Using connection string for BlobServiceClient')
    const blobServiceClient = BlobServiceClient.fromConnectionString(storageConfig.blobConnectionString)
    return blobServiceClient.getContainerClient(storageConfig.container)
  } else {
    console.log('Using DefaultAzureCredential for BlobServiceClient')
    const uri = `https://${storageConfig.storageBlobAccount}.blob.core.windows.net`
    const blobServiceClient = new BlobServiceClient(uri, new DefaultAzureCredential())
    return blobServiceClient.getContainerClient(storageConfig.container)
  }
}

module.exports = {
  getInboundFolder,
  getContainer,
  getShareSeviceClient,
  initialiseContainers
}
