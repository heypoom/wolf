import feathers from "feathers/client"
import hooks from "feathers-hooks"
import socketio from "feathers-socketio/client"
import io from "socket.io-client"

const qs = new URLSearchParams(window.location.search)
export const endpoint = qs.get("sv") || process.env.NODE_ENV === "development" ? `${location.hostname}:3003` : "blog.phoom.in.th"
export const endpointAlt = qs.get("sv") || process.env.NODE_ENV === "development" ? `http://${location.hostname}:3003` : "https://blog.phoom.in.th"

export const socket = io(endpoint, {transports: ["websocket"]})

socket.on("connect", () => {
  console.info("Connected to the WebSocket Server!")
  if (location.hash.substring(2, 8)) {
    console.info(`Rejoining the game room ${location.hash.substring(2, 8)}.`)
    socket.emit("room", location.hash.substring(2, 8))
  }
})

socket.on("reconnect", () => {
  console.info("Attempting to reconnect to the WebSocket Server...")
})

socket.on("disconnect", () => {
  console.warn("Warning: Disconnected to the WebSocket Server...")
})

export default feathers()
  .configure(socketio(socket))
  .configure(hooks())
