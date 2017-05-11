<template lang="pug">
  .z1
    .tapLabel(@click="showRole = !showRole") Tap icon to {{showRole ? "hide" : "show"}}
    .show(v-show="showRole")
      .roleIcon(:class="role" @click="showRole = false")
      h1 You are the {{role}}!
      h2 {{roleDesc}}
    .hide(v-show="!showRole")
      img.tapIcon(src="../assets/tap.png" @click="showRole = true")
      h1 Tap to show role
</template>

<script>
  const roleDesc = {
    werewolf: "Eat a villager each night. Don't let them know.",
    villager: "Find the werewolves and lynch them.",
    seer: "Each night, point at a player and learn if they are on the villager or the werewolf team."
  }

  export default {
    name: "wolf-role",
    props: ["role"],
    data: () => ({
      showRole: false
    }),
    computed: {
      roleDesc() {
        return roleDesc[this.role] || roleDesc.villager
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../variables.scss";

  .z1 {
    position: relative;
    text-align: center;
    padding: 2em;
  }

  h1 {
    font-size: 1.7em;
    color: #888;
  }

  .tapLabel {
    position: absolute;
    top: 0;
    right: 0;
    text-transform: uppercase;
    background: #f8f8f8;
    font-size: 0.8em;
    padding: 0.2em 0.8em;
    color: #555;
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

  .roleIcon.seer {
    // background-image: url("../assets/seer.png");
    background-image: url("../assets/wolf-seer.jpg");
    background-size: 3.7em;
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
