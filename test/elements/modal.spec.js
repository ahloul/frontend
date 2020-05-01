import { mount, shallowMount } from '@vue/test-utils'
import Modal from '../../components/elements/Modal.vue'

describe('Modal', () => {
  let wrapper

  test('is a Vue instance', () => {
    wrapper = mount(Modal)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('watcher show', () => {
    wrapper = mount(Modal)
    expect(wrapper.vm.$props.show).toBe(true)
  })
  test('watcher show logic', () => {
    wrapper = shallowMount(Modal)
    wrapper.vm.$options.watch.show.call(wrapper.vm, true)
  })
  test('emitted dismiss', async () => {
    wrapper = mount(Modal)
    wrapper.vm.$emit('dismiss', 'Abbruch')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().dismiss[0]).toEqual(['Abbruch'])
  })
  test('Button emitted dismiss', () => {
    wrapper = shallowMount(Modal)
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('dismiss')).toHaveLength(1)
  })
  test('emitted confirm', async () => {
    wrapper = mount(Modal)
    wrapper.vm.$emit('confirm', 'okay')
    //console.log(wrapper.emitted())
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().confirm[0]).toEqual(['okay'])
  })
  test('Button emitted confirm', () => {
    wrapper = mount(Modal)
    console.log(wrapper.find('button'))
  })
})
