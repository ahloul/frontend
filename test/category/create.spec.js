import create from '../../pages/category/create.vue'
import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'

describe('Notification', () => {
  let wrapper

  test.skip('is a Vue instance', () => {
    wrapper = mount(create)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
