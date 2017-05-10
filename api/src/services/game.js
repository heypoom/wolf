import db from "../models"
import {Game, Player} from "../models/game"

class GameService {
  setup(app) {
    this.app = app
  }

  // Create a Game
  async create({name = "Player 1"}) {
    await db.sync({force: true})

    const game = await Game.create({})
    const player = await Player.create({name})

    await game.addPlayer(player)

    return Promise.resolve({
      ...game.get({plain: true}),
      players: [player.get({plain: true})]
    })
  }

  // Join a game
  async patch(id, {name}) {
    const game = await Game.findOne({where: {id}})
    await game.addPlayers(await Player.create({name}))

    return Promise.resolve({
      players: await game.getPlayers().map(x => x.get({plain: true}))
    })
  }
}

export default function debug() {
  Game.sync({force: true})

  this.use("game", new GameService({
    Model: Game,
    paginate: {
      default: 30,
      max: 60
    }
  }))
}
