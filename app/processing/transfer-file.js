const deleteFile = require('./delete-file')
const getFile = require('./get-file')
const writeFile = require('./write-file')

const transferFile = async (fileName, directoryName, shareName) => {
  const fileContent = await getFile(fileName, directoryName, shareName)
  await writeFile(fileName, fileContent)
  await deleteFile(fileName, directoryName, shareName)
  console.log(`Successfully transferred ${fileName}`)
}

module.exports = transferFile
