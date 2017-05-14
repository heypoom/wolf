import feathers from "feathers"

import bluebird from "bluebird"
import process from "process"
import logger from "winston"
import chalk from "chalk"

import middleware from "./middleware"
import services from "./services"

import {PORT} from "./config"

global.Promise = bluebird

const app = feathers()

app.configure(middleware)
app.configure(services)

process.on("uncaughtException", err => logger.error("Uncaught Exception:", err))

process.on("unhandledRejection", (reason, promise) => {
  logger.warn("Unhandled Rejection at: Promise ", promise, " reason: ", reason)
})

app.listen(PORT, () => {
  logger.info(`Application is starting at :${chalk.cyan(PORT)}`)
})
