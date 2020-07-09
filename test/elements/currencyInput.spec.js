import { shallowMount } from '@vue/test-utils'
import CurrencyInput from '~/components/elements/CurrencyInput.vue'

describe('CurrencyInput', () => {
  const contextPropValidator = CurrencyInput.props.context.validator

  test('if valid props -> pass validator', () => {
    const validProp = {
      attributes: {},
    }
    expect(contextPropValidator(validProps)).toBe(true)
  })

  test('if props without context -> prop required error', () => {
    expect(CurrencyInput.props.context.required).toBe(true)
  })

  test('if context without attributes -> prop validator error', () => {
    const invalidProps = { hallo: {} }
    expect(contextPropValidator(invalidProps)).toBe(false)
  })
})
