import lazyLoading from './lazyLoading'

const path = '/cwcc/admin'

export default {
  name: 'Admin',
  meta: {
    icon: 'folder',
    iconExpanded: 'folder-open',
    expanded: false
  },
  children: [
    {
      name: 'Usage',
      path: path + '/usage',
      component: lazyLoading('admin/usage'),
      meta: {
        icon: 'finance'
      }
    },
    {
      name: 'Users',
      path: path + '/users',
      component: lazyLoading('admin/users'),
      meta: {
        icon: 'account-multiple'
      }
    }
  ]
}
