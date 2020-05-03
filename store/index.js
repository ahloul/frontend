export const state = () => ({
  accessToken: null,
  user: {
    name: null,
  },
  pending: {
    login: false,
    signup: false,
    logout: false,
  },
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
})

export const mutations = {
  setToken(state, token) {
    state.accessToken = token
  },
  setUser(state, user) {
    state.user = user
  },
  setPending(state, { login, signup, logout }) {
    state.pending = {
      ...login,
      ...signup,
      ...logout,
    }
  },
  setLang(state, locale) {
    if (state.locales.find((el) => el.code === locale)) {
      state.locale = locale
    }
  },
  updateUser(state, updates) {
    Object.assign(state.user, updates)
  },
}

export const actions = {
  /**
   * nuxtServerInit start on initial loading
   * token and user validation
   */
  async nuxtServerInit({ commit, dispatch, state }, { app }) {
    try {
      // Try to get token from Browser
      const accessToken = await this.$cookies.get('getit')

      // Set token to $axios module config
      app.$axios.setToken(accessToken, 'Bearer')

      // Set token to vuex state
      commit('setToken', accessToken)

      // If token exist, try to get user information with getMe action
      if (accessToken) {
        await dispatch('getMe')
      }
    } catch (e) {
      // Clean store if user not exist with logout action
      await dispatch('resetUser')
    }
  },
  async setLocalUser({ commit }, token) {
    // Set CSR Token
    await this.$axios.setToken(token, 'Bearer')
    await this.$cookies.set('getit', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
    commit('setToken', token)
  },

  /**
   * resetUser Action
   * resetUser the user clean the state, remove cookie and reset axios config
   */
  async resetUser({ commit }) {
    await this.$axios.setToken(false)
    await this.$cookies.remove('getit')
    commit('setToken', null)
  },
  /**
   * getMe Action
   * get User Information
   */
  async getMe({ state, commit, dispatch }) {
    try {
      const { data } = await this.$axios.get('/api/users/me')
      const shopdata = await dispatch('shop/getActiveShop', data)
      Object.assign(data, shopdata)
      commit('setUser', data)
    } catch (error) {
      await dispatch('resetUser')
      console.log(error)
    }
  },
}

export const getters = {
  user: (state) => state.user,
  pending: (state) => state.pending,
  haveShop: (state) => !!state.user.activeShop,
}
