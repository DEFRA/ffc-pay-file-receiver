const { shareServiceClient } = require('../storage')

const deleteFile = async (fileName, directoryName, shareName) => {
  const share = shareServiceClient.getShareClient(shareName)
  const directory = share.getDirectoryClient(directoryName)
  const file = directory.getFileClient(fileName)
  await file.delete()
}

module.exports = deleteFile
