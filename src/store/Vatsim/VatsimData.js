export const VatsimData = {
  namespaced: true,

  state: {
    onlineATC: {},
    onlineATCLastUpdated: "--:--z",
  },

  mutations: {
    SET_ONLINEATC(state, data) {
      state.onlineATC = data;
      var t = new Date();
      state.onlineATCLastUpdated = `${t.getUTCHours()}:${t.getUTCMinutes()}z`;
    }
  },

  getters: {
    getOnlineATCList(state) {
      return state.onlineATC;
    },
    getOnlineATCListUpdateTime(state) {
      return state.onlineATCLastUpdated;
    }
  },

  actions: {
    setOnlineATC({ commit }, data) {
      commit('SET_ONLINEATC', data);
    },
  },
}