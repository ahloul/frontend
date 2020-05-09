import { shallowMount, mount } from '@vue/test-utils'

import EmptyState from '../../components/elements/EmptyState.vue'

describe('EmptyState ', () => {
  let wrapper

  test('is a Vue instance', () => {
    wrapper = mount(EmptyState, {
      mocks: {
        $t: () => {},
      },
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test.skip('display content', () => {
    const emptyText = 'Du hast noch keine Einträge'
    wrapper = mount(EmptyState, {
      propsData: {
        emptyText,
      },
    })
    // console.log(wrapper.html())
    expect(wrapper.find('h3').text()).toBe('Du hast noch keine Einträge')
  })
  /*  test('display content Empty State img', () => {
    const image = {
      path: '/img/coffee.svg',
    }
    wrapper = mount(EmptyState, {
      propsData: { image },
    })
    expect(wrapper.find('img').attributes().src === image.path).toBe(true)
  }) */
})
