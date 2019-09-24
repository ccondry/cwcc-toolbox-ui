import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions,
  getters,
  modules,
  state: {
    demoConfigId: 'cwcc',
    isProduction: process.env.NODE_ENV === 'production',
    endpointsLoaded: false,
    endpoints: {},
    pkg,
    working: {
      admin: {},
      app: {},
      images: {},
      cce: {},
      cvp: {},
      duo: {},
      facebook: {},
      finesse: {},
      templates: {},
      user: {},
      session: {},
      upstream: {}
    },
    loading: {
      admin: {},
      app: {},
      images: {},
      cce: {},
      cvp: {},
      duo: {},
      facebook: {},
      finesse: {},
      templates: {},
      user: {},
      session: {},
      upstream: {}
    }
  },
  mutations
})

export default store
