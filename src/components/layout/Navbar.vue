<template>
  <b-navbar class="app-navbar">
        <template slot="start">
          <b-navbar-item tag="div">
            <a href="/">dCloud Toolbox</a>&nbsp;- Cisco Webex Contact Center v2
          </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div" v-if="authenticated">
              {{ user.username }} ({{ user.id }})&nbsp;&nbsp;
              <a @click="clickLogout">Log Out</a>
            </b-navbar-item>
            <b-navbar-item tag="div" v-else>
              <a @click="clickLogin">Log in</a>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      filter: ''
    }
  },

  props: {
    show: Boolean,
    menuFilter: String
  },

  mount () {
    if (!this.authenticated && !this.isProduction) {
      // pop development login modal
      this.clickLogin()
    }
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'authenticated',
      'user',
    ])
  },

  methods: {
    ...mapActions([
      'logout',
      'setJwt'
    ]),
    clickLogout () {
      this.logout()
    },
    clickLogin () {
      this.$buefy.dialog.prompt({
        message: `Enter your JWT`,
        inputAttrs: {
          placeholder: 'JWT'
        },
        onConfirm: (value) => {
          this.setJwt(value)
        }
      })
    }
  },

  watch: {
    filter (val) {
      this.$emit('update:menuFilter', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-navbar {
  color: #28374B;
  font-weight: bold;
  a {
    color: #7957d5;
  }
  position: fixed;
  min-width: 100%;
  z-index: 4;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);

  .nav {
    min-height: 0em;
  }
}
</style>
