const keepAlive = () => {
  // run a process forever to keep the container alive
  setInterval(() => {}, 60000)
}

module.exports = {
  keepAlive
}
