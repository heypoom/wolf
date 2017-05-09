import feathers from "feathers/client"
import hooks from "feathers-hooks"
import socketio from "feathers-socketio/client"
import io from "socket.io-client"

export const socket = io("http://localhost:3005", {transports: ["websocket"]})

export default feathers()
  .configure(socketio(socket))
  .configure(hooks())
