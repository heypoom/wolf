import Vue from "vue"
import VueFeathers from "vue-feathers"
import VueTouch from "vue-touch"

import App from "./components/App"
import router from "./routes"
import store from "./store"
import api from "./core/api"

Vue.config.productionTip = false

Vue.use(VueTouch)
Vue.use(VueFeathers, api)

window.api = api

export default new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: {App}
})
