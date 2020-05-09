import { shallowMount, mount } from '@vue/test-utils'

import Navbar from '../../components/layout/Navbar.vue'

describe('Toggle', () => {
  let wrapper

  test.skip('is a Vue instance', () => {
    wrapper = mount(Navbar)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
