import * as types from '../../mutation-types'
import main from './main.js'
// import finesse from './finesse.js'
import admin from './admin.js'
// import demoSelectors from './demo-selectors.js'
// import demos from './demos.js'

const state = {
  items: [
    main,
    // demoSelectors,
    // demos,
    // finesse,
    admin
  ]
}

const mutations = {
  [types.EXPAND_MENU] (state, menuItem) {
    if (menuItem.index > -1) {
      if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
        state.items[menuItem.index].meta.expanded = menuItem.expanded
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded
    }
  }
}

export default {
  state,
  mutations
}
