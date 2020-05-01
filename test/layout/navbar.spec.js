import Navbar from '../../components/layout/Navbar.vue'
import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'

describe('Toggle', () => {
  let wrapper

  test('is a Vue instance', () => {
    wrapper = mount(Navbar)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
