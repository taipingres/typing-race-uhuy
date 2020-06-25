import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rooms: [],
    username: localStorage.username,
  },
  mutations: {
    setRooms(state, payload) {
      state.rooms = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
