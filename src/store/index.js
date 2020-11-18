import Vue from 'vue'
import Vuex from 'vuex'
import { UserData } from './User/UserData'
import { VatsimSSO } from './User/VatsimSSO'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    User: UserData,
    VatsimSSO: VatsimSSO
  }
})
