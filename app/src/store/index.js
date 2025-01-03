import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    isAuthenticated: false
  },
  getters: {
  },
  mutations: {
    token(state, payload) {
      state.token = payload;
      state.isAuthenticated = true;
    },
  },
  actions: {
  },
  modules: {
  }
})
