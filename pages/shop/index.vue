<template>
  <div class="max-w-2xl mt-3">
    <!-- CTA -->
    <div
      class="hero-wrap h-48 md:h-64"
      style="background-image: url('/img/placeholder-bg.png');"
    >
      <div class="flex justify-end">
        <div class="">
          <button
            class="button icon-r my-3"
            @click="$router.push('/shop/settings')"
          >
            <icon name="settings-outline" class="mx-1" fill="white" />
          </button>
        </div>
      </div>
      <div class="flex mt-auto hero-info rounded-b-lg">
        <div class="p-2 m-2 bg-white rounded shadow-sm">
          <img src="/img/placeholder.png" alt="" width="100" />
        </div>
        <div class="mt-auto mb-4 flex flex-col">
          <div>
            <h3>{{ shop.name }}</h3>
          </div>
          <div class="leading-none">District of shop</div>
        </div>
      </div>
    </div>

    <div class="flex justify-between sm:justify-end">
      <div>
        <button class="icon"><icon name="pin-outline" class="mx-1" /></button>
      </div>
      <div>
        <button class="icon">
          <icon name="clock-outline" class="mx-1" />
        </button>
      </div>
      <div>
        <button class="icon"><icon name="email-outline" class="mx-1" /></button>
      </div>
      <div>
        <button class="icon"><icon name="phone-outline" class="mx-1" /></button>
      </div>
    </div>
    <!-- Content -->
    <empty-content
      content="Keine Beschreibung vorhanden."
      route="/"
      class="mt-5"
    />
    {{ shop }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import emptyContent from '~/components/elements/EmptyContent'
export default {
  name: 'Shop',
  components: {
    emptyContent,
  },
  computed: {
    ...mapGetters({
      shop: 'shop/shop',
    }),
  },
}
</script>

<style lang="scss" scoped>
.hero {
  &-wrap {
    @apply flex flex-col justify-between rounded-lg text-white;
    @apply bg-cover bg-center bg-primary;
  }
  &-info {
    background-image: linear-gradient(
      rgba(255, 255, 255, 0),
      theme('colors.primary')
    );
  }
}
</style>
0,0,
