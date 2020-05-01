import Notification from '../../components/elements/Notification.vue'
import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'

describe('Notification', () => {
  let wrapper

  test('is a Vue instance', () => {
    wrapper = mount(Notification)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('display content Notification', () => {
    wrapper = shallowMount(Notification)
    expect(wrapper.find('span').exists()).toBe(true)
    expect(wrapper.findAll('span').length).toBe(1)
  })
})
