<template>
  <div>
    <div class="flex items-center my-3">
      <h1
        class="headline flex cursor-pointer"
        @click="$router.push(`/category/edit/${category._id}`)"
      >
        {{ category.name }}
        <icon name="edit-outline" />
      </h1>
      <n-link
        :to="`/article/create?id=${category._id}`"
        class="button primary icon-r ml-auto"
        ><icon name="plus" /> {{ $t('add') }}</n-link
      >
    </div>

    <ul
      v-if="!showEmpty"
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
                    class="mt-2 mr-2 flex items-center text-sm leading-5 text-primary inline-block align-middle"
                  >
                    <icon name="cube-outline" width="15" />
                    <span class="ml-1">{{ article.stock }}</span>
                  </div>
                  <div
                    class="mt-2 flex items-center text-sm leading-5 text-primary inline-block align-middle"
                  >
                    <span class="ml-1"
                      >{{ $t('category.euro') }} {{ article.price }}</span
                    >
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
    <div class="flex justify-center">
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
import EmptyState from '~/components/elements/EmptyState'
export default {
  name: 'Categories',
  middleware: 'authenticated',
  components: {
    EmptyState,
  },
  async asyncData({ $axios, params, query }) {
    try {
      const category = await $axios.$get(`/api/categories/${params.id}`)
      const { count, nextPage, prevPage, rows } = await $axios.$get(
        `/api/articles?categoryId=${category._id}`,
        {
          params: query,
        }
      )
      return { category, articles: rows, showEmpty: !count, nextPage, prevPage }
    } catch (error) {
      console.log(error)
      return {
        category: {},
        showEmpty: true,
        nextPage: 0,
        prevPage: 0,
      }
    }
  },
  watchQuery: ['page'],
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
  @apply text-light;
  i {
    @apply hidden;
  }
  &:hover {
    @apply text-primary;
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
    @apply text-light block bg-white shadow rounded cursor-pointer select-none;

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
