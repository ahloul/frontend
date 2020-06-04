import Vue from 'vue'
import VueTimeago from 'vue-timeago'
Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'en',
  locales: {
    de: require('date-fns/locale/de'),
  },
})
