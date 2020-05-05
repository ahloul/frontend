import Toggle from '../../components/elements/Toggle.vue'
import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'

describe('Toggle', () => {
  let wrapper

  test('is a Vue instance', () => {
    wrapper = mount(Toggle)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('toogle function', () => {
    wrapper = mount(Toggle)
    expect(wrapper.vm.$data.isCheckedInternal).toBe(false)
    wrapper.vm.changeToggle()
    expect(wrapper.vm.$data.isCheckedInternal).toBe(true)
  })
})
