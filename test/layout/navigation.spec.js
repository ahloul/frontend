import { shallowMount, mount } from '@vue/test-utils'

import Navigation from '../../components/layout/Navigation.vue'

describe('Toggle', () => {
  let wrapper

  test.skip('is a Vue instance', () => {
    wrapper = mount(Navigation)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
