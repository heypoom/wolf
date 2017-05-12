import feathers from "feathers/client"
import hooks from "feathers-hooks"
import socketio from "feathers-socketio/client"
import io from "socket.io-client"

const qs = new URLSearchParams(window.location.search)
export const endpoint = qs.get("sv") || process.env.NODE_ENV === "development" ? "localhost:3003" : "blog.phoom.in.th"
export const endpointAlt = qs.get("sv") || process.env.NODE_ENV === "development" ? "http://localhost:3003" : "https://blog.phoom.in.th"

export const socket = io(endpoint, {transports: ["websocket"]})

export default feathers()
  .configure(socketio(socket))
  .configure(hooks())
