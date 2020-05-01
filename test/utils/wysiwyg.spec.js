import { mount } from '@vue/test-utils'
import { shallowMount } from '@vue/test-utils'
import Wysiwyg from '../../components/utils/Wysiwyg.vue'

describe('Wysiwyg props', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Wysiwyg)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('props Wysiwyg', () => {
    const wrapper = shallowMount(Wysiwyg, {
      propsData: {
        initialContent: null,
        label: null,
      },
    })
    expect(wrapper.props().initialContent).toBe(null)
    expect(wrapper.props().label).toBe(null)
  })
})

describe('lifecycle methods Wysiwyg', () => {
  test('mounted editor', () => {
    const wrapper = mount(Wysiwyg)
    expect(wrapper.vm.editor).not.toBe(null)
  })
  test('instance gets destroyed', () => {
    const beforeDestroySpy = jest.spyOn(Wysiwyg, 'beforeDestroy')
    const wrapper = mount(Wysiwyg)
    expect(wrapper.vm.editor).not.toBe(null)
  })
})
