<template>
  <div class="max-w-md mt-5">
    <ValidationObserver v-slot="{ handleSubmit }" slim>
      <form @submit.prevent="handleSubmit(submit)">
        <!-- categoryName INPUT -->
        <label class="block">
          <ValidationProvider v-slot="{ errors }" rules="required">
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
            :class="{ 'spinner-light': loadState.create }"
            type="submit"
          >
            Kategorie anlegen
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
  data: () => ({
    category: {},
    loadState: {
      create: false,
    },
  }),
  methods: {
    async submit() {
      try {
        this.loadState.create = true
        await this.$axios.post(`/api/categories`, this.category)
        this.loadState.create = false
        this.category = {}
        // send toast
        await this.$router.push('/categories')
      } catch (error) {
        this.loadState.create = false
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
