import Axios from "axios";
import store from "..";

export const Events = {
  namespaced: true,

  state: {
    events: {}
  },

  mutations: {
    SET_EVENTS(state, events) {
      state.events = events;
    },

    DEL_EVENTS(state) {
      state.events = {};
    }
  },

  getters: {
    async fetchEvents() {
      var params = {
        'app_auth_token': process.env.VUE_APP_FRONTEND_KEY,
      };
      var resultingState = await Axios.get(process.env.VUE_APP_API_URL + '/events', {
        params: params
      })
      .then((response) => {
        store.dispatch('Events/setEvents', response.data.events);
        return true;
      })
      .catch(() => {
        console.log('User is NOT authenticated');
        store.dispatch('VatsimSSO/logoutUser');
        return false;
      });
      return resultingState;
    }
  },

  actions: {
    setEvents({ commit }, events) {
      commit('SET_EVENTS', events);
    },
    
    delEvents({ commit }) {
      commit('DEL_EVENTS');
    }
  }
}