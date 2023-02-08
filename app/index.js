const messaging = require('./messaging')
const server = require('./server')

const init = async () => {
  await server.start()
  console.log('Server running on %s', server.info.uri)
  await messaging.start()
}

process.on('unhandledRejection', async (err) => {
  console.log(err)
  await messaging.stop()
  process.exit(1)
})

init()
