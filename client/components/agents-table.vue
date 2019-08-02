<template>
  <div class="table-responsive">
    <table class="table is-bordered is-narrow">
      <thead>
        <tr>
          <th>Username</th>
          <th>Password</th>
          <th v-if="!credentialsOnly" class="is-hidden-mobile">Alias</th>
          <th v-if="!credentialsOnly" class="is-hidden-mobile">First Name</th>
          <th v-if="!credentialsOnly" class="is-hidden-mobile">Last Name</th>
          <th>Extension</th>
          <th class="is-hidden-mobile">Role</th>
          <th class="is-hidden-mobile">Team</th>
          <th v-if="!credentialsOnly">State</th>
          <!-- <th>Actions</th> -->
        </tr>
      </thead>

      <tbody>
        <tr v-for="agent in model">
          <td>{{ agent.userID }}</td>
          <td>C1sco12345</td>
          <td v-if="!credentialsOnly" class="is-hidden-mobile">{{ agent.alias }}</td>
          <td v-if="!credentialsOnly" class="is-hidden-mobile">{{ agent.firstName }}</td>
          <td v-if="!credentialsOnly" class="is-hidden-mobile">{{ agent.lastName }}</td>
          <td>{{ agent.extension }}</td>
          <td class="is-hidden-mobile">{{ agent.type === 2 ? 'Supervisor' : 'Agent' }}</td>
          <td class="is-hidden-mobile">{{ agent.team['@name'] }}</td>
          <td v-if="!credentialsOnly" class="is-hidden-mobile" :class="getAgentStateClass(agent)">{{ getAgentState(agent) }}</td>
          <!-- <td>
            <button type="button" class="button is-primary" @click.prevent="$emit('modify', agent)">Modify</button>
          </td> -->
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  props: ['model', 'status', 'credentialsOnly'],
  methods: {
    getAgentState (agent) {
      try {
        return this.status[agent.userID].state
      } catch (e) {
        return ''
      }
    },
    getAgentExtension (agent) {
      try {
        const extension = this.status[agent.userID].extension
        if (typeof extension === 'string') {
          // return extension.slice(0, 4) + ' ' + extension.slice(4)
          return extension
        } else {
          return ''
        }
      } catch (e) {
        return ''
      }
    },
    getAgentStateClass (agent) {
      const states = {
        READY: 'is-success',
        NOT_READY: 'is-danger',
        RESERVED: 'is-warning',
        LOGOUT: ''
      }
      return states[this.getAgentState(agent)]
    },
    getAgentExtensionClass (agent) {

    }
  }
}
</script>
