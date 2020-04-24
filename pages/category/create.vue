<template>
  <div class="max-w-md mt-5">
    <ValidationObserver v-slot="{ handleSubmit }" slim>
      <form @submit.prevent="handleSubmit(submit)">
        <ValidationProvider v-slot="{ errors }" rules="required">
          <!-- categoryName INPUT -->
          <label class="block">
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
          </label>
        </ValidationProvider>
        <div class="flex justify-end my-3">
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
        await this.$axios.post(`/api/categories`, this.category)
        this.category = {}
        // send toast
        await this.$router.push('/categories')
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
