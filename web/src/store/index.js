import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    room: {
      id: "",
      players: []
    },
    roles: {},
    playerName: null,
    isWaiting: true,
    isHost: false
  },
  getters: {
    player: state => state.room.players.find(p => p.name === state.playerName),
    role: state => state.room.players.find(p => p.name === state.playerName).role
  },
  mutations: {
    setName(state, name) {
      state.playerName = name
    },
    updateRoom(state, room) {
      state.room = room
    },
    toggleWait(state, value = !state.isWaiting) {
      state.isWaiting = value
    },
    updatePlayers(state, players) {
      state.room = {...state.room, players}
    },
    toggleHost(state, value = !state.isHost) {
      state.isHost = value
    },
    setRoles(state, roles) {
      state.roles = roles
    }
  },
  plugins: [createPersistedState()]
})


export default store
