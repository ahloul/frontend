export default function ({ store, redirect, route }) {
  // If the user is not authenticated
  if (!store.state.accessToken) {
    return redirect('/login')
  }

  const publicRoutes = [
    'profile-settings',
    'profile-settings___de',
    'profile-settings___en',
    'profile',
    'profile___de',
    'profile___en',
  ]

  console.log(route.name)
  if (
    !store.getters.haveShop &&
    !publicRoutes.some((name) => name === route.name)
  ) {
    return redirect('/shop/create')
  }
}
