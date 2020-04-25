<template>
  <div class="max-w-md mt-5">
    <image-upload
      folder="articles"
      :image="article.picture"
      @target="selectImage"
    />

    <ValidationObserver v-slot="{ handleSubmit }" slim>
      <form @submit.prevent="handleSubmit(submit)">
        <ValidationProvider v-slot="{ errors }" rules="required">
          <!-- INPUT articleName -->
          <label class="block">
            <span>Name des Artikels</span>
            <input
              id="articleName"
              v-model="article.name"
              name="Artikel"
              type="text"
              class="form-input"
              placeholder="z.B. Kugelschreiber"
            />
            <div class="error">{{ errors[0] }}</div>
          </label>
        </ValidationProvider>

        <!-- INPUT articleStock -->
        <label class="block" for="articleStock">
          <span>Lagerbestand</span>
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
              Lagerbestand anlegen
            </button>
          </div>
        </label>

        <!-- INPUT articlePrice -->
        <label class="block" for="articlePrice">
          <span>Stückpreis</span>
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
              placeholder="z.B. 12,00"
            />
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </label>

        <!-- TAX INPUT -->
        <label class="block">
          <span>Steuersatz</span>
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
                Steuerfrei
              </option>
            </select>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </label>
        <!-- TEXTAREA Description -->
        <label class="block mb-3">
          <span>Artikelbeschreibung</span>
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
            >Artikel wird
            <span class="font-bold">{{
              article.published ? 'öffentlich' : 'nicht öffentlich'
            }}</span>
            geschaltet.</span
          >
        </label>

        <div class="flex justify-end my-5">
          <button
            class="primary"
            :class="{ 'spinner-light': loadState.create }"
            type="submit"
          >
            Artikel anlegen
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import imageUpload from '~/components/utils/ImageUpload'
import Wysiwyg from '~/components/utils/Wysiwyg'

export default {
  name: 'CreateArticle',
  middleware: 'authenticated',
  components: {
    imageUpload,
    Wysiwyg,
  },
  data: () => ({
    article: {
      picture: {
        id: null,
        url: null,
      },
      description: null,
      published: true,
      stock: -1,
    },
    loadState: {
      create: false,
    },
  }),
  computed: {
    haveStock() {
      return this.article.stock !== -1
    },
  },
  methods: {
    selectImage(target) {
      this.article.picture = target
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
        this.category = {}
        // send toast
        // TODO: Back to right category
        await this.$router.push('/categories')
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
