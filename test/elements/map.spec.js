import { mount, shallowMount } from '@vue/test-utils'
import Map from '../../components/elements/Map.vue'


describe('Map', () => {
  let wrapper

  test.skip('is a Vue instance', () => {
    wrapper = mount(Map)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})