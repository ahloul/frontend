import { mount, shallowMount } from '@vue/test-utils'
import { jestPreset } from 'ts-jest'
import Autocomplete from '../../components/elements/Autocomplete.vue'

describe('Autocomplete', () => {
  describe('props', () => {
    const contextPropValidator = Autocomplete.props.context.validator
    test('if props without context -> prop required error', () => {
      expect(Autocomplete.props.context.required).toBe(true)
    })

    test('if context without attributes -> prop validator error', () => {
      const invalidProps = {
        hallo: {},
        blurHandler: () => {},
        model: { name: '123' },
      }
      expect(contextPropValidator(invalidProps)).toBe(false)
    })

    test('if context without blurHandler function -> prop validator error', () => {
      const invalidProps = {
        attributes: {},
        blurHandler: '',
        model: { name: '123' },
      }
      expect(contextPropValidator(invalidProps)).toBe(false)
    })

    test('if context model without label or name -> prop validator error', () => {
      const invalidProps = {
        attributes: {},
        blurHandler: () => {},
        model: '123',
      }
      // expect(contextPropValidator(invalidProps)).toBeFalsy()

      const valid = {
        attributes: {},
        blurHandler: () => {},
        model: { name: '123' },
      }

      expect(contextPropValidator(invalidProps)).toBe(false)
    })

    test('if valid props -> pass validator', () => {
      const validProps = {
        attributes: {},
        blurHandler: () => {},
        model: { name: '123' },
      }
      expect(contextPropValidator(validProps)).toBe(true)
    })
  })

  describe('xy', () => {
    const propsData = {
      context: {
        attributes: {},
        blurHandler: () => {},
        model: { name: '123' },
      },
    }
    const wrapper = shallowMount(Autocomplete, { propsData })
    test('if successful mount --> is Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy()
    })

    test.only('computed openSuggestion function', () => {
      expect(wrapper.vm.$data.open).toBe(false)
      expect(wrapper.find('li').exists()).toEqual(false)
      wrapper.setData({ open: true })
      expect(wrapper.vm.$data.open).toBe(true)
    })
  })

  test('emitted selection', async () => {
    wrapper = mount(Autocomplete)
    wrapper.vm.$emit('selection', 'start')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().selection[0]).toEqual(['start'])
  })

  test('change axios call ', () => {
    jest.mock('axios', () => ({
      get: Promise.resolve('rows'),
    }))
    const wrapper = mount(Autocomplete)
    wrapper.find('input').trigger('change')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.$data.open).toBe(true)
    })
  })

  // change: debounce(async function (e) {
  // if (!this.open) this.open = true
  // const rows = await this.$axios.$get(
  // `/api/${this.endpoint}`,
  // this.selection[this.displayName]
  // ? { params: { [this.queryname]: this.selection[this.displayName] } }
  // : null
  // )
  // this.list = rows
  // }, 750),

  //  test('li emitted suggestion', () => {
  //    wrapper = shallowMount(Autocomplete)
  //    wrapper.find('input').trigger('input')
  //    expect(wrapper.vm.input).toHaveBeenCalled()
  //  })
  // test('input change', () => {
  //    const initialValue = 'Initial value'
  //    wrapper = shallowMount(Autocomplete, { propsData: { initialValue } })

  //    const newValue = 'updated value'
  //    const input = wrapper.find('input')
  //    (wrapper.find('input').element as HTMLInputElement).value =newValue
  //    input.trigger('change')
  //   expect(wrapper.text()).toContain(newValue)
  //  })
})
