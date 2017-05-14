<template lang="pug">
  .canvas
    .crow(v-for="(row, y) in canvas")
      .pixel(:class="{'brush': color}" @click="apply(y, x)" v-for="(color, x) in row")
</template>

<script>
  import Vue from "vue"

  const Canvas = (x, y = x) => [...Array(x)].map(() => new Uint8Array(y))

  export default {
    name: "wolf-draw",
    data: () => ({canvas: Canvas(17)}),
    methods: {
      apply(x, y) {
        y = parseInt(y, 10)
        const row = this.canvas[x]
        row[y] = row[y] === 0 ? 5 : 0
        Vue.set(this.canvas, x, row)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../variables.scss";

  .canvas {
    margin: 1.5em auto;
    width: 80%;
    max-width: 256px;
    background: #f8f8f8;
    box-shadow: $zLite;
    cursor: pointer;
    border-bottom: 2px solid #3498db;

    .crow {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .pixel {
    width: 1em;
    height: 1em;
  }

  .pixel.brush {
    background: #3498db;
  }
</style>
