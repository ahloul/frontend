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
    >
      <div class="flex">
        <div v-show="showMore === shop._id" class="flex flex-col">
          <button
            class="select-none"
            @contextmenu="handler($event)"
            @mousedown="startDelete(shop)"
            @mouseleave="stopDelete"
            @mouseup="stopDelete"
            @touchstart="startDelete(shop)"
            @touchend="stopDelete"
            @touchcancel="stopDelete"
          >
            <div class="mt-1"><icon name="trash-outline" /></div>

            <svg class="progress-ring absolute" width="30" height="30">
              <circle
                class="progress-ring__circle"
                stroke="currentColor"
                :stroke-dasharray="`${circumference} ${circumference}`"
                :stroke-dashoffset="`${
                  circumference - (!!interval ? 1 : 0 / 100) * circumference
                }`"
                stroke-width="2"
                fill="transparent"
                r="12"
                cx="17"
                cy="15"
              />
              a
            </svg>
          </button>
        </div>
        <div
          :class="{ showMore: showMore === shop._id }"
          class="w-full"
          @click="activateShop(shop)"
        >
          <div class="flex items-start w-full">
            <div class="flex flex-col w-full">
              <h3 class="leading-none break-all">{{ shop.name }}</h3>
              <div class="text-light">{{ shop.address.county }}</div>
              <div v-if="shop.author" class="flex items-center mt-1">
                <div class="w-5 mr-2">
                  <img
                    class="rounded-full"
                    :src="shop.author.picture.url"
                    @error="(e) => (e.target.src = '/img/placeholder.png')"
                  />
                </div>
                {{ shop.author.name }}
              </div>
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
  data: () => ({
    showMore: null,
    interval: false,
    countAction: 2,
    circumference: 12 * 2 * Math.PI,
  }),
  methods: {
    handler(e) {
      // prevent right click on button
      e.preventDefault()
    },
    activateShop(shop) {
      if (this.user.activeShop === shop._id) {
        this.showMore = this.showMore === shop._id ? null : shop._id
        return
      }
      this.showMore = null
      this.$emit('changeShop', shop)
    },
    async deleteShop(shop, state) {
      if (!state) return
      try {
        await this.$axios.$delete(`/api/shops/${shop.id}`)
        this.$emit('reload')
        this.$store.dispatch('toast/add', { text: `Shop deleted!` })
      } catch (error) {
        this.$store.dispatch('toast/add', { message: `toast.something_wrong` })
        console.log(error)
      }
    },
    startDelete(shop) {
      if (!this.interval) {
        const self = this
        this.interval = setInterval(() => {
          console.log(this.countAction)
          if (this.countAction) {
            return this.countAction--
          }
          self.deleteShop(shop, true)
          self.stopDelete()
        }, 500)
      }
    },
    stopDelete() {
      clearInterval(this.interval)
      this.countAction = 2
      this.interval = false
    },
  },
}
</script>
<style lang="scss">
.showMore {
  @apply opacity-50 transition duration-150;
  transform: translateX(1rem);
}

.progress-ring {
}

.progress-ring__circle {
  transition: 2s stroke-dashoffset;
  // axis compensation
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
</style>
