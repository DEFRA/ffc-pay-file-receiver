const retry = require('./retry')
const { getFile, writeFile, deleteFile } = require('./storage')

const transferFile = async (shareName, filePath, fileName) => {
  const file = await retry(() => getFile(filePath, shareName))
  await writeFile(fileName, file)
  await deleteFile(filePath, shareName)
  console.log(`Successfully transferred ${filePath}`)
}

module.exports = transferFile
