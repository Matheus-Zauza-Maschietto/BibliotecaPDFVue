import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null
  },
  getters: {
  },
  mutations: {
    token(state, payload) {
      state.token = payload;
    },
  },
  actions: {
  },
  modules: {
  }
})
