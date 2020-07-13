<template>
  <div>
    <admin-bar />
    <FormulateInput
      class="block w-full ml-auto md:max-w-sm mx-auto mt-5"
      type="search"
      :placeholder="$t('search')"
      validation="max:100,length"
      @search="applySearch"
    />
    <list-all-users :users.sync="users" :user="user" :count="count" />
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
import ListAllUsers from '~/components/pageElements/admin/ListAllUsers'
import AdminBar from '~/components/pageElements/admin/AdminBar'
export default {
  name: 'AdminUsers',
  middleware: ['admin'],
  components: {
    ListAllUsers,
    AdminBar,
  },
  async asyncData({ $axios, query, redirect, store }) {
    try {
      const { rows, count, nextPage, prevPage } = await $axios.$get(
        '/api/users',
        {
          params: query,
        }
      )
      return { users: rows, nextPage, prevPage, count }
    } catch (error) {
      console.log(error)
      return {
        categories: [],
        showEmpty: true,
        nextPage: 0,
        prevPage: 0,
        users: [],
        count: 0,
      }
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
    applySearch(val) {
      this.$router.push({
        query: { ...this.$route.query, search: val, page: 1 },
      })
    },
  },
}
</script>
