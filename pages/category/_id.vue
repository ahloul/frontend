<template>
  <div>
    <div class="flex justify-end my-3">
      <n-link
        :to="`/article/create?id=${category._id}`"
        class="button primary icon-r"
        ><icon name="plus" /> {{ $t('add') }}</n-link
      >
    </div>

    <n-link
      :to="`/category/edit/${category._id}`"
      class="headline text-3xl inline-flex"
      >{{ category.name }} <icon name="edit-outline" />
    </n-link>

    <ul
      v-if="articles.length"
      class="category-box grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <li
        v-for="article in articles"
        :key="article._id"
        class="animated category-item border-l-4"
        :class="{ 'border-success': article.published }"
        @click="goToDetail(article)"
      >
        <div class="flex items-center">
          <div class="w-24 p-2">
            <img :src="article.picture.url" alt="" class="rounded" />
          </div>
          <div class="min-w-0 flex-1 flex items-center">
            <div class="min-w-0 flex-1 px-4">
              <div class="py-4">
                <div class="text-xl leading-5 font-bold truncate">
                  {{ article.name }}
                </div>
                <div class="flex">
                  <div
                    v-if="article.haveStock"
                    class="mt-2 mr-2 flex items-center text-sm leading-5 text-info inline-block align-middle"
                  >
                    <icon name="cube-outline" width="15" />
                    <span class="ml-1">{{ article.stock }}</span>
                  </div>
                  <div
                    class="mt-2 flex items-center text-sm leading-5 text-info inline-block align-middle"
                  >
                    <span class="ml-1">€ {{ article.price }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="right-icon text-light pr-5">
            <icon name="chevron-right" />
          </div>
        </div>
      </li>
    </ul>
    <empty-state v-else />
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
  async asyncData({ $axios, params }) {
    try {
      const category = await $axios.$get(`/api/categories/${params.id}`)
      const articles = await $axios.$get(
        `/api/articles?categoryId=${category._id}`
      )
      return { category, articles }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    goToDetail({ id }) {
      this.$router.push(`/article/${id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.headline {
  @apply transition duration-300 ease-in-out;
  @apply font-bold text-primary;
  i {
    @apply hidden;
  }
  &:hover {
    @apply text-info;
    i {
      @apply inline-block;
    }
  }
}
.category {
  &-box {
    @apply mx-auto;
  }

  &-item {
    @apply text-primary block bg-white shadow rounded cursor-pointer select-none;

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
