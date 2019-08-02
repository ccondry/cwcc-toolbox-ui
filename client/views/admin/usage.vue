<template>
  <div>
    <b-loading :is-full-page="true" :active="loading.app.usage" :can-cancel="false" />
    <div class="tile is-ancestor">
      <div class="tile is-parent is-12 is-vertical">
        <article class="tile is-child box">
          <h1 class="title">
            Usage Statistics
          </h1>

          <!-- search -->
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <div class="field has-addons">
                  <p class="control">
                    <input class="input" type="text" v-model="query" placeholder="Search">
                  </p>
                </div>
              </div>
              <div class="level-item">
                <p class="subtitle is-5">
                  <button type="button" class="button is-primary" @click.prevent="refresh" :disabled="loading.app.usage">Search</button>
                </p>
              </div>
            </div>
          </nav>

          <!-- filter -->
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <div class="field has-addons">
                  <p class="control">
                    <input class="input" type="text" v-model="filter" placeholder="Filter">
                  </p>
                </div>
              </div>
              <div class="level-item">
                <p class="subtitle is-5">
                  <button type="button" class="button is-primary" @click.prevent="applyFilter" :disabled="loading.app.usage">Filter</button>
                </p>
              </div>
            </div>
          </nav>

          <div class="block">
            <a class="button is-success" :href="jsonData" download="usage.json">Download JSON</a>
            <a class="button is-success" :href="csvData" download="usage.csv">Download CSV</a>
          </div>

          <div class="table-responsive">
            <table class="table is-bordered is-striped is-narrow">
              <thead>
                <tr>
                  <th>datetime</th>
                  <th>app</th>
                  <th>version</th>
                  <th>level</th>
                  <th>status</th>
                  <th>details</th>
                  <th>subtype</th>
                  <th>ani</th>
                  <th>dnis</th>
                  <th>user ID</th>
                  <th>pqId</th>
                  <th>ctId</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="row in sortedFilteredRows">
                  <td>{{ row.datetime }}</td>
                  <td>{{ row.app }}</td>
                  <td>{{ row.version }}</td>
                  <td>{{ row.level }}</td>
                  <td>{{ row.status }}</td>
                  <td>{{ row.details }}</td>
                  <td>{{ row.subtype }}</td>
                  <td>{{ row.ani }}</td>
                  <td>{{ row.dnis }}</td>
                  <td>{{ row.userId }}</td>
                  <td>{{ row.pqId }}</td>
                  <td>{{ row.ctId }}</td>
                </tr>
              </tbody>
            </table>

          </div>

        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import fuzzy from 'fuzzy'

// extract menu item name
function extract (el) {
  // return description if available, or else return name
  return el.datetime + ' ' + el.app + ' ' + el.version + ' ' + el.level + ' ' + el.status + ' ' + el.subtype + ' ' + el.ani + ' ' + el.dnis + ' ' + el.userId + ' ' + el.pqId + ' ' + el.ctId
}

function makeCsvData (array) {
  if (!array || !Array.isArray(array)) {
    throw Error('data is not an array')
  }
  if (!array.length) {
    throw Error('data is an empty array')
  }
  let str = ''
  // add column titles row
  let line1 = ''
  for (let key of Object.keys(array[0])) {
    line1 += key + ','
  }
  // add everything except the last character (the dangling comma) to the csv
  str += line1.slice(0, -1)
  // add newline
  str += '\r\n'

  // count the rows
  // let rows = 0
  for (let row of array) {
    let line = ''
    // add each value of this row
    for (let i in row) {
      line += row[i] + ','
    }
    // add everything except the last character (the dangling comma) to the csv
    str += line.slice(0, -1)
    // add newline for the end of this row
    str += '\r\n'
    // increment rows
    // rows++
  }
  return str
}

export default {
  data () {
    return {
      // loading: false,
      filter: '',
      query: 'app: instant-app-gateway'
    }
  },
  methods: {
    ...mapActions([
      'loadUsage'
    ]),
    refresh (showNotification) {
      // construct query by constructing JSON from JSON-like string data
      const query = {}
      try {
        const properties = this.query.split(',')
        for (const property of properties) {
          const parts = property.split(':')
          query[parts[0].trim()] = parts[1].trim()
        }
      } catch (e) {
        // continue
      }
      this.loadUsage({query, showNotification})
    },
    applyFilter () {
      //
    }
  },
  computed: {
    ...mapGetters(['usage', 'loading']),
    csvData () {
      try {
        const csv = makeCsvData(this.usage)
        return 'data:text/csv;base64,' + window.btoa(csv)
      } catch (e) {
        return ''
      }
    },
    jsonData () {
      return 'data:text/json;charset=utf-8;base64,' + window.btoa(JSON.stringify(this.usage, null, 2))
    },
    sortedRows () {
      return this.usage
    },
    sortedFilteredRows () {
      // filter data using the search box
      const results = fuzzy.filter(this.filter, this.sortedRows, {extract})
      // map the original children objects
      const matches = results.map(function (el) { return el.original })
      // replace children with fuzzy filtered results map
      return matches
    }
  }
}
</script>
