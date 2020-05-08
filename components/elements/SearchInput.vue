<template>
  <ValidationObserver v-slot="{ handleSubmit }" slim>
    <form autocomplete="off" @submit.prevent="handleSubmit(submit)">
      <ValidationProvider v-slot="{ errors }" name="Suche" rules="max:100">
        <!-- articleName INPUT -->
        <label for="searchInput">
          <input
            id="searchInput"
            v-model.trim="searchtext"
            type="text"
            class="form-input block w-full"
            :placeholder="placeholder"
            autocomplete="off"
          />
          <span class="error-message">{{ errors[0] }}</span>
        </label>
      </ValidationProvider>
    </form>
  </ValidationObserver>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    placeholder: {
      type: String,
      default: 'Suche',
    },
  },
  data: () => ({
    searchtext: null,
  }),
  methods: {
    submit() {
      this.$emit('search', this.searchtext)
    },
  },
}
</script>

<style lang="css" scoped></style>
