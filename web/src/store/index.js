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
  mutations: {
    setName(state, name) {
      state.playerName = name
    },
    enterRoom(state, room) {
      state.room = room
    },
    toggleWait(state, value) {
      state.isWaiting = value || !state.isWaiting
    },
    addPlayers(state, player) {
      state.room = {
        ...state.room,
        players: [...state.room.players, player]
      }
    }
  }
})


export default store
