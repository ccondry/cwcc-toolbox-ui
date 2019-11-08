import * as types from '../mutation-types'
import { ToastProgrammatic as Toast } from 'buefy'

const state = {
  virtualTeams: []
}

const getters = {
  virtualTeams: state => state.virtualTeams
}

const mutations = {
  [types.SET_VIRTUAL_TEAMS] (state, data) {
    state.virtualTeams = data
  }
}

const actions = {
  async getVirtualTeams ({getters, commit, dispatch}, showNotification = true) {
    console.log('getVirtualTeams...')
    dispatch('setLoading', {group: 'cwcc', type: 'virtualTeam', value: true})
    try {
      await dispatch('loadToState', {
        name: 'virtual teams',
        endpoint: getters.endpoints.virtualTeam,
        mutation: types.SET_VIRTUAL_TEAMS,
        showNotification
      })
      console.log('getVirtualTeams successful')
    } catch (e) {
      console.error('error loading virtual teams', e.message)
      // notify user
      Toast.open({
        duration: 5000,
        message: `load virtual teams failed`,
        // position: 'is-bottom',
        type: 'is-danger'
      })
    } finally {
      dispatch('setLoading', {group: 'cwcc', type: 'virtualTeam', value: false})
    }
  },
  async disableVirtualTeam ({getters, commit, dispatch}, {id, showNotification = true}) {
    console.log('disableVirtualTeam', id, '...')
    dispatch('setWorking', {group: 'cwcc', type: 'virtualTeam', value: true})
    try {
      await dispatch('postData', {
        name: 'disable virtual team',
        endpoint: getters.endpoints.virtualTeam + '/' + id + '/disable',
        showNotification
      })
      console.log('disableVirtualTeam successful')
    } catch (e) {
      console.error('error disabling virtual team', id, e.message)
      // notify user
      Toast.open({
        duration: 8000,
        message: `disable virtual team ${id} failed: ${e.message}`,
        // position: 'is-bottom',
        type: 'is-danger'
      })
    } finally {
      dispatch('setWorking', {group: 'cwcc', type: 'virtualTeam', value: false})
    }
  },

}

export default {
  state,
  mutations,
  actions,
  getters
}
