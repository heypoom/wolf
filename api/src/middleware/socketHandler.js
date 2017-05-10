/* eslint no-param-reassign: 0 */

export default io => {
  try {
    io.on("connection", socket => {
      console.info("Client Joined.")
    })
    io.use((socket, next) => {
      // Everything in socket.feathers will be available in hook.params
      socket.feathers.handshake = socket.handshake
      next()
    })
  } catch (err) {
    console.error(err)
  }
}
