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

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data () {
    return {
    }
  },

  methods: {
    ...mapActions(['inviteToSupportRoom']),
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
    ...mapGetters(['user'])
  }
}
</script>
