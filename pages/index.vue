<template>
  <div class="container">
    <!-- CTA -->
    <div
      class="hero flex items-stretch flex-col h-48 md:h-64 bg-cover bg-center rounded-lg mt-2 text-white"
      style="background-image: url('/img/shop.jpg');"
    >
      <div class="flex-1 text-right px-4 py-2 m-2">
        <!-- <button class="link ml-auto">
          <icon name="close" fill="white" />
        </button>
      --></div>
      <div class="self-center flex-1 text-center px-4 py-2 m-2">
        <h1 class="antialiased text-white font-semibold">
          {{ $t('processes.welcome') }}
        </h1>
      </div>
      <div class="flex-1 text-center px-4 py-2 m-2">
        <!-- Bottom -->
      </div>
    </div>
    <div class="card text-primary mt-5">
      <p class="font-bold max-w-md mx-auto py-3 text-center">
        {{ $t('processes.intro') }}
      </p>
      <div class="w-auto max-w-xs mx-auto">
        <n-link class="button primary mx-auto" to="/category">
          {{ $t('processes.add_article') }}
        </n-link>
      </div>
    </div>
    <!-- {{ shop }} -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'authenticated',
  computed: {
    ...mapGetters({
      shop: 'shop/shop',
    }),
  },
}
</script>
<style lang="scss" scoped>
.hero {
  box-shadow: inset 0 0 0 100vw rgba(78, 33, 90, 0.3);
}
</style>
