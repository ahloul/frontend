<template>
  <div>
    {{ context.model }}
    <input
      v-model="displayPrice"
      v-currency="{ currency: 'EUR', locale: 'de' }"
      v-bind="context.attributes"
      class="form-input"
      @blur="blur"
    />
  </div>
</template>

<script>
import { CurrencyDirective, parseCurrency } from 'vue-currency-input'
import { clone } from 'lodash'
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
  data() {
    return {
      displayPrice: clone(this.context.model),
    }
  },
  methods: {
    blur() {
      this.context.model = parseCurrency(this.displayPrice, {
        locale: 'de',
        currency: 'EUR',
      })
      this.context.blurHandler()
    },
  },
}
</script>

<style lang="css" scoped></style>
