import lazyLoading from './lazyLoading'

const path = '/cwcc/main'

export default {
  name: 'Main',
  meta: {
    icon: 'folder',
    iconExpanded: 'folder-open',
    expanded: false
  },
  children: [
    {
      name: 'Home',
      path: path + '/home',
      meta: {
        icon: 'home',
        description: 'home'
      },
      component: lazyLoading('main/home')
    },
    {
      name: 'Agent',
      path: path + '/agent',
      meta: {
        icon: 'account-multiple',
        description: 'Agent Desktop'
      },
      component: lazyLoading('main/agent')
    },
    {
      name: 'Demo',
      path: path + '/demo',
      meta: {
        icon: 'account-star',
        description: 'Demo Website'
      },
      component: lazyLoading('main/demo')
    }
  ]
}
