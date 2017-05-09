<template lang="pug">
  .container
    wolf-wait(v-if="isWaiting" :code="$route.params.room")
    section.gameplay(v-else)
      .z1
        .players
          p Players:
          span(v-for="player in room.players") {{player}}&nbsp;
      .leave
        button.btn.b1(@click="leave") Leave Game
        button.btn.b1(@click="end") End Game
</template>

<script>
  import {mapState} from "vuex"
  import Waiting from "../components/Waiting"

  function exitGame(self) {
    if (confirm("Are you sure you want to Force Quit?")) {
      self.$store.commit("toggleWait", true)
      self.$router.push("/")
    }
  }

  export default {
    name: "wolf-game",
    computed: mapState(["isWaiting", "room"]),
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
      "wolf-wait": Waiting
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
    margin-top: 2em;
  }

  .z1 {
    // text-align: center;
    padding: 1.5em 2em;

    background: white;
    box-shadow: $zLite;
    border-bottom: 2px solid $lightGreen;
  }
</style>
