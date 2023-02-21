const storage = require('../storage')

const writeFile = async (fileName, file) => {
  const container = await storage.getContainer()
  const inboundFolder = storage.getInboundFolder()
  const blob = container.getBlockBlobClient(`${inboundFolder}/${fileName}`)
  const fileString = file.toString()
  await blob.upload(fileString, fileString.length)
}

module.exports = writeFile
