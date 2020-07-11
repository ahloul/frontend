<template>
  <div class="relative">
    <input
      v-model="selection[label]"
      v-bind="context.attributes"
      input-class="form-input"
      type="search"
      autocomplete="off"
      @blur="handleBlur"
      @input="change"
    />

    <ul v-if="open" class="dropdown w-full">
      <li
        v-for="(suggestion, index) in list"
        :key="index"
        class="dropdown-item"
        @click="suggestionClick(suggestion)"
      >
        {{ suggestion[label] }}
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
        if (
          !attributes.initial?.label &&
          !attributes.initial?.name &&
          !label &&
          !name
        )
          return false
        return true
      },
    },
  },
  data: () => ({
    open: false,
    selection: {},
    label: 'name',
    list: [],
  }),
  beforeMount() {
    const { endpoint, initial } = this.context.attributes
    if (endpoint === 'maps/geocode') this.label = 'label'
    if (endpoint === 'categories') this.label = 'name'

    if (initial) this.selection = initial
    else this.selection[this.label] = this.context.model[this.label]
  },
  methods: {
    // Refresh the list when the user changes input
    change: debounce(async function (e) {
      const { endpoint } = this.context.attributes
      if (!this.open) this.open = true
      const data = await this.$axios.$get(
        `/api/${endpoint}`,
        this.selection[this.label]
          ? {
              params: {
                query: this.selection[this.label],
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
      const { address, label, _id, locationId } = selection
      this.context.model = label ? { ...address, label, locationId } : _id
      this.selection = clone(selection)
      this.open = false
    },

    handleBlur: debounce(function () {
      this.open = false
      this.context.blurHandler()
      if (!this.selection[this.label]) {
        this.selection = {}
        return (this.context.model = '')
      }
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
      @apply bg-grey-lighter cursor-pointer;
    }
  }
}
</style>
