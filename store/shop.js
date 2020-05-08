export const state = () => {
  return {
    shop: {},
    pending: {
      login: false,
      signup: false,
      logout: false,
    },
  }
}

export const mutations = {
  setShop(state, shop) {
    state.shop = shop
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
   * getShop Action
   * get Users shop
   */
  async getActiveShop({ commit, dispatch, rootState }, { activeShop, _id }) {
    try {
      if (!activeShop) return
      const { data } = await this.$axios.get(`/api/users/${_id}/shops/active`)
      commit('setShop', data)
    } catch (error) {
      console.log(error)
      commit(
        'modal/showModal',
        { message: 'information.shop_not_found' },
        { root: true }
      )
      return { activeShop: undefined, shops: [] }
    }
  },
}

export const getters = {
  shop: (state) => state.shop,
}
