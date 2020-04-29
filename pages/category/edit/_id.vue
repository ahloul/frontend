<template>
  <div class="max-w-md mt-5">
    <modal
      :show="showModal"
      centered
      dismiss="Schließen"
      @dismiss="showModal = false"
      @confirm="deleteCategory"
      >Bist du sicher, dass du die Kategorie löschen möchtest?
      <br />
      <b
        >Die darin enthaltenen Artikel werden ebenfalls unwiederuflich
        gelöscht!</b
      ></modal
    >
    <ValidationObserver ref="category" v-slot="{ handleSubmit }" slim>
      <form @submit.prevent="handleSubmit(submit)">
        <!-- categoryName INPUT -->
        <label class="block">
          <ValidationProvider v-slot="{ errors }" mode="lazy" rules="required">
            <span>Name der Kategorie</span>
            <input
              id="categoryName"
              v-model="category.name"
              name="Kategorie"
              type="text"
              class="form-input"
              placeholder="z.B. Getränke"
            />
            <div class="error">{{ errors[0] }}</div>
          </ValidationProvider>
        </label>

        <div class="flex justify-start my-5">
          <button
            :class="{ 'spinner-dark': loadState.delete }"
            type="button"
            @click="showModal = true"
          >
            <icon name="trash-outline" />
          </button>
          <button
            class="primary ml-auto"
            :class="{ 'spinner-light': loadState.update }"
            type="submit"
          >
            Speichern
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: 'CreateCategory',
  middleware: 'authenticated',
  async asyncData({ $axios, params }) {
    const category = await $axios.$get(`/api/categories/${params.id}`)
    return { category }
  },
  data: () => ({
    showModal: false,
    loadState: {
      update: false,
      delete: false,
    },
  }),
  methods: {
    async submit() {
      try {
        this.loadState.update = true
        await this.$axios.patch(
          `/api/categories/${this.category._id}`,
          this.category
        )
        this.loadState.update = false
        this.$nextTick(() => {
          this.category = {}
          this.$refs.category.reset()
        })
        // send toast
        await this.$router.push('/category')
      } catch (error) {
        this.loadState.update = false
        console.log(error)
      }
    },
    async deleteCategory() {
      this.showModal = false
      this.loadState.delete = true
      await this.$axios.delete(`/api/categories/${this.category._id}`)
      this.loadState.delete = false
      await this.$router.push('/category')
    },
  },
}
</script>

<style lang="scss" scoped></style>
