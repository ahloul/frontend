import Vue from 'vue'
import { debounce } from 'lodash'
import VueFormulate from '@braid/vue-formulate'

import CurrencyInput from '~/components/elements/CurrencyInput'
import Stock from '~/components/elements/Stock'
import Autocomplete from '~/components/elements/Autocomplete'
import Wysiwyg from '~/components/utils/Wysiwyg'
import SearchInput from '~/components/elements/SearchInput'

export default ({ app }, inject) => {
  Vue.use(VueFormulate, {
    components: {
      Autocomplete,
      Wysiwyg,
      CurrencyInput,
      Stock,
      SearchInput,
    },
    library: {
      autocomplete: {
        classification: 'text',
        component: 'Autocomplete',
      },
      wysiwyg: {
        classification: 'text',
        component: 'Wysiwyg',
      },
      currency: {
        classification: 'text',
        component: 'CurrencyInput',
      },
      stock: {
        classification: 'text',
        component: 'Stock',
      },
      search: {
        classification: 'text',
        component: 'SearchInput',
      },
    },
    locales: {
      // en is default, handle all langs through i18n
      en: {
        required() {
          return app.i18n.t('login.validation_errors.required')
        },
        min({ args }) {
          return app.i18n.t('validation.min') + args[0]
        },
        max({ args, name }) {
          return name + ' ' + app.i18n.t('validation.max') + args[0]
        },
        email() {
          return app.i18n.t('login.validation_errors.email')
        },
        password() {
          return app.i18n.t('login.validation_errors.password')
        },
        shopname() {
          return app.i18n.t('information.validation_errors.shopname')
        },
        address() {
          return app.i18n.t('contact_data.validation_errors.address')
        },
      },
    },
    rules: {
      password: ({ value }) => {
        const strongRegex = new RegExp(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
        )
        return strongRegex.test(value)
      },
      shopname: debounce(async ({ value }) => {
        try {
          await app.$axios.$post(`/api/shops/checkName`, {
            name: value,
          })
          return true
        } catch ({ response: { data } }) {
          return false
        }
      }, 500),
      address: ({ value: { postalCode, locationId, street } }) => {
        if (!postalCode && !locationId && !street) return true
        if (!postalCode || !locationId || !street) return false
        return true
      },
    },
    classes: {
      outer(context) {
        switch (context.classification) {
          case 'box':
            return 'bg-transparent'
          default:
            return ''
        }
      },
      wrapper(context) {
        switch (context.classification) {
          case 'file':
            return ''
          case 'box':
            return 'flex'
          default:
            return ''
        }
      },
      element(context) {
        switch (context.classification) {
          case 'file':
            return ''
          case 'box':
            return 'content-center mr-5 my-auto'
          default:
            return ''
        }
      },
      input(context) {
        switch (context.classification) {
          case 'file':
            return 'dropbox'
          case 'button':
            return 'cta bg-tertiary'
          case 'text':
            return 'form-input'
          case 'box':
            return 'bg-transparent'
          default:
            return 'form-input'
        }
      },
      label(context) {
        switch (context.classification) {
          case 'box':
            return 'font-medium text-sm flex-initial  my-auto'
          default:
            return 'font-medium text-sm'
        }
      },
      help: 'text-xs mb-1 text-grey-light',
      error: 'text-danger text-xs mb-1',
    },
  })
}
