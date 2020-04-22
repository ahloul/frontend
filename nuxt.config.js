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
        name: 'description',
        content: process.env.npm_package_description || '',
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
      families: ['Nunito:300,400,500,600,700'],
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
    '~/plugins/mixins/components',
    // { src: '~/plugins/modules/localstorage', mode: 'client' },
    { src: '~/plugins/modules/timeago', mode: 'client' },
    { src: '~/plugins/modules/validation', mode: 'client' },
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
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/device-module#readme
    '@nuxtjs/device',
  ],

  /**
   ** Server Middleware configuration
   */
  serverMiddleware: ['redirect-ssl'],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
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
