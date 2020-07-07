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
      validator: ({ attributes, blurHandler }) => {
        return (
          typeof attributes === 'object' && typeof blurHandler === 'function'
        )
      },
    },
  },
}
</script>

<style lang="css" scoped></style>
