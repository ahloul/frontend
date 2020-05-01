import { mount, shallowMount } from '@vue/test-utils'
import Autocomplete from '../../components/elements/Autocomplete.vue'

describe('Autocomplete', () => {
  let wrapper

  test('is a Vue instance', () => {
    wrapper = mount(Autocomplete)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('computed openSuggestion function', () => {
    const cmp = mount(Autocomplete, {
      data: () => ({
        open: false,
      }),
    })
    expect(cmp.vm.$data.open).toBe(false)
    expect(cmp.find('li').exists()).toEqual(false)
    cmp.setData({ open: true })
    expect(cmp.vm.$data.open).toBe(true)
  })
  test('emitted selection', async () => {
    wrapper = mount(Autocomplete)
    wrapper.vm.$emit('selection', 'start')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().selection[0]).toEqual(['start'])
  })
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
