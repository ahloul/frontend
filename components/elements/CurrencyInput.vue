<template>
  <div>
    <input
      v-model="context.model"
      v-currency="{ currency: 'EUR', locale: 'de' }"
      v-bind="context.attributes"
      class="form-input"
      @blur="context.blurHandler()"
    />
  </div>
</template>

<script>
import { CurrencyDirective } from 'vue-currency-input'
export default {
  name: 'FCurrencyInput',
  directives: {
    currency: CurrencyDirective,
  },
  props: {
    context: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
}
</script>

<style lang="css" scoped></style>
