export default function ({ store, redirect }) {
  if (store.getters.haveShop) {
    return redirect('/')
  }

  if (!store.state.accessToken) {
    return redirect('/')
  }
}
