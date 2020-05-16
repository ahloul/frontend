<template>
  <div class="container max-w-4xl mt-0 px-2 mb-5 mb-12">
    <div class="my-3 flex justify-end">
      <n-link
        class="primary icon-l inline-block flex items-center"
        to="/shop/edit"
      >
        <icon name="settings-outline" class="mr-1" /> {{ $t('shop.settings') }}
      </n-link>
    </div>
    <div
      class="hero-wrap h-48 my-3"
      :style="{
        backgroundImage: `url('${shop.picture.url}')`,
      }"
    ></div>
    <div class="flex items-center md:ml-10 mb-2">
      <div class="p-2 bg-white rounded shadow-sm">
        <img
          :src="shop.logo.url"
          alt=""
          class="object-center w-24"
          @error="(e) => (e.target.src = '/img/placeholder.png')"
        />
      </div>
      <div class="ml-2 select-none truncate">
        <h3>{{ shop.name }}</h3>
        <div v-if="shop.address" class="text-light">
          {{ shop.address.city }}
        </div>
        <div class="hidden md:block mt-2">
          <a :href="`tel:${shop.contact.phone}`">{{ shop.contact.phone }}</a>
        </div>
      </div>
    </div>
    <div class="flex md:ml-10 justify-end">
      <div class="flex items-center mr-auto">
        <div class="md:hidden inline-block w-full">
          <a
            :href="`tel:${shop.contact.phone}`"
            class="button cta bg-tertiary icon-r"
            ><icon name="phone" /> {{ $t('action.call') }}</a
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
    <div class="mt-2 select-none">
      <div class="col-span-1"><!-- Todo: Opening Times here --></div>
      <div v-if="openTab === 1" class="card col-span-4">
        <div v-if="shop.deliveryOptions" class="flex flex-wrap justify-start">
          <div
            v-for="(deliveryOption, index) in shop.deliveryOptions"
            :key="index"
            class="mt-2"
          >
            <span v-if="deliveryOption === 'LD'" class="tag mr-1">
              Lokale Lieferung
            </span>
            <span v-if="deliveryOption === 'PU'" class="tag mr-1">
              Abholung
            </span>
            <span v-if="deliveryOption === 'MU'" class="tag mr-1">
              Postversand
            </span>
          </div>
        </div>
        <!-- Description -->
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
      </div>
      <div v-else-if="openTab === 2">
        <div class="grid md:grid-cols-3 gap-2">
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
                {{ weekDay.length ? '' : 'Geschlossen' }}
                <div v-for="(time, index) in weekDay" :key="index">
                  <span v-if="time.allDayOpen">Ganztätig geöffnet</span>
                  <span v-else>{{ time.open }} - {{ time.close }}</span>
                </div>
              </div>
            </div>
          </div>

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
                      ? ''
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
