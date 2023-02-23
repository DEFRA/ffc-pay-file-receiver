require('./insights').setup()
const messaging = require('./messaging')
const { initialiseContainers } = require('./storage/initialize-container')

process.on('SIGTERM', async () => {
  await messaging.stop()
  process.exit(0)
})

process.on('SIGINT', async () => {
  await messaging.stop()
  process.exit(0)
})

module.exports = (async () => {
  await initialiseContainers()
  await messaging.start()
})()
