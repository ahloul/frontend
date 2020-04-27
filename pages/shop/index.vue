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

    <div class="flex justify-between sm:justify-end">
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
      <div>
        <button class="icon" @click="openTab = 3">
          <icon
            :name="openTab === 3 ? 'clock' : 'clock-outline'"
            class="mx-1"
            :height="iconSize"
            :width="iconSize"
          />
        </button>
      </div>
      <div>
        <button class="icon" @click="openTab = 4">
          <icon
            :name="openTab === 4 ? 'phone' : 'phone-outline'"
            class="mx-1"
            :height="iconSize"
            :width="iconSize"
          />
        </button>
      </div>
    </div>
    <div class="mt-5">
      <div v-if="openTab === 1">
        <!-- Content -->
        <empty-content
          v-if="!shop.description"
          content="Keine Beschreibung vorhanden."
          route="/shop/edit"
          class="mt-5"
        />
        <div v-else v-html="shop.description"></div>
      </div>
      <div v-else-if="openTab === 2">
        <!-- Map -->
        <here-map
          :position="shop.displayPosition"
          :polygon="shop.polygonCoordinates"
        />
      </div>
      <div v-else-if="openTab === 3">
        <!-- Clock -->
        <p class="text-center">Keine Öffnungszeiten angegeben.</p>
      </div>
      <div v-else-if="openTab === 4">
        <!-- Contact -->
        <div class="flex flex-col">
          <span class="inline-flex text-primary font-bold">
            <icon
              name="phone-outline"
              class="mx-3"
              :height="iconSize"
              :width="iconSize"
            />
            <a :href="'tel:' + shop.contact.phone">{{
              shop.contact.phone
            }}</a></span
          >
          <span class="inline-flex text-primary font-bold mt-3">
            <icon
              name="globe"
              class="mx-3"
              :height="iconSize"
              :width="iconSize"
            />
            <a :href="shop.contact.website" target="_blank">{{
              shop.contact.website
            }}</a></span
          >
        </div>
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
