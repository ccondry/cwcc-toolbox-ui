<template>
  <div>
    <!-- Loading Indicator -->
    <b-loading :is-full-page="false" :active="loading.app.user || working.app.user || working.user.provision || loading.user.provision" :can-cancel="false"></b-loading>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">
          <h1 class="title">Provisioning</h1>
          <b-field>
            <button class="button is-primary" @click="clickProvision" :disabled="working.user.provision">Provision Me!</button>
          </b-field>
          <p>
            Overall Status:
            <strong>
              {{ loading.user.provision ? 'Loading...' : provisionStatus.status }}
            </strong>
          </p>
          <p>
            CUCM Sync Status:
            <strong>{{ provisionStatus.cucmLdapSync }}</strong>
          </p>
          <p>
            UCCX Sync Status:
            <strong>{{ provisionStatus.uccxUserSync }}</strong>
          </p>
          <p>
            Progress:
            <strong>{{ progress }}%</strong>
            <progress class="progress is-success" :value="progress" max="100">{{ progress }}%</progress>
          </p>
        </article>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
  },

  data () {
    return {
      interval: null,
      delay: 10
    }
  },

  mounted () {
    // get status once at first mount
    this.getProvisionStatus(false)
  },

  beforeRouteLeave (to, from, next) {
    // stop the interval when navigating away from this view
    clearInterval(this.interval)
    next()
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      // check if status is not complete yet
      if (vm.provisionStatus && vm.provisionStatus.status !== 'complete') {
        // get updated data now
        vm.getProvisionStatus(false)
        // set up the interval to get new data every <delay> seconds
        vm.interval = setInterval(() => {
          vm.getProvisionStatus(false)
        }, vm.delay * 1000)
      }
    })
  },

  methods: {
    ...mapActions([
      'getProvisionStatus',
      'provisionUser'
    ]),
    async clickProvision () {
      console.log('clicked provision')
      // if user is admin using switch-user, don't prompt them for the user's
      // password, which they should not know
      if (this.user.suJwt) {
        // wait for provision action to start
        await this.provisionUser({password: 'ignore'})
        // get provision status now after a moment
        this.getProvisionStatus(false)
        // set up the interval to get new data every <delay> seconds
        clearInterval(this.interval)
        this.interval = setInterval(() => {
          this.getProvisionStatus(false)
        }, this.delay * 1000)
        return
      }
      this.$dialog.prompt({
        message: `Please enter your password to provision your UCCX department:`,
        inputAttrs: {
          placeholder: 'your dCloud Toolbox password',
          type: 'password'
        },
        onConfirm: async (password) => {
          // wait for provision action to start
          await this.provisionUser({password})
          // get provision status now
          this.getProvisionStatus(false)
          // set up the interval to get new data every <delay> seconds
          clearInterval(this.interval)
          this.interval = setInterval(() => {
            this.getProvisionStatus(false)
          }, this.delay * 1000)
          // this.$toast.open(`Your name is: ${value}`)
        }
      })
    },
    clickStatus () {
      console.log('clicked get provision status')
      // this.getProvisionStatus({showNotification: true})
    }
  },

  computed: {
    ...mapGetters([
      'loading',
      'working',
      'provisionStatus',
      'user'
    ]),
    copy () {
      // make a copy of the status object
      let ret = JSON.parse(JSON.stringify(this.provisionStatus))
      // remove fields we don't want to count
      delete ret.userId
      delete ret.status
      delete ret.cucmLdapSync
      return ret
    },
    progress () {
      if (!this.provisionStatus) {
        return 0.0
      }
      // determine total number of tasks
      // count the remaining fields
      const keys = Object.keys(this.copy)
      // let count = keys.length
      // there are 25 tasks for the server to complete
      let count = 25
      // keep track of the number of completed tasks
      let totalDone = 0
      // iterate over object properties
      for (const key of keys) {
        // look for keys that are true
        if (this.provisionStatus[key] === true) {
          totalDone++
        } else if (key === 'uccxUserSync' && this.provisionStatus[key] === 'All agents synced successfully.') {
          // and also this specific key-value pair
          totalDone++
        }
      }
      // return percentage done
      return 100.0 / count * totalDone
    }
  },

  watch: {
    provisionStatus (val, oldVal) {
      // provision status updated
      // did it go to 'complete'? we should stop the interval...
      if (val.status === 'complete') {
        clearInterval(this.interval)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
