const storage = require('../storage')
const retry = require('../retry')

const getFile = async (fileName, directoryName, shareName) => {
  return retry(() => download(fileName, directoryName, shareName))
}

const download = async (fileName, directoryName, shareName) => {
  const shareServiceClient = await storage.getShareSeviceClient()
  const share = shareServiceClient.getShareClient(shareName)
  const directory = share.getDirectoryClient(directoryName)
  const file = directory.getFileClient(fileName)
  const downloaded = await file.download()
  console.log(`Found ${fileName}`)
  return downloaded.readableStreamBody
}

module.exports = getFile
