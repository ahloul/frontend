<template>
  <div class="relative">
    <ValidationProvider
      v-slot="{ errors }"
      :name="name"
      :rules="rules"
      autocomplete="off"
    >
      <!-- Name INPUT -->
      <input
        ref="inputValue"
        v-model="selection[displayName]"
        :placeholder="placeholder"
        class="form-input"
        type="text"
        autocomplete="__away"
        @input="change"
        @blur="handleBlur"
      />
      <ul v-if="openSuggestion" class="dropdown w-full">
        <li
          v-for="(suggestion, index) in list"
          :key="index"
          class="dropdown-item"
          @click="suggestionClick(suggestion)"
        >
          {{ suggestion[displayName] }}
        </li>
      </ul>
      <span class="error">{{ errors[0] }}</span>
    </ValidationProvider>
  </div>
</template>

<script>
import { debounce, clone, isEmpty } from 'lodash'
export default {
  name: 'Autocomplete',
  props: {
    name: {
      type: String,
      required: false,
      default: 'autocomplete',
    },
    endpoint: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      default: 'name',
    },
    queryname: {
      type: String,
      default: 'search',
    },
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    rules: {
      type: [String, Object],
      default: null,
    },
    initial: {
      type: Object,
      default: () => ({}),
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
    this.selection[this.displayName] = this.value
  },
  mounted() {
    if (isEmpty(this.initial)) return
    this.$emit('selection', this.initial)
    this.selection = clone(this.initial)
  },
  methods: {
    // When the user changes input
    //
    change: debounce(async function (e) {
      if (!this.open) this.open = true
      const rows = await this.$axios.$get(
        `/api/${this.endpoint}`,
        this.selection[this.displayName]
          ? { params: { [this.queryname]: this.selection[this.displayName] } }
          : null
      )
      this.list = rows
    }, 750),

    // When one of the suggestion is clicked
    suggestionClick(selection) {
      if (isEmpty(selection)) return
      this.$emit('selection', selection)
      this.selection = clone(selection)
      this.open = false
    },

    handleBlur: debounce(function () {
      this.open = false
      if (!this.selection[this.displayName]) return this.$emit('selection', {})
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
