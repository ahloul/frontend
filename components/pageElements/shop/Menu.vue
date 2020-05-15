<template>
  <div>
    <h1>{{ $t('components.menu.name') }}</h1>
    <!-- Categories -->
    <div class="flex flex-wrap my-3">
      <div v-for="category in categories.rows" :key="category">
        <button
          class="border mr-3"
          :class="[
            category._id === activeCategory ? 'bg-primary text-white' : '',
          ]"
          @click="loadArticles(category._id)"
        >
          {{ category.name }}
        </button>
      </div>
    </div>
    <!-- Articles -->
    <div class="flex flex-wrap">
      <div
        v-for="article in articles.rows"
        :key="article"
        class="mt-2 flex flex-col min-h-full"
      >
        <img
          :src="article.picture.url"
          :alt="article.name"
          height="200"
          class="my-auto bg-dark"
          @error="(e) => (e.target.src = '/img/placeholder.png')"
        />
        <h2>{{ article.name }}</h2>
        <p>{{ article.price }} €</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MenuComponent',
  props: {
    shop: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
  data: () => ({
    categories: {},
    activeCategory: null,
    categoriesQuery: {
      page: 1,
    },
    articles: {},
    articlesQuery: {
      page: 1,
    },
  }),
  async mounted() {
    try {
      this.categories = await this.$axios.$get('/api/categories', {
        params: {
          shopId: this.shop._id,
          ...this.categoriesQuery,
        },
      })
    } catch (e) {
      this.categories = []
    }
  },
  methods: {
    async loadArticles(categoryId) {
      this.activeCategory = categoryId
      this.articles = await this.$axios.$get(
        `/api/articles?categoryId=${categoryId}`,
        {
          params: this.articlesQuery,
        }
      )
    },
  },
}
</script>
