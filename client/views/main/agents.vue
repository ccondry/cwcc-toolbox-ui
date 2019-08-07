<template>
  <div>
    <div class="tile is-ancestor">
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
</template>

<script>
import {mapGetters} from 'vuex'
import Agents from '../../components/agents.vue'

export default {
  components: {
    Agents
  },

  data () {
    return {
      portalUrl: 'https://portal.ccone.net',
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

  computed: {
    ...mapGetters([
      'user',
      'isProvisioned',
      'loading'
    ])
  }
}
</script>
