<template lang="pug">
  .z1.clock(:class="{'night': night}")
    .tapLabel Clock Cycle
    span.large {{down}}
    span.sm(:class="{'day': !night}") {{night ? "NIGHT" : "DAY"}}TIME
</template>

<script>
  import {mapState} from "vuex"
  import {ts, getTime} from "../core"

  export default {
    name: "wolf-timer",
    data: () => ({ms: 0}),
    mounted() {
      setInterval(() => {
        this.ms = ts.now() - this.initial
      }, 1000)
    },
    computed: {
      ...mapState({
        duration: "timerDuration",
        initial: "timerInitial",
        night: "isNight"
      }),
      down() {
        return (this.ms < this.duration) ?
          getTime(this.duration - this.ms) : "0:00"
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../variables.scss";

  .clock {
    position: relative;
    border-bottom: 2px solid $orange;

    text-align: center;
    padding: 1em 2em;
  }

  .day {
    color: $orange !important;
  }

  .night {
    border-bottom: 2px solid $grey;
  }

  .large {
    font-size: 2.4em;
    color: #888;
  }

  .sm {
    margin-left: 0.5em;
    font-size: 1.2em;
    font-weight: 400;
    color: #888;
  }
</style>
