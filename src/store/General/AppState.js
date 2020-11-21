// import store from "..";

export const AppState = {
  namespaced: true,

  state: {
    loadingContent: false,
  },

  mutations: {
    SET_LOADING(state) {
      state.loadingContent = true;
      localStorage.setItem('loadingContent', true);
    },
    UNSET_LOADING(state) {
      state.loadingContent = false;
      localStorage.setItem('loadingContent', false);
    }
  },

  getters: {},

  actions: {
    setLoading({ commit }, value) {
      if (value == true) {
        commit('SET_LOADING');
      } else {
        commit('UNSET_LOADING');
      }
    }
  }
}