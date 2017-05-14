<template lang="pug">
  .container
    wolf-wait(v-if="isWaiting" :code="$route.params.room")
    section.gameplay(v-else)
      wolf-clock
      v-touch.cards(@swipeleft="card > 1 && card--" @swiperight="card < 3 && card++")
        svg.left(viewBox="0 0 20 20" @click="card--" v-show="card > 1")
          path(d="M12.452 4.516c0.446 0.436 0.481 1.043 0 1.576l-3.747 3.908 3.747 3.908c0.481 0.533 0.446 1.141 0 1.574-0.445 0.436-1.197 0.408-1.615 0-0.418-0.406-4.502-4.695-4.502-4.695-0.223-0.217-0.335-0.502-0.335-0.787s0.112-0.57 0.335-0.789c0 0 4.084-4.287 4.502-4.695s1.17-0.436 1.615 0z")
        svg.right(viewBox="0 0 20 20" @click="card++" v-show="card < 3")
          path(d="M9.163 4.516c0.418 0.408 4.502 4.695 4.502 4.695 0.223 0.219 0.335 0.504 0.335 0.789s-0.112 0.57-0.335 0.787c0 0-4.084 4.289-4.502 4.695-0.418 0.408-1.17 0.436-1.615 0-0.446-0.434-0.481-1.041 0-1.574l3.747-3.908-3.747-3.908c-0.481-0.533-0.446-1.141 0-1.576s1.197-0.409 1.615 0z")
        wolf-role(:role="role" v-show="card === 1")
        div(v-show="card === 2")
          wolf-action(:role="role" v-if="isNight")
          wolf-vote(:players="room.players" v-else)
        .z1(v-show="card === 3")
          .tapLabel Drawing Canvas
          wolf-draw
      .z1
        .tapLabel Players
        .players
          span.player(v-for="player in room.players") {{player.name}}
      .pages
        .page(v-for="i in 3")
      .leave
        button.btn.b1(@click="leave") Leave Game
        button.btn.b1(@click="end") End Game
</template>

<script>
  import {mapState, mapGetters} from "vuex"

  import Waiting from "../components/Waiting"
  import Role from "../components/Role"
  import Clock from "../components/Clock"
  import Action from "../components/Action"
  import Vote from "../components/Vote"
  import Draw from "../components/Draw"

  function exitGame(self) {
    if (confirm("Are you sure you want to Force Quit?")) {
      self.$store.commit("reset")
      self.$router.push("/")
    }
  }

  export default {
    name: "wolf-game",
    data: () => ({card: 1}),
    computed: {
      ...mapState(["isWaiting", "room", "isNight"]),
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
      "wolf-clock": Clock,
      "wolf-action": Action,
      "wolf-vote": Vote,
      "wolf-draw": Draw
    }
  }
</script>

<style lang="scss" scoped>
  @import "../variables.scss";

  section.gameplay {
    position: relative;

    margin: 4em auto;
    max-width: 460px;
  }

  .cards {
    position: relative;
  }

  .left, .right {
    position: absolute;
    z-index: 1;
    top: 40%;

    width: 2.5em;
    height: 2.5em;
    padding: 0.4em;

    fill: $grey;
    background: white;
    cursor: pointer;
    box-shadow: $zLite;

    border: 2px solid $grey;
    border-radius: 50%;
    outline: none;
  }

  .left {
    left: -1em;
  }

  .right {
    right: -1em;
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
    margin-right: 0.7em;
    // text-decoration: line-through;
  }
</style>
