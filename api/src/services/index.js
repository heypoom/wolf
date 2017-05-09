import game from "./game"
import debug from "./debug"

export default function services() {
  this.configure(game)
  this.configure(debug)
}
