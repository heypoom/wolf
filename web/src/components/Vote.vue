<template lang="pug">
  .z1
    .tapLabel Vote to Kill
    h2 Vote a player to <b>kill</b>.
    .row.players
      button.btn.b1.col-sm(:class="{'btn-light': select == i}" @click="vote(i)" v-for="(p, i) in players")
        | {{p.name}} (4)
      button.btn.col-sm(:class="{'btn-light': select == 'no'}" @click="vote('no')") No Vote
</template>

<script>
  import {mapState} from "vuex"
  import api from "../core/api"

  export default {
    name: "wolf-vote",
    props: ["players"],
    data: () => ({select: null}),
    computed: mapState(["room"]),
    methods: {
      vote(i) {
        this.select = i
        setTimeout(() => {
          const vote = i === "no" ? i : this.players[i].id
          api.service("game").patch(this.room.id, {type: "vote", data: vote})
        }, 1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../variables.scss";

  h2 {
    color: #888;
    font-size: 1.6em;
    margin-bottom: 0.6em;
  }

  .players {
    margin: 0 auto;
    padding: 0 1em;

    .btn {
      margin-bottom: 0.8em;

      padding: .4rem .6rem;
      font-size: 0.95em;
    }
  }

  .z1 {
    text-align: center;
  }

  .btn:not(.btn-light) {
    color: #888;
  }
</style>
