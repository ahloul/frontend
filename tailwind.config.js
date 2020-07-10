/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
// const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    colors: {
      transparent: 'transparent',
      black: '#000000',
      white: '#ffffff',
      primary: { default: '#19AE9D', lighter: '#E4F4E9', lightest: '#F5F7F6' },
      secondary: '#006174',
      tertiary: '#02587B',
      light: '#BBBBBB',
      dark: '#2B2B2B',
      grey: {
        darker: '#000000',
        dark: '#2B2B2B',
        default: '#575757',
        light: '#BBBBBB',
        lighter: '#DADBDD',
      },
      danger: { default: '#FE6347', lighter: '#FFE1E9' },
      warning: { default: '#FFB100', light: '#FFD662', lighter: '#FAF3E3' },
      success: '#19AE9D',
      info: '#006174',
    },
    container: {
      center: true,
    },
    extend: {
      borderColor: (theme) => ({
        default: theme('colors.grey.lighter', 'currentColor'),
      }),
    },
    customForms: (theme) => ({
      default: {
        'input, textarea, multiselect, select': {
          borderRadius: theme('borderRadius.sm'),
          borderColor: theme('colors.grey.lighter'),
          backgroundColor: theme('colors.grey.lighter'),
          '&:focus': {
            boxShadow: undefined,
            borderColor: theme('colors.primary'),
          },
        },
        'checkbox, radio': {
          width: theme('spacing.5'),
          height: theme('spacing.5'),
          '&:focus': {
            boxShadow: undefined,
            borderColor: theme('colors.primary'),
          },
          '&:checked': {
            boxShadow: undefined,
            backgroundColor: theme('colors.primary'),
            outline: undefined,
          },
        },
      },
    }),
    variants: {
      spinner: ['responsive'],
    },
    spinner: (theme) => ({
      dark: {
        color: theme('colors.light', 'currentColor'), // color you want to make the spinner
        size: '1em', // size of the spinner (used for both width and height)
        border: '2px', // border-width of the spinner (shouldn't be bigger than half the spinner's size)
        speed: '500ms', // the speed at which the spinner should rotate
      },
      light: {
        color: theme('colors.white', 'currentColor'), // color you want to make the spinner
        size: '1em', // size of the spinner (used for both width and height)
        border: '2px', // border-width of the spinner (shouldn't be bigger than half the spinner's size)
        speed: '500ms', // the speed at which the spinner should rotate
      },
    }),
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms'),
    require('tailwindcss-spinner')(),
  ],
}
