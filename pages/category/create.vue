<template>
  <div class="max-w-md mt-5">
    <ValidationObserver ref="category" v-slot="{ handleSubmit }" slim>
      <form @submit.prevent="handleSubmit(submit)">
        <!-- categoryName INPUT -->
        <label class="block">
          <ValidationProvider v-slot="{ errors }" mode="lazy" rules="required">
            <span>{{ $t('category.name') }}</span>
            <input
              id="categoryName"
              v-model="category.name"
              name="Kategorie"
              type="text"
              class="form-input"
              :placeholder="$t('category.hint')"
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
            {{ $t('category.create') }}
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
        this.$nextTick(() => {
          this.category = {}
          this.$refs.category.reset()
        })
        this.$store.dispatch('toast/add', { message: `Kategorie erstellt!` })
        await this.$router.push('/category')
      } catch (error) {
        this.loadState.create = false
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
