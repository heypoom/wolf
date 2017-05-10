<template lang="pug">
  div
    section.waiting(v-if="!playerName")
      img.torch(src="../assets/shaker.svg")
      h1 Welcome to Werewolf Village!
      h2 Please, enter your name to join <b>{{code}}</b>.
      br
      .form-group.row
        input.col-12.form-control(
          @keyup.enter="join"
          v-model="newName"
          placeholder="Enter Your Name"
        )
      button.btn.b1.btn-light(@click="join") Join
    section.waiting(v-else)
      img.torch(src="../assets/shaker.svg")
      h1 Waiting for Players...
      h2 Village Code: <b class="code">{{code}}</b>

      hr
      .players
        p(v-for="(player, index) in room.players") <b>{{index + 1}}</b> &nbsp;&nbsp; {{player.name}}
      hr

      button.btn.b1.btn-light(@click="start") Start Game
      button.btn(@click="leave") Leave Game
</template>

<script>
  import {mapState} from "vuex"
  import api from "../api"

  export default {
    name: "wolf-wait",
    data: () => ({
      newName: ""
    }),
    props: ["code"],
    computed: mapState(["playerName", "room"]),
    methods: {
      start() {
        // TODO: Start Game!
        const roles = {
          werewolf: 1
        }

        api.service("game").create({room: this.code, roles}).then(room => {
          this.$store.commit("updatePlayers", room.players)
          // this.$store.commit("toggleWait", false)
        })
      },
      join() {
        // TODO: Join the Game
        this.$store.commit("setName", this.newName)

        api.service("room").patch(this.code, {name: this.newName}).then(room => {
          this.$store.commit("updateRoom", room)
        })
      },
      leave() {
        // TODO: Destroy Room
        this.$router.push("/")
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../variables.scss";

  section.waiting {
    margin: 6em auto;
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
    border: 2px solid $lightGreen;
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
</style>
