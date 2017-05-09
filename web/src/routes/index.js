import Vue from "vue"
import Router from "vue-router"

import Landing from "./Landing"
import Game from "./Game"

Vue.use(Router)

export default new Router({
  routes: [{
    path: "/",
    name: "Landing",
    component: Landing
  }, {
    path: "/:room",
    name: "Game",
    component: Game
  }]
})
