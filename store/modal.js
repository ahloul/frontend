export const state = () => ({
  message: null,
  showModal: false,
})

export const getters = {
  showModal(state) {
    return state.showModal
  },
  message(state) {
    return state.message
  },
}

export const mutations = {
  showModal(state, { message }) {
    if (!message) return
    state.message = message
    state.showModal = true
  },
  hideModal(state, index) {
    state.showModal = false
  },
}

export const actions = {}
