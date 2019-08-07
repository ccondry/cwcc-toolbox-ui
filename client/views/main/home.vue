<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-12">
        <article class="tile is-child box">
          <h1 class="title">Welcome</h1>
          <b-field>
            <p style="font-size: 1.5em;">
              Welcome to the Cisco Webex Contact Center Demo on dCloud.
            </p>
          </b-field>
          <b-field>
            <p style="font-size: 1.5em;">
              Click this button to get support, ask questions, and suggest new features.
            </p>
          </b-field>
          <b-field>
            <button class="button is-success" @click.prevent="showDialog"  style="font-size: 1.5em;">
              Join Support Room
            </button>
          </b-field>
        </article>
      </div>
    </div>

    <div v-if="loading.user.provision">
      <div class="tile is-ancestor" v-if="!isProvisioned">
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
              <p style="font-size: 1.5em;">
                Your account is not provisioned for this demo yet. Would you like
                to provision it now?
              </p>
            </b-field>
            <b-field>
              <button class="button is-success" @click.prevent="clickProvision"  style="font-size: 1.5em;">
                Yes, Provision Me
              </button>
            </b-field>
          </article>
        </div>
      </div>

      <!-- user is provisioned - show agent info -->
      <div class="tile is-ancestor" v-if="isProvisioned">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <h1 class="title">My Agents</h1>
            <div class="content">
              <article class="media" v-for="agent of agents">
                <figure class="media-left">
                  <p class="image is-128x128">
                    <img :src="agent.picture">
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>{{ agent.name }}</strong>
                      <br />
                      Username: <strong>{{ agent.username }}</strong>
                      <br />
                      Password: <strong>{{ agent.password }}</strong>
                      <br />
                      Extension: <strong>{{ agent.extension }}</strong>
                      <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis. -->
                    </p>
                    <p>
                    </p>
                  </div>
                  <!-- <nav class="level is-mobile">
                    <div class="level-left">
                      <a class="level-item">
                        <span class="icon is-small"><i class="fas fa-reply"></i></span>
                      </a>
                      <a class="level-item">
                        <span class="icon is-small"><i class="fas fa-retweet"></i></span>
                      </a>
                      <a class="level-item">
                        <span class="icon is-small"><i class="fas fa-heart"></i></span>
                      </a>
                    </div>
                  </nav> -->
                </div>
                <!-- <div class="media-right">
                  <button class="delete"></button>
                </div> -->
              </article>
            </div>
          </article>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
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
    console.log('getting provision status for', this.user.username)
    this.getProvisionStatus()
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
