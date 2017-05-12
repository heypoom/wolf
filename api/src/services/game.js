import {Room} from "../models/room"

/* eslint no-await-in-loop: 0 */
/* eslint no-restricted-syntax: 0 */
/* eslint arrow-body-style: 0 */
/* eslint guard-for-in: 0 */

const defaultRole = {
  doctor: 1,
  seer: 1,
  werewolf: 1
}

function shuffleArr(array) {
  let i = 0
  let j = 0
  let temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

function getTime(ms) {
  let seconds = ms / 1000
  const hours = parseInt(seconds / 3600, 10)
  seconds %= 3600
  const minutes = parseInt(seconds / 60, 10)
  seconds %= 60
  return `${hours ? `${hours}:` : ""}${minutes}:${seconds < 10 ? "0" : ""}${Math.floor(seconds)}`
}

// Randomize Roles (requirement, player count)
const randomizeRoles = (req = defaultRole, players) => {
  // Get the Crucial (Non-Villager) Roles
  const crucials = Object.keys(req).reduce((roles, role) => {
    return roles.concat([...Array(req[role])].map(() => role))
  }, [])

  // All Roles = Villagers (Non-Crucial) + Crucial Roles
  const crucial = Object.values(req).reduce((a, b) => a + b, 0)
  const roles = [...Array(players - crucial)].map(() => "villager").concat(crucials)

  shuffleArr(roles)
  return roles
}

class GameService {
  timer(room, sec) {
    return new Promise(resolve => {
      const duration = sec * 1000

      // Sync with Client
      this.update(room, {type: "clock", payload: duration})

      // Actual Server Clock
      const initial = Date.now()

      const interval = setInterval(() => {
        const now = Date.now() - initial

        if (now < duration) {
          console.log(`Countdown: ${getTime(duration - now)}`)
        } else {
          clearInterval(interval)
          resolve()
        }
      }, 1000)
    })
  }

  // Game Loop
  async start(id) {
    console.log("Daytime Start")

    await this.timer(id, 15)

    console.log("Daytime End")

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
    const roles = randomizeRoles(req, players.length)

    for (const i in players) {
      await players[i].update({role: roles[i]})
    }

    // Start the Game
    this.start(id)

    return Promise.resolve({
      players: await room.getPlayers().map(x => x.get({plain: true}))
    })
  }

  async patch(room, {type, payload}) {
    const roleAction = {}
    if (type === "VOTEKILL") {
      // do sth
    } else if (type === "CONFIRMKILL") {
      // do sth
    } else if (type === "WOLFKILL") {
      // do something
    } else if (roleAction[type]) {
      // commit action
    }
    return Promise.resolve({
      status: "OK"
    })
  }

  // Event Handler
  update = (room, {type, payload}) => Promise.resolve({room, type, payload})
}

export default function () {
  this.use("game", new GameService())
}
