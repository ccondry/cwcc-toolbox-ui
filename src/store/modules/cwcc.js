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
  async disableVirtualTeam ({getters, commit, dispatch}, {team, showNotification = true}) {
    if (!team || !team.id) {
      throw new Error('disableVirtualTeam requires team object as input')
    }
    console.log('disableVirtualTeam', team.id, '...')
    dispatch('setWorking', {group: 'cwcc', type: 'virtualTeam', value: true})
    try {
      await dispatch('postData', {
        name: 'disable virtual team',
        endpoint: getters.endpoints.virtualTeam + '/' + team.id + '/disable',
        showNotification
      })
      console.log('disableVirtualTeam successful')
    } catch (e) {
      console.error('error disabling virtual team', team.id, e.message)
      // notify user
      Toast.open({
        duration: 8000,
        message: `disable virtual team ${team.id} failed: ${e.message}`,
        // position: 'is-bottom',
        type: 'is-danger'
      })
    } finally {
      dispatch('setWorking', {group: 'cwcc', type: 'virtualTeam', value: false})
    }
  },
  async enableVirtualTeam ({getters, commit, dispatch}, {team, showNotification = true}) {
    if (!team || !team.id) {
      throw new Error('enableVirtualTeam requires team object as input')
    }
    console.log('enableVirtualTeam', team.id, '...')
    dispatch('setWorking', {group: 'cwcc', type: 'virtualTeam', value: true})
    try {
      await dispatch('postData', {
        name: 'disable virtual team',
        endpoint: getters.endpoints.virtualTeam + '/' + team.id + '/enable',
        showNotification
      })
      console.log('enableVirtualTeam successful')
    } catch (e) {
      console.error('enableVirtualTeam', team.id, e.message)
      // notify user
      Toast.open({
        duration: 8000,
        message: `enable virtual team ${team.id} failed: ${e.message}`,
        // position: 'is-bottom',
        type: 'is-danger'
      })
    } finally {
      dispatch('setWorking', {group: 'cwcc', type: 'virtualTeam', value: false})
    }
  },
  async deleteVirtualTeam ({getters, commit, dispatch}, {team, showNotification = true}) {
    if (!team || !team.id) {
      throw new Error('deleteVirtualTeam requires team object as input')
    }
    console.log('deleteVirtualTeam', team.id, '...')
    dispatch('setWorking', {group: 'cwcc', type: 'virtualTeam', value: true})
    try {
      await dispatch('deleteData', {
        name: 'delete virtual team',
        endpoint: getters.endpoints.virtualTeam + '/' + team.id,
        showNotification
      })
      console.log('deleteVirtualTeam successful')
    } catch (e) {
      console.error('enableVirtualTeam', team.id, e.message)
      // notify user
      Toast.open({
        duration: 8000,
        message: `delete virtual team ${team.id} failed: ${e.message}`,
        // position: 'is-bottom',
        type: 'is-danger'
      })
    } finally {
      dispatch('setWorking', {group: 'cwcc', type: 'virtualTeam', value: false})
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
