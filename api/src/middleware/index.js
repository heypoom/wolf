import feathers from "feathers"
import hooks from "feathers-hooks"
import rest from "feathers-rest"
import socketio from "feathers-socketio"
import errorHandler from "feathers-errors/handler"

import cors from "cors"
import path from "path"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import timesync from "timesync/server"

import socketHandler from "./socketHandler"

export default function middlewares() {
  this.use(feathers.static(path.join(__dirname, "public")))
  this.use(cors())
  this.use(bodyParser.json())
  this.use(bodyParser.urlencoded({extended: true}))
  this.use(cookieParser())

  this.configure(hooks())
  this.configure(rest())
  this.configure(socketio({wsEngine: "uws"}, socketHandler))

  this.use("/timesync", timesync.requestHandler)
  this.use(errorHandler())
}
