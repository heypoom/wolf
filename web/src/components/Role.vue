<template lang="pug">
  .z1
    .tapLabel(@click="showRole = !showRole") {{showRole ? "Tap icon to hide" : "Character Role"}}
    div(v-show="showRole")
      .roleIcon(:class="role" @click="showRole = false")
      h1 You are the <b>{{role}}</b>!
      h2 {{roleDesc}}
    div(v-show="!showRole")
      svg.tapIcon(viewBox="0 0 36 32" @click="showRole = true")
        path(d="M17 9.328c0.625-0.772 1-1.756 1-2.828 0-2.484-2.016-4.5-4.5-4.5s-4.5 2.016-4.5 4.5c0 1.072 0.375 2.056 1 2.828v-2.838c0-1.928 1.566-3.491 3.5-3.491 1.928 0 3.5 1.563 3.5 3.491v2.838zM19.497 30c4.144 0 7.5-3.584 7.5-7.5 0 0 0 2.313 0 0v-5.997c0-0.828-0.666-1.503-1.5-1.503-0.828 0-1.5 0.672-1.5 1.503v0.497h-1v-2.494c0-0.831-0.666-1.506-1.5-1.506-0.828 0-1.5 0.672-1.5 1.506v1.494h-1v-2.494c0-0.831-0.666-1.506-1.5-1.506-0.828 0-1.5 0.672-1.5 1.506v3.494h-1v-10.494c0-0.831-0.666-1.506-1.5-1.506-0.828 0-1.5 0.666-1.5 1.506v11.294c-2.059-2.2-4.769-4.622-5.878-3.503-1.087 1.094 1.716 4.106 5.625 10.688 1.766 2.966 3.997 5.016 7.753 5.016v0zM28 22.5c0 4.694-3.806 8.5-8.5 8.5-3.113 0-6.397-1.453-8.659-5.572-3.263-5.947-7.438-9.844-5.45-11.831 1.422-1.422 3.653-0.056 5.609 1.772v0-8.859c0-1.394 1.119-2.509 2.5-2.509 1.391 0 2.5 1.122 2.5 2.509v4.991c0.419-0.313 0.938-0.497 1.5-0.497 1.081 0 1.994 0.678 2.347 1.628 0.441-0.391 1.019-0.628 1.653-0.628 1.391 0 2.5 1.119 2.5 2.497v0.012c0.419-0.313 0.938-0.497 1.5-0.497 1.391 0 2.5 1.119 2.5 2.5v5.984z")
      .tapToShow Tap to show role
</template>

<script>
  import roleDesc from "../core/roles"

  export default {
    name: "wolf-role",
    props: ["role"],
    data: () => ({
      showRole: false,
      roles: roleDesc
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
    padding: 1.7em 0;
  }

  h1 {
    color: #888;
    font-size: 1.7em;
  }

  h2 {
    margin: 0 auto;
    font-size: 1em;
    line-height: 1.5em;
    width: 70%;
    color: #888;
  }

  .tapToShow {
    color: #888;
    font-size: 1.25em;
    line-height: 1em;
    text-transform: uppercase;
  }

  svg.tapIcon {
    width: 4em;
    height: 4em;
    padding: 0.4em;
    background: white;
    fill: #888;
    border: 2px solid $primary;
    border-radius: 50%;
    box-shadow: $zLite;
    margin: 0 auto;
    margin-bottom: 0.7em;
    cursor: pointer;
  }

  .roleIcon {
    margin: 0 auto;
    margin-bottom: 1em;
    cursor: pointer;

    width: 6.5em;
    height: 6.5em;

    background-size: 4em;
    background-position: center;
    background-repeat: no-repeat;

    border: 2px solid $primary;
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
</style>
