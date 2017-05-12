<template lang="pug">
  .z1
    h1 {{time}} {{down}}
</template>

<script>
  import {endpointAlt} from "../api"

  const timesync = require("timesync/lib/timesync.js")

  function getTime(ms) {
    let seconds = ms / 1000
    const hours = parseInt(seconds / 3600, 10)
    seconds %= 3600
    const minutes = parseInt(seconds / 60, 10)
    seconds %= 60
    return `${hours ? `${hours}:` : ""}${minutes}:${seconds < 10 ? "0" : ""}${Math.floor(seconds)}`
  }

  export default {
    name: "wolf-timer",
    mounted() {
      this.ts = timesync.create({
        server: `${endpointAlt}/timesync`,
        interval: 10000
      })
      this.resetTimer()
      this.startTimer()
    },
    methods: {
      startTimer() {
        this.ts.on("change", offset => console.log(`Clock Offset: ${offset}ms`))

        setInterval(() => {
          this.ms = this.ts.now() - this.initial
        }, 1000)
      },
      resetTimer() {
        this.initial = this.ts.now()
      }
    },
    computed: {
      time() {
        return getTime(this.ms)
      },
      down() {
        if (this.ms < this.duration) {
          return getTime(this.duration - this.ms)
        }
        return "Time's up!"
      }
    },
    data: () => ({
      duration: 15 * 1000,
      initial: 0,
      ms: 0
    }),
    feathers: {
      game: {
        patched() {

        },
        updated({room, type, payload}) {
          if (type === "clock") {
            this.duration = payload
            this.resetTimer()
          }
          console.log({room, type, payload})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../variables.scss";

</style>
