import db from "../models"
import {Room, Player} from "../models/room"

class RoomService {
  // Create a room
  async create({name = "Player 1"}) {
    await db.sync()

    const room = await Room.create({})
    const player = await Player.create({name})

    await room.addPlayer(player)

    return Promise.resolve({
      ...room.get({plain: true}),
      players: [player.get({plain: true})]
    })
  }

  // Join a room
  async patch(id, {name}) {
    const room = await Room.findOne({where: {id}})
    if (!room) {
      throw new Error("Nonexistent Room.")
    }

    await room.addPlayers(await Player.create({name}))

    return Promise.resolve({
      players: await room.getPlayers().map(x => x.get({plain: true}))
    })
  }
}

export default function () {
  Room.sync()

  this.use("room", new RoomService({
    Model: Room,
    paginate: {
      default: 30,
      max: 60
    }
  }))
}
