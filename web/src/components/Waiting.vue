<template lang="pug">
  div
    section.waiting
      wolf-join(v-if="!playerName" :code="code")
      template(v-else)
        img.torch(src="../assets/shaker.svg")
        h1 Waiting for Players...
        h2 Village Code: <b class="code">{{code}}</b>

        hr
        .players(v-if="room.players")
          p(v-for="(player, index) in room.players") <b>{{index + 1}}</b> &nbsp;&nbsp; {{player.name}}
        hr

        button.btn.b1.btn-light(:disabled="!isHost" @click="start") {{isHost ? "Start Game" : "Please Wait..."}}
        button.btn(@click="leave") Leave Game
    wolf-settings(:room="room" v-if="isHost")
    .pad(v-if="!isHost")
</template>

<script>
  import {mapState} from "vuex"
  import api from "../core/api"

  import Join from "./Join"
  import Settings from "./Settings"

  export default {
    name: "wolf-wait",
    props: ["code"],
    computed: mapState(["playerName", "room", "isHost", "roles"]),
    methods: {
      start() {
        const roles = this.roles || {werewolf: 1, seer: 1}
        Object.keys(roles).forEach(key => (roles[key] === 0) && delete roles[key])

        api.service("game").create({room: this.code, roles})
      },
      leave() {
        if (confirm("Are you sure you want to quit?")) {
          // TODO: Destroy Room
          this.$store.commit("toggleWait", true)
          this.$store.commit("updateRoom", {})
          this.$router.push("/")
        }
      }
    },
    components: {
      "wolf-join": Join,
      "wolf-settings": Settings
    }
  }
</script>

<style lang="scss" scoped>
  @import "../variables.scss";

  section.waiting {
    margin: 6em auto 0 auto;
    text-align: center;
    max-width: 500px;

    padding: 2.5em 1em;
    box-shadow: $zLite;
    background: white;
  }

  .torch {
    width: 6em;
    height: 6em;
    padding: 1em;
    background: white;
    border: 2px solid $primary;
    border-radius: 50%;
    margin-bottom: 2em;
    box-shadow: $zFlow;
  }

  h1 {
    font-size: 1.9em;
  }

  h2 {
    margin-top: 0.8em;
    font-size: 1.2em;
  }

  .players {
    text-align: left;
    margin: 0 auto;
    max-width: 240px;
  }

  .code {
    font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
    // text-transform: uppercase;
  }

  .pad {
    margin-top: 2em;
  }
</style>
