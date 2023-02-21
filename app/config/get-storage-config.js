const validateStorageConfig = require('./validation/validate-storage-config')

const getStorageConfig = () => {
  const config = {
    storageBlobAccount: process.env.AZURE_STORAGE_BLOB_ACCOUNT_NAME,
    storageShareAccount: process.env.AZURE_STORAGE_SHARE_ACCOUNT_NAME,
    blobConnectionString: process.env.AZURE_STORAGE_BLOB_CONNECTION_STRING,
    shareConnectionString: process.env.AZURE_STORAGE_SHARE_CONNECTION_STRING,
    container: process.env.AZURE_STORAGE_BLOB_CONTAINER,
    inboundFolder: process.env.AZURE_STORAGE_BLOB_FOLDER,
    useBlobConnectionStr: process.env.AZURE_STORAGE_BLOB_USE_CONNECTION_STRING,
    useShareConnectionStr: process.env.AZURE_STORAGE_SHARE_USE_CONNECTION_STRING
  }
  return validateStorageConfig(config)
}

module.exports = getStorageConfig
