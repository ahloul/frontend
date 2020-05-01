<template>
  <div class="max-w-2xl mt-3">
    <!-- CTA -->
    <div
      class="hero-wrap h-48 md:h-64"
      :style="{
        backgroundImage: `url('${shop.picture.url}')`,
      }"
    >
      <div class="flex justify-end">
        <div class="">
          <button
            class="button icon-r my-3"
            @click="$router.push('/shop/edit')"
          >
            <icon name="settings-outline" class="mx-1" fill="white" />
          </button>
        </div>
      </div>
      <div class="flex mt-auto hero-info rounded-b-lg">
        <div class="p-2 m-2 bg-white rounded shadow-sm">
          <img :src="shop.logo.url" alt="" width="100" />
        </div>
        <div class="mt-auto mb-4 flex flex-col">
          <div>
            <h3>{{ shop.name }}</h3>
          </div>
          <div v-if="shop.address" class="leading-none">
            {{ shop.address.city }}
          </div>
        </div>
      </div>
    </div>

    <div class="flex mt-3">
      <div class="w-full">
        <a :href="`tel:${shop.contact.phone}`" class="button primary icon-r"
          ><icon name="phone" /> {{ $t('call') }}</a
        >
      </div>
      <div>
        <button class="icon" @click="openTab = 1">
          <icon
            :name="openTab === 1 ? 'info' : 'info-outline'"
            class="mx-1"
            :height="iconSize"
            :width="iconSize"
          />
        </button>
      </div>
      <div>
        <button class="icon" @click="openTab = 2">
          <icon
            :name="openTab === 2 ? 'pin' : 'pin-outline'"
            class="mx-1"
            :height="iconSize"
            :width="iconSize"
          />
        </button>
      </div>
    </div>
    <div class="mt-2">
      <div v-if="openTab === 1">
        <div v-if="shop.deliveryOptions" class="flex flex-wrap justify-start">
          <div
            v-for="(deliveryOption, index) in shop.deliveryOptions"
            :key="index"
          >
            <span v-if="deliveryOption === 'LD'" class="tag m-1">
              Lokale Lieferung
            </span>
            <span v-if="deliveryOption === 'PU'" class="tag m-1">
              Abholung
            </span>
            <span v-if="deliveryOption === 'LD'" class="tag m-1">
              Postversand
            </span>
          </div>
        </div>
        <!-- Content -->
        <empty-content
          v-if="!shop.description"
          :content="$t('no_description')"
          route="/shop/edit"
          class="mt-5"
        />
        <div v-else v-html="shop.description"></div>
        <hr class="my-5" />
        <div v-if="shop.contact" class="flex flex-col text-right">
          <div class="leading-tight">
            <a
              v-if="shop.contact.website"
              :href="shop.contact.website"
              target="_blank"
            >
              {{ $t('enter_website') }}
            </a>
          </div>
        </div>
      </div>
      <div v-else-if="openTab === 2">
        <!-- Map -->
        <div class="grid grid-cols-3 gap-3">
          <div v-if="shop.address.locationId" class="flex flex-col">
            <div class="leading-tight">
              {{ shop.address.street }} {{ shop.address.houseNumber }}
            </div>
            <div class="leading-tight">
              {{ shop.address.postalCode }} {{ shop.address.city }}
              {{
                shop.address.district === shop.address.city
                  ? ''
                  : shop.address.district
              }}
            </div>
          </div>
        </div>
        <hr class="my-4" />
        <here-map
          :position="shop.displayPosition"
          :polygon="shop.polygonCoordinates"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EmptyContent from '~/components/elements/EmptyContent'
import HereMap from '~/components/elements/Map'
export default {
  name: 'Shop',
  components: {
    EmptyContent,
    HereMap,
  },
  data: () => ({
    iconSize: 22,
    openTab: 1,
  }),
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
