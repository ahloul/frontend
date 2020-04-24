import Vue from 'vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import icon from '~/components/utils/icon.vue'
import modal from '~/components/elements/Modal.vue'

// Global Mixins and Utils
Vue.component('icon', icon)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// Elements
Vue.component('modal', modal)
