import _redis from "redis"
import bluebird from "bluebird"

bluebird.promisifyAll(_redis.RedisClient.prototype)
bluebird.promisifyAll(_redis.Multi.prototype)

export const redis = _redis.createClient()

export const getTime = ms => {
  let seconds = ms / 1000
  const hours = parseInt(seconds / 3600, 10)
  seconds %= 3600
  const minutes = parseInt(seconds / 60, 10)
  seconds %= 60
  return `${hours ? `${hours}:` : ""}${minutes}:${seconds < 10 ? "0" : ""}${Math.floor(seconds)}`
}

export const humanPrecision = x => {
  const m = x / (1000 * 1000)
  const k = x / 1000
  const num = n => parseFloat(n.toPrecision(2)).toString()

  if (m >= 1) {
    return `${num(m)}M`
  } else if (k >= 1) {
    return `${num(k)}K`
  }
  return x
}
