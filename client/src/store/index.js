import Vue from 'vue';
import Vuex from 'vuex';
import socket from '@/config/socket';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rooms: [],
    username: localStorage.username,
    isLoggedin: null,
    soal: [],
    countDown: null,
  },
  mutations: {
    setRooms(state, payload) {
      state.rooms = payload;
    },
    setSoal(state, payload) {
      state.soal = payload;
    },
    SET_ISLOGGEDIN(state, payload) {
      state.isLogin = payload;
    },
    SET_COUNTDOWN(state, payload) {
      state.countDown = payload;
    },
  },
  actions: {
    checkLogin({ commit }) {
      if (localStorage.isloggedin) {
        commit('SET_ISLOGGEDIN', localStorage.isloggedin);
      }
    },
    getRooms(context) {
      socket.emit('getRooms', context.state.rooms);
    },
  },
  modules: {
  },
});
