/*
 ** Access to ENV variables
 */

require('dotenv').config()

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1.0',
      },
      {
        hid: 'description',
        property: 'description',
        content: 'Lokal einkaufen!',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://getit.market/img/mockup.png',
      },
      {
        hid: 'og:image:width',
        property: 'og:image:width',
        content: '1024',
      },
      {
        hid: 'og:image:width',
        property: 'og:image:height',
        content: '683',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: process.env.VUE_APP_URL,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Lokal einkaufen!',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'get it! Marketplace',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      {
        hid: 'fb:app_id',
        property: 'fb:app_id',
        content: '574950416384081',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: process.env.VUE_APP_URL,
      },
      {
        hid: 'og:locale',
        property: 'og:locale',
        content: 'de',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /**
   * Vue configuration
   */
  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },

  /**
   * ENV Variables passing to nuxt project
   */
  env: {
    VUE_APP_GOOGLE_ID: process.env.VUE_APP_GOOGLE_ID,
    VUE_APP_FACEBOOK_ID: process.env.VUE_APP_FACEBOOK_ID,
    VUE_APP_MASTER_KEY: process.env.VUE_APP_MASTER_KEY,
    VUE_APP_URL: process.env.VUE_APP_URL,
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    VUE_APP_HERE_ID: process.env.VUE_APP_HERE_ID,
    VUE_APP_HERE_CODE: process.env.VUE_APP_HERE_CODE,
    VUE_APP_ENV: process.env.VUE_APP_ENV,
  },

  /**
   * Customize the progress-bar color
   */
  loading: { color: '#3fe19b' },

  /**
   * PWA configuration
   */
  pwa: {
    meta: {
      theme_color: '#01374c',
      name: 'get it!',
      author: 'tayfun guelcan',
      lang: 'de',
    },
  },

  /*
  // Options
  // TODO: Prepare Push Notifications
  oneSignal: {
    init: {
      appId: 'YOUR_APP_ID',
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: true,
      },
    },
  },
  */

  /**
   ** PurgeCSS configuration
   */
  purgeCSS: {
    whitelistPatterns: [
      /-(leave|enter|appear)(|-(to|from|active))$/,
      /^(?!(|.*?:)cursor-move).+-move$/,
      /^nuxt-link(|-exact)-active$/,
    ],
  },

  /**
   * Tailwind config
   */
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    purgeCSSInDev: false,
    exposeConfig: false,
  },

  /**
   * Webfontloader
   */
  webfontloader: {
    google: {
      families: ['Muli:300,400,500,600,700,800,900&display=swap'],
    },
  },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/main'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/modules/axios',
    '~/plugins/modules/i18n',
    '~/plugins/modules/vueFormulate',
    '~/plugins/mixins/components',
    // { src: '~/plugins/modules/localstorage', mode: 'client' },
    { src: '~/plugins/modules/timeago', mode: 'client' },
    { src: '~/plugins/modules/validation', mode: 'client' },
    { src: '~/plugins/modules/socialAuthentication', mode: 'client' },
    { src: '~/plugins/modules/heremaps', mode: 'client' },
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/Developmint/nuxt-webfontloader#readme
    'nuxt-webfontloader',
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/markdownit
    '@nuxtjs/markdownit',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/device-module#readme
    '@nuxtjs/device',
    // https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt#readme
    'cookie-universal-nuxt',
    // https://dm4t2.github.io/vue-currency-input/
    ['vue-currency-input/nuxt', { globalOptions: { currency: 'EUR' } }],
    // https://github.com/julianmar/nuxt-bugsnag#readme
    [
      'nuxt-bugsnag',
      {
        config: {
          apiKey: process.env.BUGSNAG_API_KEY,
          releaseStage: 'development',
          logger: null,
          notifyReleaseStages: ['production', 'staging'],
          enabledReleaseStages: ['production', 'staging'],
        },
      },
    ],
  ],

  /**
   ** Markdown configuration
   */
  markdownit: {
    injected: true,
  },
  /**
   ** Global Middleware configuration
   */
  router: {
    middleware: 'i18n',
  },

  /**
   ** Server Middleware configuration
   */
  serverMiddleware: ['redirect-ssl'],

  /**
   * Axios module configuration
   * See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
  },

  proxy: {
    '/api': { target: process.env.API_URL },
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
