<template>
  <div>
    <b-field>
      <button class="button is-success" @click="clickPortal">Go to Agent Portal</button>
    </b-field>
    <div class="tile is-ancestor">
      <div class="tile">
        <!-- repeat this tile for each agent -->
        <div class="tile is-parent" v-for="agent of agents">
          <article class="tile is-child box">

            <p class="title">{{ agent.name }}</p>
            <p class="subtitle">{{ agent.role }}</p>
            <img :src="agent.picture" width="128px">
            <br />
            Username: <strong>{{ agent.username }}</strong>
            <br />
            Password: <strong>{{ agent.password }}</strong>
            <br />
            Extension: <strong>{{ agent.extension }}</strong>

          </article>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ['user'],

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
          role: 'Administrator'
        }
      ]
    }
  },

  methods: {
    clickPortal (e) {
      // open agent portal in new tab, or same tab if they have it open already
      window.open(this.portalUrl, 'ccone')
    }
  }
}
</script>
