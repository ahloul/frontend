<template>
  <div class="flex flex-col justify-center w-full max-w-xs mx-auto">
    <button
      class="change-button hover:border-secondary"
      @click="changeComponent(['products'])"
    >
      {{ $t('components.productlist.name') }}
    </button>
    <button
      class="mt-5 change-button hover:border-secondary"
      @click="changeComponent(['menu'])"
    >
      {{ $t('components.menu.name') }}
    </button>
    <button
      v-if="shop.components.length"
      class="mt-5 change-button hover:border-warning hover:text-warning"
      @click="changeComponent([])"
    >
      {{ $t('action.deactivate') }}
    </button>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ChangeType',
  computed: {
    ...mapGetters({
      shop: 'shop/shop',
    }),
  },
  methods: {
    ...mapActions(['getMe']),
    async changeComponent(name) {
      await this.$axios.patch(`/api/shops/${this.shop._id}`, {
        components: name,
      })
      await this.getMe()
      this.$store.dispatch('toast/add', { message: `action.changed` })
      this.$emit('changed')
    },
  },
}
</script>
<style lang="scss">
.change-button {
  @apply p-5 border-2 rounded-lg font-bold;
}
</style>
