import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'

export default ({ app }, inject) => {
  Vue.use(VueFormulate, {
    locales: {
      en: {
        required({ name }) {
          return app.i18n.t('login.validation_errors.required')
        },
        email({ name }) {
          return app.i18n.t('login.validation_errors.email')
        },
        password({ name }) {
          return name + ' ' + app.i18n.t('login.validation_errors.password')
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
    },
  })
}
