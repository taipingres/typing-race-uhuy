import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedin: null,
  },
  mutations: {
    SET_ISLOGGEDIN(state, payload) {
      state.isLogin = payload;
    },
  },
  actions: {
    checkLogin({ commit }) {
      if (localStorage.isloggedin) {
        commit('SET_ISLOGGEDIN', localStorage.isloggedin);
      }
    },
  },
  modules: {
  },
});
