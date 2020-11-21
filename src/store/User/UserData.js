import Axios from "axios";
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
    getFullName() {
      if (store.state.fname == null) {
        if (localStorage.getItem('user') !== null) {
          var userdata = JSON.parse(localStorage.getItem('user'))
          store.dispatch('User/setUser', userdata);
          return store.state.fname + " " + store.state.lname;
        }
        return null;
      } else {
        return store.state.fname + " " + store.state.lname;
      }
    },

    fetchUserData() {
      store.dispatch('AppState/setLoading', true);
      var params = {
        'api_token': localStorage.getItem('token'),
        'app_auth_token': process.env.VUE_APP_FRONTEND_KEY,
      };
      Axios.get(process.env.VUE_APP_API_URL + '/user', {
        params: params
      })
      .then((response) => {
        store.dispatch('User/setUser', response.data.user);
        store.dispatch('AppState/setLoading', false);
        return true;
      })
      .catch(() => {
        console.log('User is NOT authenticated');
        store.dispatch('VatsimSSO/logoutUser');
        store.dispatch('AppState/setLoading', false);
        return false;
      });
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