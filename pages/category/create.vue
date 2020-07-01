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
      <FormulateInput type="submit" :label="$t('category.create')" />
    </FormulateForm>
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
    validationError: '',
  }),
  methods: {
    async submit() {
      try {
        this.loadState.create = true
        await this.$axios.post(`/api/categories`, this.category)
        this.loadState.create = false
        this.$store.dispatch('toast/add', { message: `toast.created_category` })
        await this.$router.push('/category')
      } catch (error) {
        this.loadState.create = false
        console.log(error)
        this.validationError = error
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
