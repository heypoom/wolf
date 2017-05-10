import {Room, Player} from "../models/room"

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
  create = async ({room: id, roles: req}) => {
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

    // TODO: Initiate Game

    // Return Information
    // .map(x => ({id: x.id, name: x.name, role: x.role}))
    return Promise.resolve({
      status: `Game is starting...`,
      players: await room.getPlayers().map(x => x.get({plain: true}))
    })
  }

  find = () => Promise.resolve({
    status: "Game Service"
  })
}

export default function () {
  this.use("game", new GameService())
}
