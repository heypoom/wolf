class GameService {
  setup(app) {
    this.app = app

    app.io.on("connection", socket => {
      socket.on("joinRoom", ({room, name}) => {
        console.info(`EVENT_ROOM_JOINED`)
        app.io.emit(`room-${room}`, {name})
      })
    })
  }

  // Create a Game
  create({playerName = "Player 1"}, params) {
    // TODO: Better ID Generation
    const id = Math.random().toString(36).substring(2, 8)

    return Promise.resolve({
      id,
      players: [playerName]
    })
  }
}

export default function debug() {
  this.use("game", new GameService())
}
