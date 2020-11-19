import store from "..";

export const UserData = {
  namespaced: true,

  state: {
    fname: null,
    lname: null,
    vatsim_id: null,
    rank: null,
  },

  mutations: {
    SET_USER(state, user) {
      state.fname = user.fname;
      state.lname = user.lname;
      state.vatsim_id = user.vatsim_id;
      state.rank = user.atc_rating_short;
      localStorage.setItem('user', JSON.stringify(user));
    },
    DEL_USER(state) {
      state.fname = null;
      state.lname = null;
      state.vatsim_id = null;
      state.rank = null;
      localStorage.removeItem('user');
    }
  },

  getters: {
    getFullName(state) {
      if (state.fname == null) {
        if (localStorage.getItem('user') !== null) {
          var userdata = JSON.parse(localStorage.getItem('user'))
          store.dispatch('User/setUser', userdata);
          return state.fname + " " + state.lname;
        }
        return null;
      } else {
        return state.fname + " " + state.lname;
      }
    },
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