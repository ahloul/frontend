<template>
  <div class="container max-w-4xl mt-3">
    <!-- CTA -->
    <div class="flex flex-col">
      <div class="flex">
        <div class="ml-auto text-primary">
          <button class="link icon-r" @click="$router.push('/shop/edit')">
            {{ $t('shop.settings') }}
            <icon name="settings-outline" class="mx-1" />
          </button>
        </div>
      </div>
    </div>

    <div
      class="hero-wrap h-48 my-3"
      :style="{
        backgroundImage: `url('${shop.picture.url}')`,
      }"
    ></div>
    <div class="flex items-end -mt-10 md:ml-10">
      <div class="p-2 bg-white rounded shadow-sm">
        <img
          :src="shop.logo.url"
          alt=""
          width="100"
          @error="(e) => (e.target.src = '/img/placeholder.png')"
        />
      </div>
      <div class="ml-2 select-none">
        <span class="leading-snug text-2xl">{{ shop.name }}</span>
        <div v-if="shop.address" class="leading-none text-light">
          {{ shop.address.city }}
        </div>
      </div>
    </div>

    <div class="flex mt-3 md:ml-10 justify-end">
      <div class="flex flex-col mr-auto">
        <div class="w-full">
          <a
            :href="`tel:${shop.contact.phone}`"
            class="button cta bg-tertiary icon-r"
            ><icon name="phone" /> {{ $t('call') }}</a
          >
        </div>
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
        <button class="icon pr-0" @click="openTab = 2">
          <icon
            :name="openTab === 2 ? 'pin' : 'pin-outline'"
            class="mx-1"
            :height="iconSize"
            :width="iconSize"
          />
        </button>
      </div>
    </div>
    <div class="mt-3 select-none">
      <div class="col-span-1"><!-- Todo: Opening Times here --></div>
      <div v-if="openTab === 1" class="card col-span-4">
        <div v-if="shop.deliveryOptions" class="flex flex-wrap justify-start">
          <div
            v-for="(deliveryOption, index) in shop.deliveryOptions"
            :key="index"
            class="mt-2"
          >
            <span v-if="deliveryOption === 'LD'" class="tag mr-1">
              {{ $t('delivery_options.options.local_delivery.name') }}
            </span>
            <span v-if="deliveryOption === 'PU'" class="tag mr-1">
              {{ $t('delivery_options.options.parcel.name') }}
            </span>
            <span v-if="deliveryOption === 'MU'" class="tag mr-1">
              {{ $t('delivery_options.options.parcel.name') }}
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
        <div v-else>
          <hr class="my-5" />
          <div v-html="shop.description"></div>
        </div>
        <div v-if="shop.contact" class="flex justify-end">
          <ul class="flex items-center">
            <li class="mx-2">
              <a
                v-if="shop.contact.instagram"
                :href="shop.contact.instagram"
                target="_blank"
              >
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  />
                </svg>
              </a>
            </li>
            <li class="mx-2">
              <a
                v-if="shop.contact.facebook"
                :href="shop.contact.facebook"
                target="_blank"
              >
                <icon name="facebook-outline" />
              </a>
            </li>
            <li class="mx-2">
              <a
                v-if="shop.contact.website"
                :href="shop.contact.website"
                target="_blank"
              >
                {{ $t('enter_website') }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div v-else-if="openTab === 2">
        <div class="grid md:grid-cols-3 gap-2">
          <div class="card md:col-span-2">
            <div class="flex flex-col">
              <div
                v-if="shop.address.locationId"
                class="text-sm text-light flex flex-col mb-2"
              >
                <div class="leading-tight">
                  {{ shop.address.street }} {{ shop.address.houseNumber }}
                </div>
                <div class="leading-tight">
                  {{ shop.address.postalCode }} {{ shop.address.city }}
                  {{
                    shop.address.district === shop.address.city
                      ? $t('empty')
                      : shop.address.district
                  }}
                </div>
              </div>
              <!-- Map -->
              <here-map
                :position="shop.displayPosition"
                :polygon="shop.polygonCoordinates"
              />
            </div>
          </div>
          <div class="card text-center md:text-left select-none">
            <div
              v-for="(weekDay, name) in shop.openingHours"
              :key="name"
              class="my-2"
            >
              <span class="font-bold text-primary"
                >{{ $t(`delivery_options.days_long.${name}`) }}
              </span>
              <div class="text-light">
                {{ weekDay.length ? $t('empty') : $t('shop.closed') }}
                <div v-for="(time, index) in weekDay" :key="index">
                  <span v-if="time.allDayOpen">{{
                    $t('shop.open_all_day')
                  }}</span>
                  <span v-else>{{ time.open }} - {{ time.close }}</span>
                </div>
              </div>
            </div>
          </div>
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
  middleware: 'authenticated',
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

    @screen md {
      height: 23rem;
    }
  }
  &-info {
    background-image: linear-gradient(
      rgba(255, 255, 255, 0),
      theme('colors.primary')
    );
  }
}
</style>
