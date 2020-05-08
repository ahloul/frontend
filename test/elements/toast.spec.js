import Toast from '../../components/elements/Toast.vue'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vue from 'vue'
import { mutations } from '~/store/toast'
import toastStore from '~/store/toast'



describe('testing mutations ', () => {
    const VueWithVuex = createLocalVue()
    VueWithVuex.use(Vuex)

    test('is a Vue instance', () => {
      const store = new Vuex.Store(toastStore)
      const wrapper = mount(Toast,{
       localVue: VueWithVuex,
       store
      })
      expect(wrapper.isVueInstance()).toBeTruthy()
    })
    test('mutation addToast',() => {
      const toasts = [{"message":undefined,"id":"1"}]
      const state = {
        toasts: [],
      }
      mutations.addToast(state,toasts)
      expect(state.toasts).toStrictEqual(toasts)
    })
    test('mutation removeToast',() => {
      const toasts = [{"index":1}]
      const state = {
        toasts: [],
      }
      mutations.removeToast(state, toasts)
      expect(state.toasts).toStrictEqual(toasts)
    })
    test('mutation removeLastToast',() => {
      const toasts = []
      const state = {
        toasts: [],
      }
      mutations.removeLastToast(state,toasts)
      expect(state.toasts).toStrictEqual(toasts)
    })



    // test('store is loaded', () => {
    //   const store = new Vuex.Store(toastStore)
    //   const wrapper = mount(Toast,{
    //    localVue: VueWithVuex,
    //    store
    //   })
    //   store.state.toasts.push('message')

    //   expect(wrapper.vm.toasts).toEqual(['message'])
    // })

  //   test('store works', () => {
  //     const store = new Vuex.Store(toastStore)
  //     const wrapper = mount(Toast,{
  //      localVue: VueWithVuex,
  //      store,
  //     })
  //     wrapper.vm.addToast('message')
  //     expect(wrapper.vm.toasts).toEqual(['message'])
  //   })
  // })

})