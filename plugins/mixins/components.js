import Vue from 'vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import icon from '~/components/utils/icon.vue'

// Global Mixins
Vue.component('icon', icon)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
