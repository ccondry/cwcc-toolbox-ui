import * as types from '../mutation-types'
import {load} from '../../utils'

const state = {
  device: {
    isMobile: false,
    isTablet: false
  },
  sidebar: {
    opened: false,
    hidden: false
  },
  effect: {
    translate3d: true
  },
  sessionId: '',
  datacenter: ''
}

const mutations = {
  [types.TOGGLE_DEVICE] (state, device) {
    state.device.isMobile = device === 'mobile'
    state.device.isTablet = device === 'tablet'
  },

  [types.TOGGLE_SIDEBAR] (state, config) {
    if (state.device.isMobile && config.hasOwnProperty('opened')) {
      state.sidebar.opened = config.opened
    } else {
      state.sidebar.opened = true
    }

    if (config.hasOwnProperty('hidden')) {
      state.sidebar.hidden = config.hidden
    }
  },

  [types.SWITCH_EFFECT] (state, effectItem) {
    for (let name in effectItem) {
      state.effect[name] = effectItem[name]
    }
  },

  [types.SET_SESSION] (state, data) {
    state.sessionId = data.sessionId
    state.datacenter = data.datacenter
  }
}

const actions = {
  async getEndpoints ({getters, commit, dispatch}, showNotification = true) {
    // production / development base API URL
    const url = getters.isProduction ? '/api/v1/cwcc/endpoints' : 'http://localhost:3049/api/v1/cwcc/endpoints'
    // mark loading started
    dispatch('setLoading', {group: 'app', type: 'endpoints', value: true})
    try {
      console.log('getting endpoints')
      // get endpoints from API server
      const response = await load(getters.instance, getters.jwt, url)
      // set the endpoints data in state
      await commit(types.SET_ENDPOINTS, response.data)
      // mark endpoints as loaded
      commit(types.SET_ENDPOINTS_LOADED, true)
    } catch (e) {
      console.log(e)
      // failed to get endpoints
      if (e.response.status === 401 || e.response.status === 403) {
        // JWT expired
        console.log('JWT expired. logging out user locally.')
        dispatch('unsetJwt')
      } else {
        // other error
        console.error(`error during GET endpoints`, e)
        dispatch('errorNotification', {title: `Failed to GET endpoints`, error: e})
      }
    } finally {
      // mark loading done
      dispatch('setLoading', {group: 'app', type: 'endpoints', value: false})
    }
  }
}

export default {
  state,
  actions,
  // getters,
  mutations
}
