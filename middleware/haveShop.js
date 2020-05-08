export default function ({ store, redirect }) {
  if (store.getters.haveShop) {
    console.log('have shop')
    return redirect('/')
  }

  if (!store.state.accessToken) {
    return redirect('/')
  }
}
