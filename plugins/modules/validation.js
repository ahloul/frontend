import validUrl from 'valid-url'
import { extend, localize } from 'vee-validate'
import { debounce } from 'lodash'
import de from 'vee-validate/dist/locale/de.json'

/* eslint-disable camelcase */
import {
  required,
  alpha,
  email,
  min,
  max,
  digits,
  oneOf,
  alpha_num,
  numeric,
  min_value,
  max_value,
  ext,
  alpha_spaces,
} from 'vee-validate/dist/rules'

// Install and Activate the German locale.
localize('de', de)

extend('verify_password', {
  message:
    'The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)',
  validate: (value) => {
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    )
    return strongRegex.test(value)
  },
})

extend('decimal', {
  validate: (value, { decimals = '*', separator = '.' } = {}) => {
    if (value === null || value === undefined || value === '') {
      return {
        valid: false,
      }
    }
    if (Number(decimals) === 0) {
      return {
        valid: /^-?\d*$/.test(value),
      }
    }
    const regexPart = decimals === '*' ? '+' : `{1,${decimals}}`
    const regex = new RegExp(
      `^[-+]?\\d*(\\${separator}\\d${regexPart})?([eE]{1}[-]?\\d+)?$`
    )
    return {
      valid: regex.test(value),
      data: {
        serverMessage: 'Nur Dezimalzahlen sind erlaubt',
      },
    }
  },
  message: `{serverMessage}`,
})

extend('address', {
  params: ['address'],
  validate: (value, { address: { postalCode, locationId, street } }) => {
    if (!postalCode || !locationId || !street) return false
    return true
  },
  message:
    'Es muss eine gültige Addresse mit Hausnummer und Postleitzahl aus dem Auswahlfeld gewählt werden.',
})

extend('shopname', {
  params: ['name', 'check'],
  validate: debounce(async function (value, { name, check }) {
    try {
      await check(name)
      return true
    } catch (error) {
      return false
    }
  }, 250),
  message: 'Shopname existiert bereits',
})

extend('validUrl', (value) => {
  if (validUrl.isUri(value)) {
    return true
  }

  return 'Es muss eine gültige Internetadresse sein.'
})

extend('min', min)
extend('required', required)
extend('email', email)
extend('alpha', alpha)
extend('max', max)
extend('digits', digits)
extend('oneOf', oneOf)
extend('alphaNum', alpha_num)
extend('numeric', numeric)
extend('min_value', min_value)
extend('max_value', max_value)
extend('ext', ext)
extend('alpha_spaces', alpha_spaces)

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  },
  message: 'Password bestätigung stimmt nicht überein',
})
