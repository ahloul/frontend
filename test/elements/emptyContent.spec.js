import EmptyContent from '../../components/elements/EmptyContent.vue'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

//const localvue = createLocalVue()
//localVue.use(VueRouter)
//const router = new VueRouter()

//shallowMount(EmptyContent, {
//  localVue
//})

describe('EmptyContent ', () => {
  let wrapper

  test('is a Vue instance', () => {
    wrapper = mount(EmptyContent)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('click on div', () => {
    const goToRoute = jest.fn()
    wrapper = mount(EmptyContent, {
      propsData: {
        goToRoute,
      },
    })
    wrapper.find('div').trigger('click')
    expect(goToRoute).toHaveBeenCalled
  })

  test('display content', () => {
    const content = 'Kein Content vorhanden'
    wrapper = mount(EmptyContent, {
      propsData: {
        content: content,
      },
    })
    //console.log(wrapper.html())
    expect(wrapper.find('div').text()).toBe('Kein Content vorhanden')
  })
})
