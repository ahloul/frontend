<template>
  <div class="max-w-sm mx-auto">
    <FormulateForm @submit="submit">
      <FormulateInput
        type="image"
        upload-behavior="live"
        validation="mime:image/jpeg,image/png,image/jpg"
        :value="[{ url: article.picture.url }]"
        name="article_picture"
        :uploader="uploadImage"
      />
      <FormulateInput
        v-model="article.category"
        :initial="category"
        type="autocomplete"
        endpoint="categories"
        :label="$t('category.title')"
        :placeholder="$t('category.hint')"
      />
      <FormulateInput
        v-model="article.name"
        type="text"
        name="article name"
        :label="$t('article.name')"
        :placeholder="$t('article.name_hint')"
        validation="required"
      />
      <FormulateInput
        v-model="article.price"
        type="currency"
        name="price"
        :label="$t('article.unit_price')"
        :placeholder="$t('article.price_hint')"
        validation="bail|required"
      />
      <FormulateInput
        v-model="article.tax"
        name="tax rate"
        :options="{
          19: '19%',
          7: '7%',
          0: $t('article.tax_free'),
        }"
        type="select"
        :label="$t('article.tax_rate')"
        validation="bail|required"
      />

      <div v-if="haveStock">
        <FormulateInput
          v-model="article.stock"
          name="stock"
          type="number"
          :label="$t('article.stock')"
          validation="bail|number|min:0,value"
          :placeholder="$t('article.stock_example')"
        />
        <button class="w-auto" @click="removeStock">
          <icon name="close-outline" fill="currentColor" width="20" />
        </button>
      </div>
      <button v-else class="primary" @click="addStock">
        {{ $t('article.create_stock') }}
      </button>

      <FormulateInput
        v-model="article.description"
        :label="$t('article.description')"
        type="wysiwyg"
        name="description"
      />
      <FormulateInput
        v-model="article.published"
        type="checkbox"
        :label="`${$t('article.public_prefix')} ${$t(
          article.published ? 'article.public' : 'article.non_public'
        )} ${$t('article.public_suffix')}`"
        name="published"
      />
      <FormulateInput type="submit" :label="$t('save')" />
    </FormulateForm>
  </div>
</template>

<script>
import { isEmpty } from 'lodash'

export default {
  name: 'CreateArticle',
  middleware: 'authenticated',
  async asyncData({ $axios, query }) {
    let category = {}
    if (isEmpty(query)) return
    try {
      category = await $axios.$get(`/api/categories/${query.id}`)
      return { category }
    } catch (error) {
      // console.log(error)
    }
  },
  data: () => ({
    article: {
      picture: {},
      category: null,
      description: null,
      published: true,
      stock: -1,
    },
    loadState: {
      create: false,
    },
  }),
  computed: {
    articleCategory(e) {
      return this.category?.name
    },
    haveStock() {
      return this.article.stock !== -1
    },
  },
  mounted() {
    if (isEmpty(this.category)) return
    this.article.category = this.category._id
  },
  methods: {
    selectImage(target) {
      this.article.picture = target
    },
    async uploadImage(file, progress, error, options) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const imgLocal = await this.$axios.$post(`/api/media/user`, formData)
        this.article.picture = imgLocal
      } catch (err) {
        console.error(err)
        error(err)
      }
    },
    selectCategory(category) {
      this.article.category = category._id
      this.$router.replace({ query: { id: category._id } })
    },
    addStock() {
      this.article.stock = 0
    },
    removeStock() {
      this.article.stock = -1
    },
    async submit() {
      try {
        await this.$axios.post(`/api/articles`, this.article)
        this.$store.dispatch('toast/add', { message: `toast.created_article` })
        // TODO: Back to right category
        await this.$router.push(`/category/${this.article.category}`)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
