module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue-i18n/recommended',
  ],
  plugins: ['prettier'],
  ignorePatterns: ['test/'],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'vue/no-v-html': 'off',
  },
  settings: {
    'vue-i18n': {
      localeDir: './lang/*.json', // extention is glob formatting!
    },
  },
}
