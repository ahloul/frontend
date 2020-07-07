import { shallowMount } from '@vue/test-utils'
import CurrencyInput from '~/components/elements/CurrencyInput.vue'

function getMountedComponent(Component, propsData) {
  return shallowMount(Component, {
    propsData,
  })
}

describe('props', () => {
  const contextPropValidator = CurrencyInput.props.context.validator
  test('props without context should throw prop required error', () => {
    expect(CurrencyInput.props.context.required).toBe(true)
  })

  test('context without attributes should throw prop validator error', () => {
    const invalidProps = { hallo: {}, blurHandler: () => {}, model: '123' }
    expect(contextPropValidator(invalidProps)).toBeFalsy()
  })

  test('context without blurHandler function should throw prop validator error', () => {
    const invalidProps = { attributes: {}, blurHandler: '', model: '123' }
    expect(contextPropValidator(invalidProps)).toBeFalsy()
  })
})
