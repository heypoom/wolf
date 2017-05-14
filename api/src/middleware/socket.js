import logger from "winston"
import chalk from "chalk"

/* eslint no-param-reassign: 0 */
/* eslint no-underscore-dangle: 0 */

const join = (id, {remoteAddress: addr, remotePort: port}) => {
  logger.verbose(`Client ${id} has joined from ${chalk.blue(addr)} (:${port})`)
}

export default function (io) {
  try {
    io.on("connection", socket => {
      const conn = socket.conn.transport.socket._socket
      join(socket.id, conn)

      socket.feathers.ip = conn.remoteAddress

      socket.on("room", data => {
        logger.verbose(`Client ${socket.id} has entered room ${chalk.blue(data)}.`)
        socket.feathers.game = data
      })

      socket.on("disconnect", () => {
        logger.verbose(`Client ${socket.id} has ${chalk.red("disconnected")}.`)
        io.emit("disconnected", {ip: conn.remoteAddress})
      })
    })
    io.use((socket, next) => {
      // Everything in socket.feathers will be available in hook.params
      socket.feathers.id = socket.id
      socket.feathers.handshake = socket.handshake
      next()
    })
  } catch (err) {
    logger.error(`Socket.io Error:`, err)
  }
}
