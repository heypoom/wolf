import Vue from "vue"
import vueFeathers from "vue-feathers"

import App from "./components/App"
import router from "./routes"
import store from "./store"
import api from "./api"

Vue.config.productionTip = false

Vue.use(vueFeathers, api)

window.api = api

export default new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: {App}
})
