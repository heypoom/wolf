import room from "./room"
import debug from "./debug"

export default function services() {
  this.configure(room)
  this.configure(debug)
}
