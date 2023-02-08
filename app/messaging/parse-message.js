const parseMessage = (message) => {
  return {
    shareName: message.AzureFileShare,
    fileName: message.OutputFileName,
    filePath: `${message.ProcessingLocation}/${message.OutputFileName}`
  }
}

module.exports = parseMessage
