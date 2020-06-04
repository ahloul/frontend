import FooterBar from '../../components/layout/FooterBar.vue'
import { mount ,shallowMount,createLocalVue} from '@vue/test-utils'
import indexStore from '~/store/index'
import Vuex from 'vuex'
import mergeWith from 'lodash.mergewith'
import {state} from '~/store/index'

const localVue = createLocalVue()
localVue.use(Vuex)

const switchLanguage = (localCode) => {
  shallowMount(FooterBar, {
    $cookies: {set:jest.fn()}
  })
}

describe('Footer Bar is Vue instance', () => {
  let wrapper
   
  const VueWithVuex = createLocalVue()
     VueWithVuex.use(Vuex)

    test('is a Vue instance', () => {
      const store = new Vuex.Store(indexStore)
      wrapper = mount(FooterBar, {
       localVue: VueWithVuex,
       store
      })
      expect(wrapper.isVueInstance()).toBeTruthy()
    })
})

describe('Footer exist', () => {
    let storeOptions
    let wrapper
    let store

    beforeEach(() => {
        storeOptions = {
            state:{
             locales: [
                 {
                   code: 'de',
                   name: 'Deutsch',
                 },
                 {
                   code: 'en',
                   name: 'English',
                 },
               ],
               locale: 'en',
            },
        }
        store = new Vuex.Store(storeOptions)
      })

      function createWrapper (overrides) {
        let store
        const defaultMountingOptions = {
            mocks: {
                $cookies: {set: jest.fn()}
            },
            localVue,
            state,
            store,
            computed:{
              locales(){
                return storeOptions.state.locales
              },
              locale(){
                return storeOptions.state.locale
              },
              methods:{
                switchLanguage(localeCode) {
                    this.$cookies.set('locale', localeCode)
                    location.reload()
                  },
              }
        }
    }
        return shallowMount(FooterBar, mergeWith(defaultMountingOptions, overrides))
      }

      test.skip('set cookie', () => {
        wrapper = createWrapper()
        wrapper.find('[data-test="switchLanguage"]').trigger('click')
        wrapper.vm.$cookies.set = jest.fn().mockImplementation(() => 907);

      })
      test.skip('should provide a default function if no implementation passed', () => {
        store = new Vuex.Store(indexStore)
        wrapper = createWrapper()
        const mockFn = switchLanguage()
        expect(mockFn().toBeUndefined())
        expect(mockFn.mock.calls).toHaveLenght(1)
      })

  })

