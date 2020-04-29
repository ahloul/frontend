<template>
  <div>
    <div class="flex justify-end my-3">
      <n-link to="/category/create" class="button primary icon-r"
        ><icon name="plus" /> Hinzufügen</n-link
      >
    </div>
    <empty-state v-if="showEmpty" />
    <ul class="category-box">
      <li
        v-for="category in categories"
        :key="category._id"
        class="animated category-item"
        @click="goToDetail(category)"
      >
        <div class="flex items-center p-6">
          <div class="min-w-0 flex-1 flex items-center">
            <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <div class="text-xl leading-5 font-bold truncate">
                  {{ category.name }}
                </div>
                <div
                  class="mt-2 flex items-center text-sm leading-5 text-info inline-block align-middle"
                >
                  <icon name="keypad-outline" width="15" />
                  <span v-if="category.article_count" class="ml-1"
                    >{{ category.article_count }} Artikel</span
                  >
                  <span v-else class="ml-1">Keine Artikel</span>
                </div>
              </div>
            </div>
          </div>
          <div class="right-icon text-light">
            <icon name="chevron-right" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import EmptyState from '~/components/elements/EmptyState'
export default {
  name: 'Categories',
  middleware: 'authenticated',
  components: {
    EmptyState,
  },
  async asyncData({ $axios }) {
    let showEmpty = false
    const categories = await $axios.$get('/api/categories')
    if (!categories.length) {
      showEmpty = true
    }
    return { categories, showEmpty }
  },
  methods: {
    goToDetail({ _id }) {
      this.$router.push(`/category/${_id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.category {
  &-box {
    @apply max-w-xl mx-auto;
  }

  &-item {
    @apply text-primary my-2 block bg-white shadow rounded cursor-pointer select-none;

    &:hover {
      @apply shadow-lg;

      .right-icon {
        @apply transition ease-in-out duration-300;
        @apply text-primary;
        transform: translate(0.5em, 0);
      }
    }

    &:focus {
      @apply outline-none;
    }
  }
}
</style>
