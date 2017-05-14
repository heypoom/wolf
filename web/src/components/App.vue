<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
  import {ts} from "../core"

  export default {
    name: "app",
    feathers: {
      room: {
        patched(data = {}) {
          if (data.players) {
            this.$store.commit("updatePlayers", data.players)
          }
        }
      },
      game: {
        created(data = {}) {
          console.log("Game is starting...")
          this.$store.commit("updateRoom", data)
          this.$store.commit("toggleWait", false)
        },
        updated({type, data}) {
          switch (type) {
            case "clock":
              this.$store.commit("updateTimer", {
                duration: data,
                initial: ts.now()
              })
              break
            case "night":
              console.info("The night sky fell...")
              this.$store.commit("toggleNight", true)
              break
            case "day":
              console.info("It's the new day!")
              this.$store.commit("toggleNight", false)
              break
            default:
              break
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  body {
    font-family: "Roboto", Helvetica, Arial, sans-serif;
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: #555;
    background: #f8f8f8;
  }

  main {
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 300;
  }

  b {
    font-weight: 400;
  }
</style>
