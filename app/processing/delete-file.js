const { getShareLocation } = require('../storage/get-share-location')

const deleteFile = async (fileName, directoryName, shareName) => {
  const shareServiceClient = await getShareLocation()
  const share = shareServiceClient.getShareClient(shareName)
  const directory = share.getDirectoryClient(directoryName)
  const file = directory.getFileClient(fileName)
  await file.delete()
}

module.exports = deleteFile
