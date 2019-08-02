<template>
  <div id="app">
    <b-loading :is-full-page="true" :active="!authenticated && production" :can-cancel="false"></b-loading>
    <div v-if="authenticated || !production">
      <div v-if="!endpointsLoaded">
        <!-- endpoints have not finished loading yet -->
        <b-loading :is-full-page="true" :active="!endpointsLoaded && production" :can-cancel="false"></b-loading>
      </div>
      <div v-if="endpointsLoaded || !production">
        <nprogress-container></nprogress-container>
        <navbar :show="true" :menu-filter.sync="menuFilter"></navbar>
        <sidebar :show="sidebar.opened && !sidebar.hidden" :menu-filter="menuFilter"></sidebar>
        <app-main></app-main>
      </div>
    </div>
  </div>
</template>

<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import { Navbar, Sidebar, AppMain } from 'components/layout/'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      menuFilter: '',
      production: process.env.NODE_ENV === 'production'
    }
  },

  components: {
    Navbar,
    Sidebar,
    AppMain,
    NprogressContainer
  },

  async beforeMount () {
    const { body } = document
    const WIDTH = 768
    const RATIO = 3

    const handler = () => {
      if (!document.hidden) {
        let rect = body.getBoundingClientRect()
        let isMobile = rect.width - RATIO < WIDTH
        this.toggleDevice(isMobile ? 'mobile' : 'other')
        this.toggleSidebar({
          opened: !isMobile
        })
      }
    }

    // add event listeners for DOM events
    document.addEventListener('visibilitychange', handler)
    window.addEventListener('DOMContentLoaded', handler)
    window.addEventListener('resize', handler)

    // check the JWT in localstorage to see if the user is already logged in
    // try {
    console.log('checking login...')
    await this.checkLogin()
    console.log('checking login done.')
    if (this.authenticated || !this.production) {
      // logged in
      // console.log('getting instances...')
      // await this.getInstances(false)
      // console.log('getting instances done.')
      console.log('getting endpoints...')
      await this.getEndpoints(false)
      console.log('getting endpoints done.')
      // load the dcloud session details
      // await this.getSession(false)
    } else {
      // not logged in
    }
      // logged in
    // } catch (e) {
      // not logged in, so go to login page
      // return router.push('Login')
    // }

    // if (this.authEnabled === true) {
    //   try {
    //     await this.checkLogin()
    //   } catch (e) {
    //     console.log(e.message)
    //     console.log('this.$route', this.$route)
    //     if (this.$route.name === 'Password Reset') {
    //       // leave it
    //     } else {
    //       // go to login screen
    //       this.$router.push('Login')
    //     }
    //   }
    // }
  },

  async mounted () {
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'authEnabled',
      'authenticated',
      'loading',
      'endpoints',
      'endpointsLoaded'
      // 'instancesLoaded'
    ])
  },

  methods: {
    ...mapActions([
      'toggleDevice',
      'toggleSidebar',
      'checkLogin',
      'getEndpoints',
      'getSession'
      // 'getInstances'
    ])
  },
  watch: {
    async authenticated (val, oldVal) {
      // if user goes from logged in to logged out, forward them to the login page
      if (oldVal === true && val === false) {
        // if development, don't forward them
        if (this.production) {
          window.location = '/auth/login?destination=' + window.location
        }
      }
      // if the user logged in, load endpoints
      // if (oldVal === false && val === true) {
      //   // get instances
      //   await this.getInstances(false)
      //   // get endpoints
      //   await this.getEndpoints()
      //   // get dCloud session information
      //   await this.getSession(false)
      // }
    }
  }
}
</script>

<style lang="scss">
// @import '~animate.css';
// .animated {
//   animation-duration: .377s;
// }

@import '~bulma';

$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome';

html {
  background-color: whitesmoke;
}

.nprogress-container {
  position: fixed !important;
  width: 100%;
  height: 50px;
  z-index: 2048;
  pointer-events: none;

  #nprogress {
    $color: #48e79a;

    .bar {
      background: $color;
    }
    .peg {
      box-shadow: 0 0 10px $color, 0 0 5px $color;
    }

    .spinner-icon {
      border-top-color: $color;
      border-left-color: $color;
    }
  }
}
</style>
