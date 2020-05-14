<template>
  <div>
    <h3 class="my-3">{{ count }} Shops</h3>
    <div
      v-for="shop in shops"
      :key="shop.shopId"
      class="animated bg-white p-4 shadow rounded-lg hover:shadow-lg mt-3 cursor-pointer"
      :class="[
        { 'spinner-dark': pending == shop.shopId },
        user.activeShop === shop._id ? 'border-l-4 border-success' : '',
      ]"
      @click="$emit('changeShop', shop)"
    >
      <div>
        <div class="flex items-start">
          <div class="flex flex-col w-full">
            <h3 class="leading-none">{{ shop.name }}</h3>
            <div class="text-light">{{ shop.address.county }}</div>
            <hr class="mt-2 mb-1" />
            <div class="text-light flex flex-wrap text-xs">
              <div class="mr-2">
                Created:
                <client-only>
                  <timeago
                    v-if="shop.createdAt"
                    :datetime="shop.createdAt"
                    :locale="$t('lang_code')"
                    class="text-light"
                /></client-only>
              </div>
              <div>
                Updated:
                <client-only>
                  <timeago
                    v-if="shop.createdAt"
                    :datetime="shop.createdAt"
                    :locale="$t('lang_code')"
                    class="text-light"
                /></client-only>
              </div>
            </div>
          </div>

          <span
            class="rounded-lg py-1 px-2 text-white text-xs ml-auto"
            :class="[shop.published ? 'bg-success' : 'bg-warning']"
            >{{ shop.published ? 'Online' : 'Offline' }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    shops: {
      type: Array,
      default: () => [],
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    user: {
      type: Object,
      default: () => ({}),
      required: true,
    },
    pending: {
      type: String,
      default: '',
    },
  },
}
</script>
