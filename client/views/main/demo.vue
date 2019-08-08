<template>
  <div>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <article class="tile is-child box">
        <h1 class="title">
          Demo Website
        </h1>
        <div class="content">
          <div class="select">
            <select class="input" v-model="vertical" @change="verticalChanged">
              <option value="" disabled selected>Choose Your Demo Vertical</option>
              <option v-for="brand in systemBrands" :value="brand.id">{{ `${brand.name} (${brand.id})` }}</option>
              <option disabled>-----------------------------------------</option>
              <option v-for="brand in userBrands" :value="brand.id" v-if="brandFilter === 'all'">{{ `${brand.name} (${brand.id})` }}</option>
              <option v-for="brand in myBrands" :value="brand.id" v-if="brandFilter === 'mine'">{{ `${brand.name} (${brand.id})` }}</option>
              <option v-for="brand in filteredSortedBrands" :value="brand.id" v-if="brandFilter === 'other'">{{ `${brand.name} (${brand.id})` }}</option>
            </select>
          </div>
          <button class="button is-success">Go to Demo Website</button>
          <b-field>
            <b-checkbox v-model="showMore">Show More</b-checkbox>
          </b-field>
          <b-field v-show="showMore">
            <div class="field">
              <div class="field">
                <b-radio v-model="brandFilter"
                v-if="user.admin"
                native-value="all">Show all verticals</b-radio>
              </div>
              <div class="field">
                <b-radio v-model="brandFilter"
                native-value="mine">Show my verticals</b-radio>
              </div>
              <div class="field">
                <b-radio v-model="brandFilter"
                native-value="other">
                <span style="float: left;">Show this user's verticals:</span>
                <b-autocomplete
                  v-model="ownerFilter"
                  :data="autocompleteOwners">
                  <template slot="empty">No results found</template>
                </b-autocomplete>
              </b-radio>
              </div>
            </div>
          </b-field>
            <p>
              Note: You can create and configure your own vertical on the
            <a href="/branding" target="brand-toolbox">
              <strong>Demo Branding Toolbox</strong>
            </a>.
          </p>
        </div>
      </article>
    </div>
  </div>

  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <article class="tile is-child box">
        <h1 class="title">
          Voice Demo
        </h1>
        <div class="content">
          <p>
            Call this demo number to start the demo:
          </p>
          <p>
            <strong>+1 919-474-5775</strong>
          </p>
          <pre>
            {{ dcloudSession }}
          </pre>
        </div>
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
      showModal: false,
      model: {},
      ownerFilter: '',
      brandFilter: 'mine',
      vertical: 'finance',
      showMore: false
    }
  },

  methods: {
    ...mapActions([
      'loadDemoConfig',
      'errorNotification',
      'saveDemoConfig',
      'loadVerticals'
    ]),
    verticalChanged (e) {
      console.log('vertical changed', e.target.value)
      // save vertical
      // await this.saveDemoConfig({data})
      // await this.loadDemoConfig(false)
    },
    async clickSave () {
      try {
        // copy model to a local var
        const data = JSON.parse(JSON.stringify(this.model))
        // remove empty strings from the data, so that those values are not unset on server side
        for (const key of Object.keys(data)) {
          if (data[key] === '') {
            delete data[key]
          }
        }
        // confirm with user and save the data to the server
        this.confirmSaveDemoConfig({data})
      } catch (e) {
        // failed to save data
        console.log('failed to save demo configuration ', e.message)
        this.$toast.open({
          message: 'Failed to save demo configuration.',
          type: 'is-danger'
        })
      }
    },
    updateCache (data) {
      // copy state data to local data
      try {
        this.model = JSON.parse(JSON.stringify(data))
      } catch (e) {
        console.error('failed to updateCache on Demos > Brand view - incoming data was', data, e)
      }
    }
  },

  computed: {
    ...mapGetters([
      'user',
      'verticals',
      'loading',
      'working',
      'sessionId',
      'datacenter',
      'brandDemoLink',
      'cumulusDemoLink',
      'dcloudSession'
    ]),
    disableSave () {
      return false
    },
    autocompleteOwners () {
      const allOwners = this.verticals.map(v => v.owner)
      const uniqueOwners = Array.from(new Set(allOwners))
      return uniqueOwners.filter((option) => {
        return option
        .toString()
        .toLowerCase()
        .indexOf(this.ownerFilter.toLowerCase()) >= 0
      })
    },
    sortedBrands () {
      // make a mutable copy of the store data
      try {
        const copy = JSON.parse(JSON.stringify(this.verticals))
        // case-insensitive sort by name
        copy.sort((a, b) => {
          var nameA = a.name.toUpperCase() // ignore upper and lowercase
          var nameB = b.name.toUpperCase() // ignore upper and lowercase
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          // names must be equal
          return 0
        })
        return copy
      } catch (e) {
        console.log(`couldn't get sorted brands`, e)
      }
    },
    systemBrands () {
      return this.sortedBrands.filter(v => !v.owner || v.owner === 'system' || v.owner === null)
    },
    userBrands () {
      return this.sortedBrands.filter(v => v.owner && v.owner !== 'system' && v.owner !== null)
    },
    myBrands () {
      return this.sortedBrands.filter(v => v.owner === this.user.username)
    },
    filteredSortedBrands () {
      // filter to only show the brands owned by specified user
      return this.sortedBrands.filter(v => v.owner === this.ownerFilter)
    }
  },

  mounted () {
    console.log('loading demo config')
    this.loadDemoConfig(false)
    console.log('loading verticals')
    this.loadVerticals(false)
  },

  watch: {
    user (val, oldVal) {
      // user data changed
      // update our cached data
      this.updateCache(val)
    }
  }
}
</script>
