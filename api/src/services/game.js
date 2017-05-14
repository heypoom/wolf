import logger from "winston"
import chalk from "chalk"
import hooks from "feathers-hooks-common"

import {redis} from "../core"
import assignRoles from "../core/role"
import {Room} from "../models/room"

/* eslint no-await-in-loop: 0 */
/* eslint no-restricted-syntax: 0 */
/* eslint arrow-body-style: 0 */
/* eslint guard-for-in: 0 */

class GameService {
  setup(app) {
    this.app = app
  }

  log = (text, id, mode = "info") => logger.log(mode, `Game ${chalk.blue(id)}:`, text)
  setVar = (room, key, value) => redis.set(`rooms/${room}/${key}`, value)
  getVar = async (room, key) => redis.getAsync(`rooms/${room}/${key}`)

  timer(room, sec) {
    return new Promise(resolve => {
      const duration = sec * 1000

      // Sync with Client
      this.update(room, {type: "clock", data: duration})

      // Actual Server Clock
      const initial = Date.now()

      const timer = setInterval(() => {
        const now = Date.now() - initial

        if (now < duration) {
          // Still going...
        } else {
          this.log("Timer Expired.", room, "debug")
          clearInterval(timer)
          resolve({timeout: true})
        }
      }, 1000)
    })
  }

  async daytime(id) {
    this.log("Daytime Start!", id)

    await this.update(id, {type: "day"})
    const result = await Promise.some([
      new Promise(resolve => {
        this.on("patched", (req, {id: room, data: {type, data}}) => {
          if (id === room && type === "vote") {
            resolve(data)
          }
        })
      }),
      this.timer(id, 13)
    ], 1)

    if (result[0].timeout) {
      this.log("Not everyone voted. We're just going to use the highest vote...", id)
    } else {
      this.log(`Villager's Vote Result: ${JSON.stringify(result[0])}`, id)
    }

    return Promise.resolve(result[0])
  }

  // Game Loop
  async start(id) {
    this.log("Game is Starting...", id)

    await this.daytime(id)

    this.log("Daytime End -- Nighttime Start!", id)

    await this.update(id, {type: "night"})
    await this.timer(id, 16)

    this.log("Nighttime End!", id)

    return true
  }

  find = query => Promise.resolve({
    status: "Game Service",
    query
  })

  async create({room: id, roles: req}) {
    // Consistency Checks
    if (typeof req !== "object" || Array.isArray(req)) {
      throw new Error("Role Requirement must be an Object.")
    }

    const room = await Room.findOne({where: {id}})
    if (!room) {
      throw new Error("Nonexistent Room.")
    }

    // Role Assignment
    const players = await room.getPlayers()
    const roles = assignRoles(req, players.length)

    for (const i in players) {
      await players[i].update({role: roles[i]})
    }

    // Start the Game
    setTimeout(() => this.start(id), 1200)

    return Promise.resolve({
      roles: req,
      players: await room.getPlayers().map(x => x.get({plain: true}))
    })
  }

  async patch(room, {type, data}) {
    switch (type) {
      case "$reset":
        this.start(room)
        break
      case "$timer":
        this.timer(room, data)
        break
      case "$cycle": {
        if (data && !(["day", "night"].includes(data)))
          throw new Error("Invalid Data.")

        const cycle = data || await this.getVar(room, "cycle") !== "day" ? "day" : "night"
        this.setVar(room, "cycle", cycle)
        this.update(room, {type: cycle})
        this.log(`Changing Cycle to ${cycle}.`, room, "verbose")
        break
      }
      default:
        break
    }

    return Promise.resolve({status: 200, room})
  }

  // Event Handler: Server To Client Only
  update(room, {type, data}) {
    return Promise.resolve({room, type, data})
  }
}

export default function () {
  this.use("game", new GameService())

  this.service("game").before({
    // all: hooks.debug("BEFORE_ALL"),
    update: hooks.disallow("external")
  })

  this.service("game").filter("updated", (data, conn) => {
    const {room} = data
    const {game, id} = conn

    if (room === game) {
      logger.verbose(`Allowing Game Event of ${chalk.cyan(room)} for ${id}.`)
      return data
    }
    return false
  })
}
