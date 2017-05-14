<template lang="pug">
  div
    template(v-if="!front")
      img.torch(src="../assets/shaker.svg")
      h1 Welcome to Werewolf Village!
      h2 Please, enter your name to join <b>{{code}}</b>.
    form(@submit.prevent.once="join")
      .form-group.row(:class="{'has-danger': joinError}" v-if="front")
        .col-12
          input.form-control(:class="fErr" v-model="joinCode" placeholder="Enter the Village Code")
          .form-control-feedback(v-if="joinError") {{joinError}}
      .form-group.row(:class="{'has-danger': joinError}")
        .col-12
          input.form-control(:class="fErr" v-model="newName" placeholder="Enter Your Name")
          .form-control-feedback(v-if="joinError && !front") {{joinError}}
      input.btn.b1.btn-light(type="submit" value="Join")
      .btn(v-if="front" @click="back") Back
</template>

<script>
  import api from "../core/api"

  export default {
    name: "wolf-join",
    props: ["code", "front", "back"],
    data: () => ({
      newName: "",
      joinCode: "",
      joinError: false
    }),
    computed: {
      fErr() {
        return {"form-control-danger": this.joinError}
      }
    },
    methods: {
      join() {
        const code = this.front ? this.joinCode : this.code
        this.$store.commit("reset")

        api.io.emit("room", code)
        api.service("room").patch(code, {name: this.newName}).then(room => {
          this.$store.commit("setName", this.newName)
          this.$store.commit("toggleHost", false)
          this.$store.commit("updateRoom", room)

          if (this.front) {
            this.$router.push(`/${this.joinCode}`)
          }
        }).catch(err => {
          console.error(err.message)
          this.joinError = err.message
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../variables.scss";

  form {
    margin-top: 1.8em;
  }

  .torch {
    width: 6em;
    height: 6em;
    padding: 1em;
    background: white;
    border: 2px solid $primary;
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
</style>
