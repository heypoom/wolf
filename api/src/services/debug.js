class DebugService {
  setup(app) {
    this.app = app
  }

  find = () => Promise.resolve("Hello, World!")
}

export default function debug() {
  this.use("debug", new DebugService())
}
