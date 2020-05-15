<template>
  <div class="max-w-md mt-5">
    <image-upload
      folder="article"
      :image="article.picture"
      @target="selectImage"
    />
    <ValidationObserver v-slot="{ handleSubmit }" slim>
      <form @submit.prevent="handleSubmit(submit)">
        <!-- userLocation INPUT -->
        <label class="block">
          <span>{{ $t('category.title') }}</span>
          <autocomplete
            :endpoint="`categories`"
            :value="articleCategory"
            @selection="selectCategory"
          />
        </label>

        <ValidationProvider v-slot="{ errors }" rules="required">
          <!-- INPUT articleName -->
          <label class="block">
            <span>{{ $t('article.name') }}</span>
            <input
              id="articleName"
              v-model="article.name"
              name="Artikel"
              type="text"
              class="form-input"
              :placeholder="$t('article.name_hint')"
            />
            <div class="error">{{ errors[0] }}</div>
          </label>
        </ValidationProvider>

        <!-- INPUT articleStock -->
        <label class="block" for="articleStock">
          <span>{{ $t('article.stock') }}</span>
          <ValidationProvider
            v-if="haveStock"
            v-slot="{ errors }"
            tag="div"
            name="Lagerbestand"
            rules="numeric"
          >
            <div class="flex">
              <input
                id="articleStock"
                v-model.number="article.stock"
                type="number"
                class="form-input block w-full"
                placeholder="z.B. 250"
              />
              <button class="w-auto" @click="removeStock">
                <icon name="close-outline" fill="currentColor" width="20" />
              </button>

              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <div v-else>
            <button class="primary" @click="addStock">
              {{ $t('article.create_stock') }}
            </button>
          </div>
        </label>

        <!-- INPUT articlePrice -->
        <label class="block" for="articlePrice">
          <span>{{ $t('article.unit_price') }}</span>
          <ValidationProvider
            v-slot="{ errors }"
            name="Preis"
            rules="decimal|required"
          >
            <!-- articlePrice INPUT -->
            <currency-input
              v-model="article.price"
              class="form-input"
              locale="de"
              :placeholder="$t('article.price_hint')"
            />
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </label>

        <!-- TAX INPUT -->
        <label class="block">
          <span>{{ $t('article.tax_rate') }}</span>
          <ValidationProvider
            v-slot="{ errors }"
            mode="lazy"
            slim
            rules="required"
            name="Steuersatz"
          >
            <select v-model="article.tax" class="form-select w-full">
              <option :value="19">
                19 %
              </option>
              <option :value="7">
                7 %
              </option>
              <option :value="0">
                {{ $t('article.tax_free') }}
              </option>
            </select>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </label>
        <!-- TEXTAREA Description -->
        <label class="block mb-3">
          <span>{{ $t('article.description') }}</span>
          <ValidationProvider v-slot="{ errors }" name="Artikelbeschreibung">
            <wysiwyg @content="(data) => (article.description = data)" />
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </label>

        <!-- CHECKBOX published -->
        <label class="inline-block my-3">
          <input
            v-model="article.published"
            type="checkbox"
            class="form-checkbox"
            checked
          />
          <span class="ml-2"
            >{{ $t('article.public_prefix') }}
            <span class="font-bold">
              {{
                $t(article.published ? 'article.public' : 'article.non_public')
              }}
            </span>
            {{ $t('article.public_suffix') }}.</span
          >
        </label>

        <div class="flex justify-end my-5">
          <button
            class="cta bg-tertiary"
            :class="{ 'spinner-light': loadState.create }"
            type="submit"
          >
            {{ $t('save') }}
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { isEmpty } from 'lodash'
import Autocomplete from '~/components/elements/Autocomplete'
import imageUpload from '~/components/utils/ImageUpload'
import Wysiwyg from '~/components/utils/Wysiwyg'

export default {
  name: 'CreateArticle',
  middleware: 'authenticated',
  components: {
    Autocomplete,
    imageUpload,
    Wysiwyg,
  },
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
