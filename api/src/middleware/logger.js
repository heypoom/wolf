import moment from "moment"
import winston from "winston"

const consoleConfig = {
  level: "debug",
  colorize: true,
  prettyPrint: true,
  handleExceptions: true,
  timestamp: () => moment().format("HH:mm:ss.SSS"),
  formatter: opts => {
    const time = opts.timestamp()
    const level = winston.config.colorize(opts.level, opts.level)
    const msg = opts.message
    return `(${time}) [${level}] ${msg}`
  }
}

const fileConfig = {
  filename: "application.log",
  timestamp: () => moment().format("DD-MM-YY HH:mm:ss:SSS")
}

winston.configure({
  transports: [
    new winston.transports.Console(consoleConfig),
    new winston.transports.File(fileConfig)
  ],
  colors: {
    debug: "grey",
    verbose: "blue",
    info: "cyan",
    warn: "yellow",
    error: "red"
  }
})

export default () => (req, res, next) => {
  winston.info("Incoming Request...")
  next()
}
