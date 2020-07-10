<template>
  <div>
    <h1 class="flex">
      {{ $t(`components.type.${componentName}`) }}
      <button type="button" name="button" @click="$emit('edit')">
        <icon name="edit-outline" />
      </button>
    </h1>
    <!-- Categories -->
    <div class="flex flex-wrap my-3">
      <div v-for="category in categories.rows" :key="category._id" class="mt-1">
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

    <empty-content
      v-if="categories.count === 0"
      :content="$t('no_items')"
      route="/category"
      class="mt-5"
    />

    <!-- Articles -->
    <div class="mensory-grid">
      <div
        v-for="article in articles.rows"
        :key="article._id"
        class="mensory-item border-b py-2"
      >
        <img
          :src="article.picture.url"
          :alt="article.name"
          class="block mx-auto"
          @error="(e) => (e.target.src = '/img/placeholder.png')"
        />
        <div class="flex items-center">
          <h3 class="mt-2 leading-snug">{{ article.name }}</h3>
          <!-- eslint-disable vue-i18n/no-raw-text -->
          <div class="text-dark text-sm ml-auto mt-2">
            {{ article.price }} €
          </div>
        </div>
        <div
          v-if="article.description"
          class="text-dark text-sm break-all"
          v-html="article.description"
        />
      </div>
    </div>
  </div>
</template>
<script>
import EmptyContent from '~/components/elements/EmptyContent'

export default {
  name: 'MenuComponent',
  components: {
    EmptyContent,
  },
  props: {
    componentName: {
      type: String,
      required: true,
    },
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
      limit: 100,
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
      // Active first Category
      if (this.categories.rows.length) {
        this.loadArticles(this.categories.rows[0]._id)
      }
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
