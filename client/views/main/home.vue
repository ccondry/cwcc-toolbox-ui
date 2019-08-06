<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-12">
        <article class="tile is-child box">
          <h1 class="title">Welcome</h1>
          <p style="font-size: 1.5em;">
            Welcome to the Cisco Webex Contact Center Demo on dCloud.
          </p>
          <p>
            &nbsp;
          </p>
          <p style="font-size: 1.5em;">
            <strong>
              <a @click.prevent="showDialog">
                Please click here to join our Webex Teams support room
                to get support, ask questions, and suggest new features.
              </a>
            </strong>
          </p>
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
        <div class="tile is-parent is-12">
          <article class="tile is-child box">
            <h1 class="title">Provision</h1>
            <!-- <div v-if="loading.user.provision">
              Loading...
            </div> -->
            <!-- <b-loading :is-full-page="false" :active="true" :can-cancel="false"></b-loading> -->
            <!-- <div class="loading-overlay is-active">
              <div class="loading-background"></div>
              <div class="loading-icon"></div>
            </div> -->
            <!-- <b-icon :icon=""></b-icon> -->


              <div v-if="isProvisioned">
                Yes
              </div>
              <div >
                <button>Provision Me</button>
              </div>
            <!-- <b-loading :is-full-page="false" :active="loading.user.provision" :can-cancel="false"></b-loading> -->

          </article>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  mounted () {
    console.log('getting provision status for', this.user.username)
    this.getProvisionStatus()
  },

  methods: {
    ...mapActions([
      'inviteToSupportRoom',
      'getProvisionStatus'
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
