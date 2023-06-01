require('./insights').setup()
require('log-timestamp')
const messaging = require('./messaging')
const { initialiseContainers } = require('./storage/initialize-container')

process.on(['SIGTERM', 'SIGINT'], async () => {
  await messaging.stop()
  process.exit(0)
})

module.exports = (async () => {
  await initialiseContainers()
  await messaging.start()
})()
