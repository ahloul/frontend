<template>
  <div>
    <search-input
      class="block w-full ml-auto md:max-w-sm mx-auto mt-5"
      @search="applySearch"
    />
    <list-all-shops
      :shops.sync="shops"
      :user="user"
      :pending="pending"
      :count="count"
      @changeShop="changeShop"
    />
    <div class="flex justify-center my-5">
      <n-link
        v-if="prevPage"
        :to="`?page=${prevPage}`"
        class="button icon-l mx-2"
        ><icon name="chevron-left-outline" />
        {{ $t('processes.previous') }}</n-link
      >
      <n-link
        v-if="nextPage"
        :to="`?page=${nextPage}`"
        class="button icon-r mx-2"
        >{{ $t('processes.next') }}<icon name="chevron-right-outline"
      /></n-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SearchInput from '~/components/elements/SearchInput'
import ListAllShops from '~/components/pageElements/admin/ListAllShops'
export default {
  name: 'Admin',
  middleware: ['admin'],
  components: {
    SearchInput,
    ListAllShops,
  },
  async asyncData({ $axios, query, redirect, store }) {
    try {
      const { rows, count, nextPage, prevPage } = await $axios.$get(
        '/api/shops',
        {
          params: query,
        }
      )
      return { shops: rows, nextPage, prevPage, count }
    } catch (error) {
      console.log(error)
      return { categories: [], showEmpty: true, nextPage: 0, prevPage: 0 }
    }
  },
  data: () => ({
    pending: null,
  }),
  watchQuery: ['page', 'search'],
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions(['getMe']),
    async changeShop({ _id, name }) {
      try {
        // Set pending
        this.pending = _id

        // Set new Shop
        await this.$axios.patch(`/api/users/me/shops/active`, { _id })

        // Update user in storage
        await this.getMe()

        // Set pending
        this.pending = null

        // Send toast
        this.$store.dispatch('toast/add', {
          message: `toast.shop_changed`,
          text: name,
        })
      } catch (error) {
        console.log(error)
        this.pending = null
        this.$store.dispatch('toast/add', { message: `toast.something_wrong` })
      }
    },
    applySearch(val) {
      this.$router.push({
        query: { ...this.$route.query, search: val, page: 1 },
      })
    },
  },
}
</script>
