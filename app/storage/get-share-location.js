const { DefaultAzureCredential } = require('@azure/identity')
const { ShareServiceClient } = require('@azure/storage-file-share')
const getStorageConfig = require('../config/get-storage-config')

const getShareLocation = async () => {
  const storageConfig = getStorageConfig()
  if (storageConfig.useShareConnectionStr) {
    console.log('Using connection string for ShareServiceClient')
    const shareServiceClient = ShareServiceClient.fromConnectionString(storageConfig.shareConnectionString)
    return shareServiceClient
  } else {
    console.log('Using DefaultAzureCredential for ShareServiceClient')
    const uri = `https://${storageConfig.storageShareAccount}.file.core.windows.net`
    const shareServiceClient = new ShareServiceClient(uri, new DefaultAzureCredential())
    return shareServiceClient
  }
}

module.exports = {
  getShareLocation
}
