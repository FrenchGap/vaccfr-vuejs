export const UserData = {
  namespaced: true,

  state: {
    user: {}
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    DEL_USER(state) {
      state.user = {};
      localStorage.removeItem('user');
    }
  },

  actions: {
    setUser({ commit }, userdata) {
      commit('SET_USER', userdata);
    },

    delUser({ commit }) {
      commit('DEL_USER');
    }
  }
}