export const state = () => ({
  message: null,
  showModal: false,
  confirmText: 'confirm',
  dismissText: null,
  onConfirm: () => {},
  onDismiss: () => {},
})

export const getters = {
  showModal(state) {
    return state.showModal
  },
  message(state) {
    return state.message
  },
  confirmText(state) {
    return state.confirmText
  },
  dismissText(state) {
    return state.dismissText
  },
}

export const mutations = {
  showModal(
    state,
    { message, onConfirm, onDismiss, confirmText, dismissText }
  ) {
    if (!message) return
    state.message = message
    state.showModal = true

    const empty = () => {}
    state.onConfirm = onConfirm || empty
    state.onDismiss = onDismiss || empty

    state.confirmText = confirmText || 'confirm'
    state.dismissText = dismissText || null
  },
  hideModal(state, index) {
    state.showModal = false
  },
  confirm(state) {
    state.onConfirm()
    state.showModal = false
  },
  dismiss(state) {
    state.onDismiss()
    state.showModal = false
  },
}
