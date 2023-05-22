require('./insights').setup()
const config = require('./config')
const messaging = require('./messaging')
const { initialiseContainers } = require('./storage/initialize-container')

process.on(['SIGTERM', 'SIGINT'], async () => {
  if (config.enabled) {
    await messaging.stop()
  }
  process.exit(0)
})

module.exports = (async () => {
  if (config.enabled) {
    await initialiseContainers()
    await messaging.start()
  }
})()
