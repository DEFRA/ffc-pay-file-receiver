const { DefaultAzureCredential } = require('@azure/identity')
const { BlobServiceClient } = require('@azure/storage-blob')
const getStorageConfig = require('../config/get-storage-config')

const getContainer = async () => {
  const storageConfig = await getStorageConfig()
  if (storageConfig.useBlobConnectionStr) {
    console.log('Using connection string for BlobServiceClient')
    const blobServiceClient = BlobServiceClient.fromConnectionString(storageConfig.blobConnectionString)
    return blobServiceClient.getContainerClient(storageConfig.container)
  } else {
    console.log('Using DefaultAzureCredential for BlobServiceClient')
    const uri = `https://${storageConfig.storageBlobAccount}.blob.core.windows.net`
    const blobServiceClient = new BlobServiceClient(uri, new DefaultAzureCredential({ managedIdentityClientId: storageConfig.managedIdentityClientId }))
    return blobServiceClient.getContainerClient(storageConfig.container)
  }
}

module.exports = {
  getContainer
}
