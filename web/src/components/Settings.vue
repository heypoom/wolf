<template lang="pug">
  .z1.settings
    .label Roles. Players: {{room.players.length}}
    .row.roles
      .col-sm-6(v-for="(desc, role) in allRoles")
        .role
          .minus(@click="decr(role)") -
          b.sm(@click="detail(desc)") {{role}} ({{count[role]}})
          .plus(@click="incr(role)") +
</template>

<script>
  import allRoles from "../core/roles"

  export default {
    name: "wolf-settings",
    props: ["room"],
    data: () => ({
      count: Object.keys(allRoles).reduce((x, y) => ({...x, [y]: 0}), {}),
      allRoles
    }),
    computed: {
      assigned() {
        return Object.values(this.count).reduce((a, b) => a + b, 0)
      }
    },
    methods: {
      detail(desc) {
        alert(desc)
      },
      decr(role) {
        if (this.count[role] > 0) {
          this.count[role] -= 1
          this.$store.commit("setRoles", this.count)
        }
      },
      incr(role) {
        const assigned = Object.values(this.count).reduce((a, b) => a + b, 0)
        const unfulfilled = (this.room.players.length - assigned)
        const count = this.count[role]

        if (count <= unfulfilled) {
          if (this.room.players.length > assigned) {
            this.count[role] += 1
            this.$store.commit("setRoles", this.count)
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../variables.scss";

  .settings {
    position: relative;

    margin: 1.5em auto;
    text-align: center;
    max-width: 500px;

    padding: 2.5em 1em;
    box-shadow: $zLite;
    background: white;
  }

  .label {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 0.85em;
    color: #888;
    text-transform: uppercase;
    padding: 0.3em 0.6em;
    background: #f8f8f8;
  }

  .role {
    position: relative;
    margin: 0 auto;
    margin-bottom: 1.5em;
    max-width: 10em;
  }

  .sm {
    line-height: 2.15em;
    color: #888;
  }

  .minus, .plus {
    position: absolute;
    top: 0;

    color: #888;
    font-weight: 400;
    line-height: 1.7em;

    width: 2em;
    height: 2em;
    background: white;
    border: 2px solid #888;
    border-radius: 50%;
    box-shadow: $zLite;
  }

  .minus {
    left: 0;
  }

  .plus {
    right: 0;
  }
</style>
