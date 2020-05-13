export default function ({ store, redirect, route }) {
  // If the user is not authenticated
  if (!store.state.accessToken) {
    return redirect('/login')
  }

  if (!store.getters.isAdmin) {
    store.dispatch('toast/add', { message: `toast.not_authorized` })
    store.dispatch('resetUser')
    return redirect('/login')
  }
}
