import feathers from "feathers"
import hooks from "feathers-hooks"
import rest from "feathers-rest"
import socketio from "feathers-socketio"
import errorHandler from "feathers-errors/handler"

import cors from "cors"
import path from "path"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import {requestHandler} from "timesync/server"

import logger from "./logger"
import socket from "./socket"

export default function middlewares() {
  this.use(feathers.static(path.join(__dirname, "public")))
  this.use(cors())
  this.use(bodyParser.json())
  this.use(bodyParser.urlencoded({extended: true}))
  this.use(cookieParser())

  this.configure(hooks())
  this.configure(rest())
  this.configure(socketio({wsEngine: "uws"}, socket))

  this.use("/timesync", requestHandler)
  this.use(logger())
  this.use(errorHandler())
}
