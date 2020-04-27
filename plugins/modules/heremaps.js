import 'here-js-api/scripts/mapsjs-core'
import 'here-js-api/scripts/mapsjs-service'

const heremaps = new window.H.service.Platform({
  app_id: '1ea3QGi3uOkP30f8yJN0',
  app_code: 'rnIwOcfe5gsuPys1bIdnKg',
})

export default ({ app }, inject) => {
  inject('herePlatform', (provider) => heremaps)
}
