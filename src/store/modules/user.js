import * as types from '../mutation-types'

const state = {
  user: {}
}

const getters = {
  user: state => state.user
}

const mutations = {
  [types.SET_USER] (state, data) {
    state.user = data
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions,
  getters
}
