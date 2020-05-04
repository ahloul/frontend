<template>
  <div class="flex flex-col">
    <modal
      :show="showModal"
      centered
      dismiss="Schließen"
      @dismiss="showModal = false"
      >{{ $t('contact_to_delete') }} <br />
      <a href="mailto:support@getit.social">Support</a>
    </modal>
    <!-- Top Buttons -->
    <div class="flex mt-2 justify-between max-w-xs mx-auto">
      <button
        :class="{ secondary: step == 1 }"
        class="tooltip"
        @click="step = 1"
      >
        <icon :name="step == 1 ? 'info' : 'info-outline'" />
        <div class="tooltip-content" :class="{ active: step == 1 }">
          {{ $t('information.section_name') }}
        </div>
      </button>
      <button
        :class="{ secondary: step == 2 }"
        class="tooltip"
        @click="step = 2"
      >
        <icon :name="step == 2 ? 'pin' : 'pin-outline'" />
        <div class="tooltip-content" :class="{ active: step == 2 }">
          {{ $t('contact_data.section_name') }}
        </div>
      </button>
      <button
        :class="{ secondary: step == 3 }"
        class="tooltip"
        @click="step = 3"
      >
        <icon :name="step == 3 ? 'car' : 'car-outline'" />
        <div class="tooltip-content" :class="{ active: step == 3 }">
          {{ $t('delivery_options.section_name') }}
        </div>
      </button>
      <button
        :class="{ secondary: step == 4 }"
        class="tooltip"
        @click="step = 4"
      >
        <icon :name="step == 4 ? 'camera' : 'camera-outline'" />
        <div class="tooltip-content" :class="{ active: step == 4 }">
          {{ $t('picture.section_name') }}
        </div>
      </button>
      <button
        :class="{ secondary: step == 5 }"
        class="tooltip"
        @click="step = 5"
      >
        <icon :name="step == 5 ? 'edit' : 'edit-outline'" />
        <div class="tooltip-content" :class="{ active: step == 5 }">
          {{ $t('description.section_name') }}
        </div>
      </button>
    </div>
    <!-- Forms -->
    <ValidationObserver ref="shop" v-slot="{ handleSubmit }" class="mt-10" slim>
      <form @submit.prevent="handleSubmit(updateShop)">
        <!-- Informationen -->
        <fieldset v-if="step === 1" class="tab-section">
          <!-- shopName INPUT -->
          <label class="block">
            <ValidationProvider
              v-slot="{ errors }"
              vid="shopName"
              :rules="{
                required: true,
                max: 20,
                shopname: { name: shop.name, check: checkName },
              }"
              :mode="validationMode"
            >
              <span>{{ $t('information.name_of_shop') }}</span>
              <input
                v-model="shop.name"
                name="Shopname"
                type="text"
                class="form-input"
                :placeholder="$t('information.name_of_shop_example')"
              />
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </label>

          <!-- companyType SELECT -->
          <label class="block" for="companyType">
            <span>{{ $t('information.legal_form') }}</span>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Rechtsform"
              :mode="validationMode"
            >
              <select
                id="companyType"
                v-model="shop.companyType"
                class="form-select"
              >
                <option value="SS">
                  {{ $t('information.legal_form_options.independent') }}
                </option>
                <option value="EU">
                  {{ $t('information.legal_form_options.sole') }}
                </option>
                <option value="PG">
                  {{ $t('information.legal_form_options.partnership') }}
                </option>
                <option value="GN">
                  {{ $t('information.legal_form_options.non_profit') }}
                </option>
                <option value="GP">
                  {{ $t('information.legal_form_options.private_partnership') }}
                </option>
                <option value="AG">
                  {{ $t('information.legal_form_options.stock_company') }}
                </option>
              </select>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </label>

          <!-- companySize SELECT -->
          <label class="block" for="companySize">
            <span>{{ $t('information.no_of_employees') }}</span>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Mitarbeiterzahl"
              :mode="validationMode"
            >
              <select id="companySize" v-model="shop.size" class="form-select">
                <option value="1">1-5</option>
                <option value="5">5-20</option>
                <option value="20">20-200</option>
                <option value="200">200-1000</option>
              </select>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </label>
        </fieldset>
        <!-- Kontaktdaten -->
        <fieldset v-else-if="step === 2" class="tab-section">
          <!-- userLocation INPUT -->
          <label class="block">
            <span>{{ $t('contact_data.full_address') }}</span>
            <autocomplete
              name="Strasse"
              :value="companyLocation"
              endpoint="maps/geocode"
              queryname="query"
              display-name="label"
              placeholder="Sesamstrasse 12"
              :rules="{
                required: true,
                address: { address: shop.address },
              }"
              @selection="selectLocation"
            />
            <div
              v-if="shop.address.locationId"
              class="flex flex-col bg-white text-info rounded-lg border p-3 mt-3"
            >
              <div class="font-bold">{{ shop.name }}</div>
              <div class="leading-tight text-light">
                {{ shop.address.street }} {{ shop.address.houseNumber }}
              </div>
              <div class="leading-tight text-light">
                {{ shop.address.postalCode }} {{ shop.address.city }}
                {{
                  shop.address.district === shop.address.city
                    ? ''
                    : shop.address.district
                }}
              </div>
            </div>
          </label>

          <!-- phone INPUT -->
          <label class="block" for="companyPhone">
            <span>{{ $t('contact_data.phone_number') }}</span>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Telefon"
              :mode="validationMode"
            >
              <input
                id="companyPhone"
                v-model="shop.contact.phone"
                type="text"
                class="form-input mt-1 block w-full"
                placeholder="Vorwahl und Nummer"
              />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </label>

          <div class="relative my-4">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t"></div>
            </div>
            <div class="relative flex justify-center text-sm leading-5">
              <span class="px-2 bg-grey text-light">
                {{ $t('contact_data.optional') }}
              </span>
            </div>
          </div>

          <!-- Website INPUT -->
          <label class="block" for="companyWebsite">
            <span>
              {{ $t('contact_data.website') }}
            </span>
            <ValidationProvider
              v-slot="{ errors }"
              rules="max:200|validUrl"
              name="Webseite"
            >
              <input
                id="companyWebsite"
                v-model="shop.contact.website"
                type="text"
                class="form-input mt-1 block w-full"
                placeholder="https://"
              />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </label>

          <!-- Facebook INPUT -->
          <label class="block" for="companyFacebook">
            <span>
              {{ $t('contact_data.facebook') }}
            </span>
            <ValidationProvider
              v-slot="{ errors }"
              rules="max:200|validUrl"
              name="Facebook"
            >
              <input
                id="companyFacebook"
                v-model="shop.contact.facebook"
                type="text"
                class="form-input mt-1 block w-full"
                placeholder="https://"
              />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </label>

          <!-- Instagram INPUT -->
          <label class="block" for="companyInstagram">
            <span>
              {{ $t('contact_data.instagram') }}
            </span>
            <ValidationProvider
              v-slot="{ errors }"
              rules="max:200|validUrl"
              name="Facebook"
            >
              <input
                id="companyFacebook"
                v-model="shop.contact.instagram"
                type="text"
                class="form-input mt-1 block w-full"
                placeholder="https://"
              />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </label>
        </fieldset>
        <!-- Dispatch Informations -->
        <fieldset v-else-if="step === 3" class="tab-section">
          <!-- CHECKBOX published -->
          <div v-for="(deliveryOption, index) in deliverySelect" :key="index">
            <label
              class="flex animated inline-block my-2 bg-white w-full p-3 shadow hover:shadow-lg rounded-lg cursor-pointer"
            >
              <input
                v-model="shop.deliveryOptions"
                type="checkbox"
                class="form-checkbox mt-2"
                :value="deliveryOption.value"
              />
              <span class="ml-2">
                {{ $t('delivery_options.offer_prefix') }}
                <b>{{ $t(deliveryOption.name) }}</b>
                {{ $t('delivery_options.offer_suffix') }}.
                {{ $t(deliveryOption.description) }}.
              </span>
            </label>
          </div>
          <div class="mt-5">
            <div class="flex justify-center text-sm leading-5 select-none">
              <span class="px-2 bg-grey text-light">
                {{ $t('delivery_options.opening_times') }}
              </span>
            </div>
          </div>
          <!-- Opening Hour Component -->
          <div v-if="shop.openingHours">
            <div
              v-for="(openingDay, dayIndex) in shop.openingHours"
              :key="dayIndex"
            >
              <div class="flex flex-col select-none my-3">
                <div class="flex flex-wrap content-center">
                  <span class="my-auto font-bold text-primary">{{
                    $t(`delivery_options.days_long.${dayIndex}`)
                  }}</span>
                  <button
                    class="ml-auto"
                    type="button"
                    @click="addOpeningTime(dayIndex)"
                  >
                    <icon name="plus" />
                  </button>
                </div>
                <label class="flex items-center my-auto">
                  <input
                    type="checkbox"
                    class="form-checkbox"
                    @change="allDayOpen(dayIndex, $event)"
                  />
                  <span class="ml-2 text-sm">{{
                    $t('delivery_options.all_day')
                  }}</span>
                </label>
                <div v-for="(day, index) in openingDay" :key="index">
                  <div class="flex items-center my-1">
                    <div>
                      <vue-timepicker
                        v-model="day.open"
                        input-width="100%"
                        input-class="form-input"
                        hide-clear-button
                        :disabled="day.allDayOpen"
                      />
                    </div>
                    <div class="mx-1">-</div>
                    <div>
                      <vue-timepicker
                        v-model="day.close"
                        input-width="100%"
                        input-class="form-input"
                        hide-clear-button
                        :disabled="day.allDayOpen"
                      />
                    </div>
                    <button
                      v-if="!day.allDayOpen"
                      type="button"
                      class=""
                      @click="removeOpeningTime(dayIndex, index)"
                    >
                      <icon name="trash-2-outline" />
                    </button>
                  </div>
                </div>

                <hr class="w-full mt-2" />
              </div>
            </div>
          </div>
        </fieldset>
        <!-- Bilder -->
        <fieldset v-else-if="step === 4" class="tab-section">
          <div class="mt-5 flex justify-center">
            <image-upload
              folder="logo"
              placeholder="Logo"
              :image="shop.logo"
              @target="selectLogo"
            />
          </div>
          <div class="mt-5 flex justify-center">
            <image-upload
              folder="shop"
              placeholder="Shopbild"
              :image="shop.picture"
              @target="selectPicture"
            />
          </div>
        </fieldset>

        <!-- Beschreibung -->
        <fieldset v-else-if="step === 5" class="tab-section">
          <!-- TEXTAREA Description -->
          <label class="block">
            <ValidationProvider v-slot="{ errors }" name="Benutzertext">
              <wysiwyg
                :initial-content="shop.description"
                @content="(data) => (shop.description = data)"
              />
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
          </label>
          <!-- Back BUTTON -->
        </fieldset>

        <div class="flex justify-between max-w-md mx-auto">
          <button
            type="submit"
            class="primary my-10 ml-auto"
            :class="{ 'spinner-light': loadState.create }"
          >
            {{ $t('save') }}
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'
import { mapActions, mapMutations } from 'vuex'
import { clone, filter } from 'lodash'
import imageUpload from '~/components/utils/ImageUpload'
import Wysiwyg from '~/components/utils/Wysiwyg'
import Autocomplete from '~/components/elements/Autocomplete'
import { difference } from '~/utils/object'

export default {
  name: 'EditShop',
  components: {
    Autocomplete,
    imageUpload,
    Wysiwyg,
    VueTimepicker,
  },
  async asyncData({ $axios, store, query }) {
    const { user } = store.state
    const coreShop = await $axios.$get(`/api/users/${user._id}/shops/active`)
    return { shop: clone(coreShop), coreShop }
  },
  data: () => ({
    step: 1,
    validationMode: 'lazy',
    showModal: false,
    deliverySelect: [
      {
        name: 'delivery_options.options.local_delivery.name',
        value: 'LD',
        description: 'delivery_options.options.local_delivery.description',
      },
      {
        name: 'delivery_options.options.parcel.name',
        value: 'MU',
        description: 'delivery_options.options.parcel.description',
      },
      {
        name: 'delivery_options.options.pickup.name',
        value: 'PU',
        description: 'delivery_options.options.pickup.description',
      },
    ],
    loadState: {
      pending: false,
    },
  }),
  computed: {
    companyLocation(e) {
      // if (!this.myUser.location) return
      return this.shop.address?.label
    },
  },
  methods: {
    ...mapActions(['getMe']),
    ...mapMutations('modal', {
      showErrorModal: 'showModal',
    }),
    async checkValidation() {
      // Check if name is valid on submit
      const isValid = await this.checkName()
      // Check if other forms are valid
      const validate = await this.$refs.shop.validate()
      if (!isValid || !validate) throw new Error('Invalid')
      this.$nextTick(() => {
        this.$refs.shop.reset()
      })
    },
    async changeStep(stepNumber) {
      try {
        await this.checkValidation()
        this.step = stepNumber
      } catch (error) {}
    },
    async updateShop() {
      try {
        await this.checkValidation()
        this.loadState.update = true
        await this.$axios.patch(
          `/api/shops/${this.shop._id}`,
          difference(this.shop, this.coreShop, 'openingHours')
        )
        // Update user in storage
        await this.getMe()
        // Todo: Get shop
        this.loadState.update = false
        this.$store.dispatch('toast/add', { message: `toast.updated_shop` })
        this.$router.push('/shop')
      } catch (error) {
        this.loadState.update = false
        this.showErrorModal({ message: 'information.shop_error_confirmation' })
        console.log(error)
      }
    },
    async checkName() {
      try {
        await this.$axios.$post(`/api/shops/checkName`, {
          name: this.shop.name,
        })
        return true
      } catch ({ response: { data } }) {
        this.$refs.shop.setErrors({ shopName: ['Shopname existiert bereits'] })
      }
    },
    selectPicture(target) {
      this.shop.picture = target
    },
    selectLogo(target) {
      this.shop.logo = target
    },
    selectLocation({ address, locationId, label }) {
      this.shop.address = { ...address, label, locationId }
    },
    addOpeningTime(day) {
      const selectedDay = filter(
        this.shop.openingHours[day],
        (o) => o.allDayOpen
      )
      if (selectedDay.length) return
      this.shop.openingHours[day].push({
        open: '08:00',
        close: '20:00',
        allDayOpen: false,
      })
    },
    allDayOpen(day, event) {
      const selectedDay = filter(
        this.shop.openingHours[day],
        (o) => o.allDayOpen
      )
      if (!selectedDay.length) {
        this.shop.openingHours[day] = []
        this.shop.openingHours[day].push({
          open: '00:00',
          close: '00:00',
          allDayOpen: true,
        })
      } else {
        this.shop.openingHours[day] = []
      }
    },
    removeOpeningTime(day, index) {
      this.shop.openingHours[day].splice(index, 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.tab {
  &-heading {
    @apply text-center font-bold text-secondary;
  }
  &-section {
    @apply w-full max-w-md mt-10 mx-auto text-light;
  }
}
.tooltip {
  @apply relative z-10;
  &-content {
    @apply absolute p-3;
    @apply transition duration-150 ease-in-out;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
  }
  .active {
    opacity: 1;
  }
  /*
  &:hover .tooltip-content,
  .active {
    opacity: 1;
  }
  */
}
</style>
