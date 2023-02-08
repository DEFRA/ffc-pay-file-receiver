const { DefaultAzureCredential } = require('@azure/identity')
const { BlobServiceClient } = require('@azure/storage-blob')
const { ShareServiceClient } = require('@azure/storage-file-share')
const { config } = require('./config').storageConfig

let blobServiceClient

if (config.useConnectionStr) {
  console.log('Using connection string for BlobServiceClient')
  blobServiceClient = BlobServiceClient.fromConnectionString(config.connectionStr)
} else {
  console.log('Using DefaultAzureCredential for BlobServiceClient')
  const uri = `https://${config.storageAccount}.blob.core.windows.net`
  blobServiceClient = new BlobServiceClient(uri, new DefaultAzureCredential())
}

const shareServiceClient = ShareServiceClient.fromConnectionString(config.shareConnectionString)

const getFile = async (filePath, shareName) => {
  const share = shareServiceClient.getShareClient(shareName)
  console.log(`Searching for ${filePath}`)
  const file = share.rootDirectoryClient.getFileClient(filePath)
  const downloaded = await file.downloadToBuffer()
  console.log(`Found ${filePath}`)
  return downloaded.toString()
}

const container = blobServiceClient.getContainerClient(config.container)

const writeFile = async (fileName, file) => {
  const blob = container.getBlockBlobClient(`${config.inboundFolder}/${fileName}`)
  await blob.upload(file, file.length)
}

const deleteFile = async (filePath, shareName) => {
  const share = shareServiceClient.getShareClient(shareName)
  const file = share.rootDirectoryClient.getFileClient(filePath)
  await file.delete()
}

module.exports = {
  getFile,
  writeFile,
  deleteFile
}
