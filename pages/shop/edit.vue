<template>
  <div>
    <EditShop :core-shop="coreShop" />
  </div>
</template>

<script>
import EditShop from '~/components/pageElements/shop/EditShop'

export default {
  // name: 'EditShop', TODO breaks when uncommented. why?
  components: {
    EditShop,
  },
  async asyncData({ $axios, store, query, route }) {
    const { user } = store.state
    const coreShop = await $axios.$get(`/api/users/${user._id}/shops/active`)
    return { coreShop }
  },
}
</script>

<style lang="css" scoped></style>
