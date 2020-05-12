/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    fontFamily: {
      sans: ['Muli', ...defaultTheme.fontFamily.sans],
    },
    colors: {
      transparent: 'transparent',
      black: '#000000',
      white: '#ffffff',
      primary: '#2F615E',
      secondary: '#00A96D',
      tertiary: '#FFE55F',
      dark: '#EFEFEF',
      grey: '#f9f9f9',
      light: '#3C3C3C',
      danger: '#ed4835',
      warning: '#FFC700',
      success: '#00A96D',
      info: '#E6F6F1 ',
    },
    container: {
      center: true,
    },
    extend: {
      borderColor: (theme) => ({
        default: theme('colors.dark', 'currentColor'),
      }),
    },
    customForms: (theme) => ({
      default: {
        'input, textarea, multiselect, select': {
          borderRadius: theme('borderRadius.lg'),
          borderColor: theme('colors.dark'),
          backgroundColor: theme('colors.dark'),
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
        color: theme('colors.primary', 'currentColor'), // color you want to make the spinner
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
