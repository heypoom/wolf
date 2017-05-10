import room from "./room"
import game from "./game"
import debug from "./debug"

export default function services() {
  this.configure(room)
  this.configure(game)
  this.configure(debug)
}
