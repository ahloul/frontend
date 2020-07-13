<template>
  <input
    id="searchInput"
    v-model.trim="context.model"
    type="text"
    class="form-input block w-full"
    v-bind="context.attributes"
    autocomplete="off"
    @blur="context.blurHandler"
    @input="submit"
  />
</template>

<script>
import { debounce } from 'lodash'
export default {
  name: 'SearchInput',
  props: {
    context: {
      required: true,
      type: Object,
      default: () => {
        return {
          attributes: {},
        }
      },
      validator: ({ attributes, blurHandler, model: { label, name } }) => {
        if (typeof attributes !== 'object') return false
        if (typeof blurHandler !== 'function') return false
        return true
      },
    },
  },
  data: () => ({
    searchtext: null,
  }),
  methods: {
    submit: debounce(function () {
      this.$emit('search', this.context.model)
    }, 750),
  },
}
</script>

<style lang="css" scoped></style>
