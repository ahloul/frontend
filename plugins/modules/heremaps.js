import 'here-js-api/scripts/mapsjs-core'
import 'here-js-api/scripts/mapsjs-service'

const heremaps = new window.H.service.Platform({
  app_id: process.env.VUE_APP_HERE_ID,
  app_code: process.env.VUE_APP_HERE_CODE,
})

export default ({ app }, inject) => {
  inject('herePlatform', (provider) => heremaps)
}
