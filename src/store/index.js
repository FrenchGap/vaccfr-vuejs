import Vue from 'vue'
import Vuex from 'vuex'
import { AppState } from './General/AppState'
import { UserData } from './User/UserData'
import { VatsimSSO } from './User/VatsimSSO'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  getters: {
  },
  actions: {
  },
  modules: {
    AppState: AppState,
    User: UserData,
    VatsimSSO: VatsimSSO
  }
})
