import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    room: {
      id: "",
      players: []
    },
    playerName: null,
    isWaiting: true
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
    }
  }
})


export default store
