import index from '../../pages/profile/index.vue'
import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'

describe('Notification', () => {
  let wrapper

  test('is a Vue instance', () => {
    wrapper = mount(index)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
