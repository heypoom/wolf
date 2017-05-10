import feathers from "feathers/client"
import hooks from "feathers-hooks"
import socketio from "feathers-socketio/client"
import io from "socket.io-client"

const qs = new URLSearchParams(window.location.search)
const server = qs.get("sv") || process.env.NODE_ENV === "development" ? "localhost:3003" : "blog.phoom.in.th"

export const socket = io(server, {transports: ["websocket"]})

export default feathers()
  .configure(socketio(socket))
  .configure(hooks())
