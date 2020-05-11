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
      primary: '#41976d',
      secondary: '#4e9f77',
      tertiary: '#ddc882',
      dark: '#cbd5e0',
      grey: '#f9f9f9',
      light: '#666C7C',
      danger: '#ed4835',
      warning: '#f6b749',
      success: '#66a87d',
      info: '#96d49b',
    },
    container: {
      center: true,
    },
    extend: {
      borderRadius: {
        md: '0.5rem',
        lg: '0.75rem',
      },
      borderColor: (theme) => ({
        default: theme('colors.dark', 'currentColor'),
      }),
    },
    customForms: (theme) => ({
      default: {
        'input, textarea, multiselect, select': {
          borderRadius: theme('borderRadius.md'),
          borderColor: theme('colors.dark'),
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
