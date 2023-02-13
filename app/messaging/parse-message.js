const parseMessage = (message) => {
  return {
    shareName: message.AzureFileShare,
    fileName: message.OutputFileName,
    directoryName: message.ProcessingLocation
  }
}

module.exports = parseMessage
