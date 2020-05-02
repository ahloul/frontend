<template>
  <div>
    <div class="flex justify-end my-3">
      <n-link :to="`/article/edit/${article.id}`" class="button primary icon-r"
        ><icon name="edit" /> {{ $t('edit') }}</n-link
      >
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div class="max-w-sm mx-auto">
        <img :src="article.picture.url" :alt="article.name" />
      </div>
      <div class="w-full max-w-sm md:max-w-none mx-auto">
        <div class="card">
          <div>
            <h2 class="leading-none text-secondary">{{ article.name }}</h2>
            <span class="text-light">{{ article.category.name }}</span>
            <div class="bg-grey p-3 rounded text-sm mt-3">
              {{ article.price }} €
              <span class="mx-2 inline" aria-hidden="true">
                &middot;
              </span>
              <span
                class="font-bold"
                :class="[article.published ? 'text-success' : 'text-light']"
                >{{
                  article.published ? 'Veröffentlicht' : 'nicht öffentlich'
                }}</span
              >
            </div>
          </div>
          <div v-if="article.author" class="mt-4 inline-flex content-center">
            <img
              :src="article.author.picture.url"
              :alt="article.author.name"
              class="rounded-full"
              width="30"
            />
            <div class="my-auto ml-2">{{ article.author.name }}</div>
          </div>
        </div>
        <label v-if="article.haveStock" class="block" for="articleStock">
          <span>{{ $t('article.stock') }}</span>
          <ValidationProvider
            v-slot="{ errors }"
            tag="div"
            name="Lagerbestand"
            rules="numeric|required"
          >
            <div class="flex">
              <input
                id="articleStock"
                v-model.number="article.stock"
                type="number"
                class="form-input block w-full"
                :placeholder="$t('article.price_hint')"
                @blur="change"
                @keyup.enter="change"
              />
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </label>

        <div class="mt-10 mb-3 text-light">{{ $t(article.description) }}</div>
        <div
          v-if="article.description"
          class="w-full"
          v-html="article.description"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  name: 'ArticleDetails',
  async asyncData({ $axios, params }) {
    try {
      const article = await $axios.$get(`/api/articles/${params.id}`)
      return { article }
    } catch (error) {
      console.log(error)
    }
  },
  data: () => ({}),
  methods: {
    change: debounce(async function (e) {
      try {
        await this.$axios.patch(`/api/articles/${this.article.id}`, {
          stock: this.article.stock,
        }) // send toast
        this.$store.dispatch('toast/add', { message: `toast.updated_stock` })
      } catch (error) {
        console.log(error)
      }
    }, 250),
  },
}
</script>

<style lang="css" scoped></style>
