<template lang="pug">
  .container
    wolf-wait(v-if="isWaiting" :code="$route.params.room")
    section.gameplay(v-else)
      wolf-clock
      wolf-role(:role="role")
      .z1
        .players
          span.player(v-for="player in room.players") {{player.name}}
      .leave
        button.btn.b1(@click="leave") Leave Game
        button.btn.b1(@click="end") End Game
</template>

<script>
  import {mapState, mapGetters} from "vuex"

  import Waiting from "../components/Waiting"
  import Role from "../components/Role"
  import Clock from "../components/Clock"
  // import api from "../api"

  function exitGame(self) {
    if (confirm("Are you sure you want to Force Quit?")) {
      self.$store.commit("toggleWait", true)
      self.$store.commit("updateRoom", null)
      self.$router.push("/")

      // api.service("game").remove(this.code)
    }
  }

  export default {
    name: "wolf-game",
    computed: {
      ...mapState(["isWaiting", "room"]),
      ...mapGetters(["role"])
    },
    methods: {
      leave() {
        // TODO: Remove Player from Game
        exitGame(this)
      },
      end() {
        // TODO: DANGEROUS: End Game!
        exitGame(this)
      }
    },
    components: {
      "wolf-wait": Waiting,
      "wolf-role": Role,
      "wolf-clock": Clock
    }
  }
</script>

<style lang="scss" scoped>
  @import "../variables.scss";

  section.gameplay {
    margin: 6em auto;
    max-width: 460px;
  }

  .btn.b1 {
    color: #888;
  }

  .leave {
    text-align: center;
    margin-top: 1.5em;
  }

  .player {
    text-transform: uppercase;
    font-size: 0.85em;
    background: #f8f8f8;
    padding: 0.2em 0.7em;
    color: #888;
    // text-decoration: line-through;
  }
</style>
