<template>
  <div class="max-w-md mt-5">
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

        <div class="flex justify-end my-5">
          <button
            class="primary"
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
    loadState: {
      update: false,
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
  },
}
</script>

<style lang="scss" scoped></style>
