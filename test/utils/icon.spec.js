import { mount } from '@vue/test-utils'
import Icon from '../../components/utils/icon.vue'
import { shallowMount } from '@vue/test-utils'

describe('Icon', () => {
  let props

  beforeEach(() => {
    props = {
      name: 'undefined',
    }
  })

  test('is a Vue instance', () => {
    const wrapper = mount(Icon)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('props svg', () => {
    const wrapper = shallowMount(Icon, {
      propsData: {
        width: 18,
        height: 18,
        name: 'undefined',
        fill: 'currentColor',
      },
    })

    expect(wrapper.props().width).toBe(18)
    expect(wrapper.props().height).toBe(18)
    expect(wrapper.props().name).toBe('undefined')
    expect(wrapper.props().fill).toBe('currentColor')
  })

  test('DOM attributes from svg', () => {
    const item = {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
    }
    const wrapper = shallowMount(Icon, {
      propsData: { item },
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes().xmlns === item.xmlns).toBe(true)
    expect(svg.attributes().viewBox === item.viewBox).toBe(true)
  })

  test('methods', () => {
    const wrapper = shallowMount(Icon, {
      propsData: {
        name: 'undefined',
      },
    })
  })

  test('computed methods', () => {
    const wrapper = shallowMount(Icon, {
      propsData: {
        name: 'undefined',
      },
    })
    // wrapper.computed.icon().toBe('name')
    expect(wrapper.vm.icon)
  })
})
