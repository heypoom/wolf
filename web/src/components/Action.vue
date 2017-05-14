<template lang="pug">
  .z1
    .tapLabel Role Action
    .action
      h2 {{roles[role]}}
</template>

<script>
  import roles from "../core/roles"

  export default {
    name: "wolf-action",
    props: ["role"],
    data: () => ({roles})
  }
</script>

<style lang="scss" scoped>
  @import "../variables.scss";

  .z1 {
    text-align: center;
  }

  h2 {
    color: #888;
    margin-top: 0.5em;
    line-height: 1.3em;
    font-size: 1.3em;
  }
</style>
