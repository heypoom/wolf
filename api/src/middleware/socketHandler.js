/* eslint no-param-reassign: 0 */

export default io => {
  try {
    io.on("connection", socket => {
      console.info("Client Joined...")

      socket.on("joinRoom", ({room, name}) => {
        socket.join(room)
        console.info(`Client ${name} joined the room ${room}`)
      })
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
