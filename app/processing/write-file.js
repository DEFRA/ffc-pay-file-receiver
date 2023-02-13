const { container, inboundFolder } = require('../storage')

const writeFile = async (fileName, file) => {
  const blob = container.getBlockBlobClient(`${inboundFolder}/${fileName}`)
  const fileString = file.toString()
  await blob.upload(fileString, fileString.length)
}

module.exports = writeFile
