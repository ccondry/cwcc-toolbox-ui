<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-12">
        <article class="tile is-child box">
          <h1 class="title">Welcome</h1>
          <b-field>
            <p>
              Welcome to the Cisco Webex Contact Center Demo on dCloud.
            </p>
          </b-field>
          <b-field>
            <p>
              Click this button to get support, ask questions, and suggest
              new features:
            </p>
          </b-field>
          <b-field>
            <button class="button is-success" @click.prevent="showDialog" >
              Join Support Room
            </button>
          </b-field>
        </article>
      </div>
    </div>

    <div v-if="loading.user.provision">
      <div class="tile is-ancestor">
        <div class="tile is-parent is-12">
          <article class="tile is-child box">
            <h1 class="title">Loading...</h1>
          </article>
        </div>
      </div>
    </div>

    <div v-if="!loading.user.provision">
      <!-- done loading -->
      <div class="tile is-ancestor" v-if="!isProvisioned">
        <!-- user not provisioned - show provision button -->
        <div class="tile is-parent is-12">
          <article class="tile is-child box">
            <h1 class="title">Start</h1>
            <b-field>
              <p>
                Your account is not provisioned for this demo yet. Would you like
                to provision it now?
              </p>
            </b-field>
            <b-field>
              <button class="button is-success" @click.prevent="clickProvision" >
                Yes, Provision Me
              </button>
            </b-field>
          </article>
        </div>
      </div>

      <!-- user is provisioned - show agent info -->
      <div class="tile is-ancestor" v-if="isProvisioned">
        <div class="tile is-parent">
          <article class="tile is-child box is-horizontal">
            <h1 class="title">Agents</h1>
            <div class="content">
              <agents :user="user" />
            </div>
          </article>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Agents from '../../components/agents.vue'

export default {
  components: {
    Agents
  },

  data () {
    return {
      agents: [
        {
          picture: 'https://mm.cxdemo.net/static/images/cumulus/common/author1.png',
          username: 'sjeffers1234@dcloud.cisco.com',
          password: 'C1sco12345',
          extension: '10801234',
          name: 'Sandra Jefferson'
        },
        {
          picture: 'https://mm.cxdemo.net/static/images/cumulus/common/author3.png',
          username: 'rbarrows1234@dcloud.cisco.com',
          password: 'C1sco12345',
          extension: '10821234',
          name: 'Rick Barrows'
        }
      ]
    }
  },

  mounted () {
  },

  methods: {
    ...mapActions([
      'inviteToSupportRoom',
      'getProvisionStatus',
      'provisionUser'
    ]),
    showDialog (event) {
      // show dialog
      this.$dialog.prompt({
        title: 'Join the Webex Teams support room',
        message: `What is your Webex Teams email address?`,
        type: 'is-success',
        confirmText: 'Join',
        inputAttrs: {
          placeholder: 'username@example.com',
          value: this.user.email
        },
        onConfirm: (email) => {
          this.inviteToSupportRoom({email})
        }
      })
    },
    clickProvision () {
      console.log('user clicked Provision Me button')
      this.provisionUser()
    }
  },

  computed: {
    ...mapGetters([
      'user',
      'isProvisioned',
      'loading'
    ])
  }
}
</script>
