const { getContainer } = require('../storage/get-container')
const getInboundFolder = require('../storage/get-inbound-folder')

const writeFile = async (fileName, file) => {
  const container = await getContainer()
  const inboundFolder = getInboundFolder()
  const blob = container.getBlockBlobClient(`${inboundFolder}/${fileName}`)
  const fileString = file.toString()
  await blob.upload(fileString, fileString.length)
}

module.exports = writeFile
