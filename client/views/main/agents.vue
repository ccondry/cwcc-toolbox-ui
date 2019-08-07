<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h1 class="title">
            <!-- Main container -->
            <nav class="level">
              <!-- Left side -->
              <div class="level-left">
                <div class="level-item">
                  Agents List
                </div>
                <div class="level-item">
                  <p class="subtitle is-5">
                    <button type="button" class="button is-primary" @click.prevent="refresh" :disabled="agentsLoading">Refresh</button>
                  </p>
                </div>
              </div>
            </nav>
          </h1>
          <p>
            These are the CWCC agents you can use to log in to
            <router-link :to="{name: 'Finesse'}">Finesse</router-link>.
          </p>
          <b-field grouped>
            <!-- small whitespace -->
          </b-field>
          <b-loading :is-full-page="false" :active="agentsLoading" :can-cancel="false"></b-loading>
          <agents-table :model="agents" :status="agentStatus"></agents-table>
        </article>
      </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import agentsTable from '../../components/agents-table'

export default {
  components: {
    agentsTable
  },
  data () {
    return {
      select: {
        agentId: ''
      },
      showModal: false
    }
  },
  mounted () {
    // load agents if they're not loaded yet
    if (this.user.username && !this.agents.length) {
      return this.refresh(false)
    }
  },
  methods: {
    ...mapActions([
      'getAgents'
    ]),
    refresh (showNotification) {
      if (this.user.username) {
        // load my agents
        this.getAgents(showNotification)
      }
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'working',
      'loading',
      'agentStatus',
      'agents'
    ]),
    agentsLoading () {
      try {
        return this.loading.uccx.agent
      } catch (e) {
        return false
      }
    }
  },
  watch: {
    // user (val, oldVal) {
    //   this.refresh(true)
    // }
  }
}
</script>
