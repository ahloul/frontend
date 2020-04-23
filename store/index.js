export const state = () => {
  return {
    accessToken: null,
    user: null,
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
    /*
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
      await dispatch('logout')
    }
    */
  },
  /**
   * loginWithSocial action.
   * If user want to login or signup with social providers
   */
  async loginWithSocial({ dispatch }, { accessToken, provider }) {
    // Try to get userinformation from backend
    const { data } = await this.$axios.post(`/api/auth/${provider}`, {
      token: accessToken,
    })
    dispatch('setLocalUser', data)
    dispatch('getMe')
  },
  async loginWithEmail({ dispatch, commit }, { email, password, accessToken }) {
    commit('setPending', { login: true })
    // Try to get userinformation from backend
    const { data } = await this.$axios.post(`/api/auth`, {
      token: accessToken,
      email,
      password,
    })
    dispatch('setLocalUser', data)
    dispatch('getMe')
    commit('setPending', { login: false })
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
  async createUser({ commit }, { name, email, password, accessToken }) {
    await this.$axios.post(`/api/users`, {
      name,
      email,
      password,
      token: accessToken,
    })
  },
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
  async forgotPassword({ dispatch }, { email, link, accessToken }) {
    await this.$axios.post(`/api/password-resets`, {
      email,
      link,
      token: accessToken,
    })
  },
  /**
   * logout Action
   * logout the user clean the state, remove cookie and reset axios config
   */
  async passwordReset({ dispatch, commit }, { token, password }) {
    await this.$axios.patch(`/api/password-resets/${token}`, { password })
  },
  async verifyToken({ dispatch }, { token }) {
    const { data } = await this.$axios.get(`/api/password-resets/${token}`)
    return data
  },
  /**
   * logout Action
   * logout the user clean the state, remove cookie and reset axios config
   */
  async logout({ commit }, clientLogout) {
    try {
      if (!clientLogout) {
        await this.$axios.post(`/api/auth/logout`)
      }
    } catch (error) {
      console.log(error)
    } finally {
      await this.$axios.setToken(false)
      await this.$cookies.remove('getit')
      commit('setToken', null)
    }
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
      await dispatch('logout')
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
