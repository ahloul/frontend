import 'here-js-api/scripts/mapsjs-core'
import 'here-js-api/scripts/mapsjs-service'
import 'here-js-api/scripts/mapsjs-ui'
import 'here-js-api/scripts/mapsjs-mapevents'
import 'here-js-api/scripts/mapsjs-clustering'
import 'here-js-api/scripts/mapsjs-places'

const heremaps = new window.H.service.Platform({
  app_id: process.env.VUE_APP_HERE_ID,
  app_code: process.env.VUE_APP_HERE_CODE,
})

export default ({ app }, inject) => {
  inject('herePlatform', (provider) => heremaps)
}
