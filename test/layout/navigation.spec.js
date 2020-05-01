import Navigation from '../../components/layout/Navigation.vue'
import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'

describe('Toggle', () => {
  let wrapper

  test('is a Vue instance', () => {
    wrapper = mount(Navigation)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
