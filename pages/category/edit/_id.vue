<template>
  <div class="max-w-md mt-5">
    <FormulateForm @submit="submit">
      <FormulateInput
        v-model="category.name"
        type="text"
        name="Kategorie"
        :label="$t('category.name')"
        :placeholder="$t('category.hint')"
        validation="required"
      />
      <FormulateInput type="submit" :label="$t('save')" />
    </FormulateForm>
    <button
      :class="{ 'spinner-dark': loadState.delete }"
      type="button"
      @click.stop="showDeleteModal()"
    >
      <icon name="trash-outline" />
    </button>
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
    validationError: '',
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
        this.$store.dispatch('toast/add', { message: `toast.updated_category` })
        await this.$router.push('/category')
      } catch (error) {
        this.loadState.update = false
        console.log(error)
        this.validationError = error
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
