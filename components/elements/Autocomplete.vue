<template>
  <div class="relative">
    <!-- Name INPUT -->
    <input
      v-model="selection[context.attributes.dname]"
      v-bind="context.attributes"
      class="form-input"
      type="search"
      autocomplete="off"
      @blur="handleBlur"
      @input="change"
    />

    <ul v-if="openSuggestion" class="dropdown w-full">
      <li
        v-for="(suggestion, index) in list"
        :key="index"
        class="dropdown-item"
        @click="suggestionClick(suggestion)"
      >
        {{ suggestion[context.attributes.dname] }}
      </li>
    </ul>
  </div>
</template>

<script>
import { debounce, clone, isEmpty } from 'lodash'

export default {
  name: 'Autocomplete',
  props: {
    context: {
      type: Object,
      // required: true,
      default: () => {
        return {
          attributes: {
            endpoint: '',
            dname: 'name',
            placeholder: '',
            label: '',
          },
        }
      },
    },
  },
  data: () => ({
    open: false,
    selection: {
      name: null,
    },
    list: [],
  }),
  computed: {
    // The flag
    openSuggestion() {
      return this.open === true
    },
  },
  beforeMount() {
    this.selection[this.context.attributes.dname] =
      this.context.model.display || {}
  },
  mounted() {
    // if (isEmpty(this.initial)) return
    this.selection = this.context.model || {}
  },
  methods: {
    // Refresh the list when the user changes input
    change: debounce(async function (e) {
      const { endpoint, queryname, dname } = this.context.attributes
      if (!this.open) this.open = true
      const data = await this.$axios.$get(
        `/api/${endpoint}`,
        this.selection[dname]
          ? {
              params: {
                [queryname]: this.selection[dname],
                limit: 5,
              },
            }
          : null
      )
      this.list = data?.rows || data
    }, 750),

    // When one of the suggestion is clicked
    suggestionClick(selection) {
      if (isEmpty(selection)) return
      const { address, label, locationId } = selection
      this.context.model = { ...address, label, locationId }
      this.selection = clone(selection)
      this.open = false
    },

    handleBlur: debounce(function () {
      this.open = false

      this.context.blurHandler()
      if (!this.selection[this.context.attributes.dname])
        return (this.context.model = '')
    }, 200),
  },
}
</script>

<style lang="scss" scoped>
.dropdown {
  @apply bg-white shadow rounded-lg mt-1 absolute z-30;
  &-item {
    @apply p-3 text-sm w-full;
    &:hover {
      @apply bg-grey cursor-pointer;
    }
  }
}
</style>
