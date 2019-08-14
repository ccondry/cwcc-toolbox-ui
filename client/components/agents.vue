<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile">
        <!-- repeat this tile for each agent -->
        <div class="tile is-parent" v-for="agent of agents">
          <article class="tile is-child box">

            <p class="title">{{ agent.name }}</p>
            <p class="subtitle">{{ agent.role }}</p>
            <img :src="agent.picture" width="128px">
            <p>
              <strong>Username: {{ agent.username }}</strong>
              <a @click="clickCopy1(agent.username)"><b-icon icon="layers"></b-icon></a>
            </p>
            <p>
              <strong>Password: {{ agent.password }}</strong>
              <a @click="clickCopy2(agent.password)"><b-icon icon="layers"></b-icon></a>
            </p>
            <p>
              <strong>Extension: {{ agent.extension }}</strong>
              <a @click="clickCopy1(agent.extension)"><b-icon icon="layers"></b-icon></a>
            </p>
          </article>
        </div>

      </div>
    </div>
    <center>
    <b-field>
      <button class="button is-success" @click="clickPortal">Go to CWCC Portal</button>
    </b-field>
  </center>
  </div>
</template>


<script>
export default {
  props: ['user'],

  data () {
    return {
      portalUrl: 'https://portal.ccone.net'
    }
  },

  computed: {
    agents () {
      return [
        {
          picture: 'https://mm.cxdemo.net/static/images/cumulus/common/author1.png',
          username: 'sjeffers' + this.user.id + '@dcloud.cisco.com',
          password: 'C1sco12345',
          extension: '1080' + this.user.id,
          name: 'Sandra Jefferson',
          role: 'Agent'
        },
        {
          picture: 'https://mm.cxdemo.net/static/images/cumulus/common/author3.png',
          username: 'rbarrows' + this.user.id + '@dcloud.cisco.com',
          password: 'C1sco12345',
          extension: '1082' + this.user.id,
          name: 'Rick Barrows',
          role: 'Administrator/Agent'
        }
      ]
    }
  },

  methods: {
    clickPortal (e) {
      // open agent portal in new tab, or same tab if they have it open already
      window.open(this.portalUrl, 'ccone')
    },
    clickCopy2 (s) {
      window.Clipboard.writeText(s)
      .then(() => {
        console.log('Text is on the clipboard:', s)
        // this.message = 'Code copied to clipboard.'
      })
      .catch(e => {
        console.error(e)
        // this.message = 'Sorry, unable to copy to clipboard.'
      })
      // console.log('Text is on the clipboard.')
    },
    clickCopy1 (s) {
      // console.log('copying text to clipboard:', s)
      // return function (s) {
      // document.execCommand("copy");
      // window.Clipboard.writeText(s)
      // }
      navigator.clipboard.writeText(s)
      .then(() => {
        console.log('Text is on the clipboard:', s)
        // this.message = 'Code copied to clipboard.'
      })
      .catch(e => {
        console.error(e)
        // this.message = 'Sorry, unable to copy to clipboard.'
      })
    }
  }
}
</script>
