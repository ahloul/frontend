import index from '../../pages/shop/index.vue'
import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'

describe('Notification', () => {
  let wrapper

  test('is a Vue instance', () => {
    wrapper = mount(index)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
