<template lang="pug">
  .z1
    .show(v-show="showRole" @click="showRole = false")
      .roleIcon(:class="role")
      h1 You are the {{role}}!
      h2 {{roleDesc}}
    .hide(v-show="!showRole")
      img.tapIcon(src="../assets/tap.png" @click="showRole = true")
      h1 Tap to show role
</template>

<script>
  export default {
    name: "wolf-role",
    props: ["role"],
    data: () => ({
      showRole: false
    }),
    computed: {
      roleDesc() {
        if (this.role === "werewolf") {
          return "Eat a villager each night. Don't let them know."
        }
        return "Find the werewolves and lynch them."
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../variables.scss";

  .z1 {
    text-align: center;
    padding: 2em;
  }

  h1 {
    font-size: 1.7em;
    color: #888;
  }

  .roleIcon {
    margin: 0 auto;
    margin-bottom: 1.3em;

    width: 6.5em;
    height: 6.5em;

    background-size: 4em;
    background-position: center;
    background-repeat: no-repeat;

    border: 2px solid $lightGreen;
    border-radius: 50%;
    box-shadow: $zLite;
  }

  .roleIcon.werewolf {
    background-image: url("../assets/werewolf.png");
    background-size: 4.5em;
  }

  .roleIcon.villager {
    background-image: url("../assets/villa.png");

  }

  .tapIcon {
    width: 4.5em;
    height: 4.5em;
    padding: 0.6em;
    background: white;
    border: 2px solid $lightGreen;
    border-radius: 50%;
    box-shadow: $zLite;
    margin: 0 auto;
    margin-bottom: 1.3em;
  }

  h2 {
    margin: 0 auto;
    margin-top: 0.7em;
    font-size: 1em;
    line-height: 1.5em;
    width: 70%;
    color: #888;
  }
</style>
