export const state = () => {
  return {
    accessToken: null,
    user: {
      name: null,
    },
    pending: {
      login: false,
      signup: false,
      logout: false,
    },
  }
}

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
}

export const actions = {
  /**
   * nuxtServerInit start on initial loading
   * token and user validation
   */
  async nuxtServerInit({ commit, dispatch }, { app }) {
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
  // TODO: I will move that away
  async updateUser(
    { commit, state, dispatch },
    { name, picture, description, location }
  ) {
    await this.$axios.patch(`/api/users/${state.user._id}`, {
      name,
      picture,
      description,
      location,
      token: state.accessToken,
    })
    await dispatch('getMe')
  },
  // TODO: I will move that away
  async forgotPassword({ dispatch }, { email, link, accessToken }) {
    await this.$axios.post(`/api/password-resets`, {
      email,
      link,
      token: accessToken,
    })
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
  async getMe({ commit, dispatch }) {
    try {
      const { data } = await this.$axios.get('/api/users/me')
      commit('setUser', data)
    } catch (error) {
      await dispatch('resetUser')
    }
  },
  /**
   * refreshToken Action
   * get new access token for the user
   */
  async refreshToken({ state, dispatch }) {
    try {
      const { data } = await this.$axios.patch(`/api/auth/refresh`)
      await dispatch('setLocalUser', data)
      await dispatch('getMe')
    } catch (error) {
      console.log(error)
    }
  },
}

export const getters = {
  user: (state) => state.user,
  pending: (state) => state.pending,
}
