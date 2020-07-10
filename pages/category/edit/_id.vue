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
              placeholder="z.B. Getränke"
            />
            <div class="error">{{ errors[0] }}</div>
          </ValidationProvider>
        </label>

        <div class="flex justify-start my-5">
          <button
            :class="{ 'spinner-dark': loadState.delete }"
            type="button"
            @click.stop="showDeleteModal()"
          >
            <icon name="trash-outline" />
          </button>
          <button
            class="primary ml-auto"
            :class="{ 'spinner-dark': loadState.update }"
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
        this.$store.dispatch('toast/add', { message: `toast.updated_category` })
        await this.$router.push('/category')
      } catch (error) {
        this.loadState.update = false
        console.log(error)
      }
    },
    showDeleteModal() {
      this.$store.commit('modal/showModal', {
        message: 'category.delete_confirmation',
        dismissText: 'dismiss',
        onConfirm: this.deleteCategory,
      })
    },
    async deleteCategory() {
      try {
        this.loadState.delete = true
        await this.$axios.delete(`/api/categories/${this.category._id}`)
        this.loadState.delete = false
        this.$store.dispatch('toast/add', {
          message: `Kategorie samt Inhalt gelöscht!`,
        })
        await this.$router.push('/category')
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
