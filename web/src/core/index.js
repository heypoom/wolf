import {endpointAlt} from "./api"

const timesync = require("timesync/lib/timesync.js")

export const ts = timesync.create({
  server: `${endpointAlt}/timesync`,
  interval: 10000
})

export const getTime = ms => {
  let seconds = ms / 1000
  const hours = parseInt(seconds / 3600, 10)
  seconds %= 3600
  const minutes = parseInt(seconds / 60, 10)
  seconds %= 60
  return `${hours ? `${hours}:` : ""}${minutes}:${seconds < 10 ? "0" : ""}${Math.floor(seconds)}`
}
