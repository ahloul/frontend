import { shallowMount, mount } from '@vue/test-utils'

import create from '../../pages/category/create.vue'

describe('Notification', () => {
  let wrapper

  test.skip('is a Vue instance', () => {
    wrapper = mount(create)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
