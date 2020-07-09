<template>
  <div>
    <input
      v-model="context.model"
      v-currency="{ currency: 'EUR', locale: 'de' }"
      v-bind="context.attributes || {}"
      class="form-input"
    />
  </div>
</template>

<script>
import { CurrencyDirective } from 'vue-currency-input'
export default {
  name: 'CurrencyInput',
  directives: {
    currency: CurrencyDirective,
  },
  props: {
    context: {
      required: true,
      type: Object,
      default: () => {
        return {
          attributes: {},
        }
      },
      validator: ({ attributes }) => {
        return typeof attributes === 'object'
      },
    },
  },
}
</script>

<style lang="css" scoped></style>
