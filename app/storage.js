const { DefaultAzureCredential } = require('@azure/identity')
const { BlobServiceClient } = require('@azure/storage-blob')
const { ShareServiceClient } = require('@azure/storage-file-share')
const config = require('./config').storageConfig

let blobServiceClient
let shareServiceClient

if (config.useBlobConnectionStr) {
  console.log('Using connection string for BlobServiceClient')
  blobServiceClient = BlobServiceClient.fromConnectionString(config.blobConnectionString)
} else {
  console.log('Using DefaultAzureCredential for BlobServiceClient')
  const uri = `https://${config.storageBlobAccount}.blob.core.windows.net`
  blobServiceClient = new BlobServiceClient(uri, new DefaultAzureCredential())
}

if (config.useShareConnectionStr) {
  console.log('Using connection string for ShareServiceClient')
  shareServiceClient = ShareServiceClient.fromConnectionString(config.shareConnectionString)
} else {
  console.log('Using DefaultAzureCredential for ShareServiceClient')
  const uri = `https://${config.storageShareAccount}.file.core.windows.net`
  shareServiceClient = new ShareServiceClient(uri, new DefaultAzureCredential())
}

const container = blobServiceClient.getContainerClient(config.container)
const inboundFolder = config.inboundFolder

const initialiseContainers = async () => {
  if (config.createContainers) {
    console.log('Making sure blob containers exist')
    await container.createIfNotExists()
  }
  await initialiseFolders()
}

const initialiseFolders = async () => {
  const placeHolderText = 'Placeholder'
  const client = container.getBlockBlobClient(`${config.inboundFolder}/default.txt`)
  await client.upload(placeHolderText, placeHolderText.length)
}

module.exports = {
  container,
  inboundFolder,
  shareServiceClient,
  initialiseContainers
}
