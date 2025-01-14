import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    isAuthenticated: false,
    self: {
      name: null,
      email: null,
      phone: null,
      capacityUsed: null
    }
  },
  getters: {
  },
  mutations: {
    token(state, payload) {
      state.token = payload;
      state.isAuthenticated = true;
    },
    self(state, selfJson){
      state.self.name = selfJson.name;
      state.self.email = selfJson.email;
      state.self.phone = selfJson.phoneNumber
      state.self.capacityUsed = selfJson.capacityUsed
    }
  },
  actions: {
  },
  modules: {
  }
})
