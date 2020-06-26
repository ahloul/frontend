<template>
  <div class="flex flex-col">
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

    <!--TODO skip when validation error-->
    <div class="mt-10">
      <FormulateForm @submit="submit" @submit-raw="submitRaw">
        <div v-show="step === 1">
          <p v-if="!edit" class="tab-heading">
            {{ $t('information.intro') }}
          </p>
          <FormulateInput
            v-model="shop.name"
            name="name"
            type="text"
            :label="$t('information.name_of_shop')"
            validation="bail|required|max:40,length|shopname"
            :placeholder="$t('information.name_of_shop_example')"
          />
          <FormulateInput
            v-model="shop.companyType"
            name="companyType"
            :options="{
              SS: $t('information.legal_form_options.independent'),
              EU: $t('information.legal_form_options.sole'),
              PG: $t('information.legal_form_options.partnership'),
              GN: $t('information.legal_form_options.non_profit'),
              GP: $t('information.legal_form_options.private_partnership'),
              AG: $t('information.legal_form_options.stock_company'),
            }"
            type="select"
            :label="$t('information.legal_form')"
            validation="bail|required"
          />
          <FormulateInput
            v-model="shop.size"
            name="size"
            :options="{ 1: '1-5', 5: '5-20', 20: '20-200', 200: '200-1000' }"
            type="select"
            :label="$t('information.no_of_employees')"
            validation="bail|required"
          />
        </div>

        <div v-show="step === 2">
          <p v-if="!edit" class="tab-heading">
            {{ $t('contact_data.intro') }}
          </p>
          <FormulateInput
            v-model="shop.address"
            type="autocomplete"
            name="address"
            endpoint="maps/geocode"
            queryname="query"
            dname="label"
            :label="$t('contact_data.full_address')"
            placeholder="Sesamstrasse 12"
            validation="bail|required|address"
          />
          <div
            v-if="shop.address.locationId"
            class="flex flex-col bg-white text-primary rounded-lg border p-3 mt-3"
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

          <FormulateInput
            v-model="shop.contact.phone"
            name="phone"
            type="text"
            :label="$t('contact_data.phone_number')"
            validation="bail|required"
            :placeholder="$t('contact_data.prefix_and_number')"
          />

          <!--optional text-->
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

          <FormulateInput
            v-model="shop.contact.website"
            name="website"
            type="text"
            :label="$t('contact_data.website')"
            validation="bail|max:200"
            placeholder="https://"
          />

          <FormulateInput
            v-model="shop.contact.facebook"
            name="facebook"
            type="text"
            :label="$t('contact_data.facebook')"
            placeholder="https://"
          />

          <FormulateInput
            v-model="shop.contact.instagram"
            name="instagram"
            type="text"
            :label="$t('contact_data.instagram')"
            placeholder="https://"
          />
        </div>

        <div v-show="step === 3">
          <FormulateInput
            v-model="shop.deliveryOptions"
            :options="{
              LD: `${$t('delivery_options.offer_prefix')} ${$t(
                'delivery_options.options.local_delivery.name'
              )} ${$t('delivery_options.offer_suffix')}. ${$t(
                'delivery_options.options.local_delivery.description'
              )}.`,
              MU: `${$t('delivery_options.offer_prefix')} ${$t(
                'delivery_options.options.parcel.name'
              )} ${$t('delivery_options.offer_suffix')}. ${$t(
                'delivery_options.options.parcel.description'
              )}.`,
              PU: `${$t('delivery_options.offer_prefix')} ${$t(
                'delivery_options.options.pickup.name'
              )} ${$t('delivery_options.offer_suffix')}. ${$t(
                'delivery_options.options.pickup.description'
              )}.`,
            }"
            type="checkbox"
          />

          <div class="mt-5">
            <div class="flex justify-center text-sm leading-5 select-none">
              <span class="px-2 bg-grey text-light">
                {{ $t('delivery_options.opening_times') }}
              </span>
            </div>
          </div>

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

              <div v-for="(day, index) in openingDay" :key="index">
                <label v-if="index === 0" class="flex items-center my-auto">
                  <input
                    v-model="day.allDayOpen"
                    type="checkbox"
                    class="form-checkbox"
                    @change="changeAllDayOpen(dayIndex, $event)"
                  />
                  <span class="ml-2 text-sm">{{
                    $t('delivery_options.all_day')
                  }}</span>
                </label>
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

        <div v-show="step === 4">
          <p class="tab-heading">{{ $t('picture.intro') }}</p>
          <FormulateInput
            type="image"
            upload-behavior="delayed"
            validation="mime:image/jpeg,image/png,image/jpg"
            :value="[{ url: shop.logo.url }]"
            label="Logo"
            name="logo_img"
            :uploader="uploadLogo"
          />

          <FormulateInput
            type="image"
            upload-behavior="delayed"
            validation="mime:image/jpeg,image/png,image/jpg"
            :value="[{ url: shop.picture.url }]"
            name="shop_img"
            label="Shop"
            :uploader="uploadShopImg"
          />
        </div>

        <div v-show="step === 5">
          <p class="tab-heading">
            {{ $t('description.intro') }}
          </p>

          <FormulateInput
            v-model="shop.description"
            type="wysiwyg"
            name="description"
          />
        </div>

        <FormulateInput
          v-if="step !== 1 && !edit"
          type="button"
          @click="step--"
        >
          {{ $t('back') }}
        </FormulateInput>

        <FormulateInput
          class="mt-5"
          type="submit"
          :label="$t(submitButtonText)"
          :class="{ 'spinner-dark': loadState.create || loadState.update }"
        />
      </FormulateForm>
    </div>
  </div>
</template>

<script>
// import VueTimepicker from 'vue2-timepicker'
import { mapMutations, mapActions } from 'vuex'
import { clone, filter } from 'lodash'
import { difference } from '~/utils/object'

export default {
  name: 'EditShopComponent',
  components: {
    // VueTimepicker,
  },
  props: {
    coreShop: {
      type: Object,
      default: () => ({
        published: true,
        name: null,
        size: null,
        phone: null,
        website: null,
        companyType: null,
        address: {},
        picture: {},
        contact: {},
        logo: {},
        description: null,
        deliveryOptions: [],
        openingHours: {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: [],
        },
      }),
    },
  },
  data() {
    const coreShop = this.coreShop
    const edit = coreShop.name !== null
    return {
      validation: '',
      edit,
      step: 1,
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
      // http://vee-validate.logaretm.com/v2/guide/interaction.html
      loadState: {
        create: false,
        pending: false,
        update: false,
      },
      shop: clone(coreShop),
    }
  },
  computed: {
    submitButtonText() {
      // last step or edit
      if (this.edit || this.step === 5) return 'save'

      // delivery options and opening times

      if (this.step === 3 && this.shop?.deliveryOptions.length === 0) {
        for (const openingHour of Object.entries(this.shop.openingHours)) {
          if (openingHour[1].length !== 0) return 'continue'
        }
        return 'skip'
      }

      // logo and shop picture

      if (
        this.step === 4 &&
        Object.keys(this.shop.logo).length === 0 &&
        Object.keys(this.shop.picture).length === 0
      ) {
        return 'skip'
      }

      return 'continue'
    },
  },
  methods: {
    ...mapActions(['getMe']),
    ...mapMutations('modal', {
      showModal: 'showModal',
    }),
    submitRaw() {
      if (this.submitButtonText === 'skip') {
        this.step++
      }
    },
    async submit() {
      if (this.edit) await this.updateShop()
      else if (this.step === 5) await this.createShop()
      else this.step++
    },
    async updateShop() {
      try {
        this.loadState.update = true
        await this.$axios.patch(
          `/api/shops/${this.shop._id}`,
          difference(this.shop, this.coreShop, [
            'openingHours',
            'deliveryOptions',
            'contact',
          ])
        )
        // Update user in storage
        await this.getMe()
        // Todo: Get shop
        this.loadState.update = false
        this.$store.dispatch('toast/add', { message: `toast.updated_shop` })
        this.$router.push('/shop')
      } catch (error) {
        this.loadState.update = false
        this.showModal({ message: 'information.shop_error_confirmation' })
        console.log(error)
      }
    },
    async createShop() {
      try {
        this.loadState.create = true
        await this.$axios.post(`/api/shops`, this.shop)
        // Update user in storage
        await this.getMe()
        // Todo: Get shop
        this.loadState.create = false
        this.showModal({
          message: 'information.shop_created_confirmation',
          confirmText: 'information.go_to_shop',
          onConfirm: () => {
            this.$router.push('/')
          },
        })
      } catch (error) {
        this.loadState.create = false
        this.showModal({ message: 'information.shop_error_confirmation' })
        console.log(error)
      }
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
    changeAllDayOpen(day, event) {
      const selectedDay = filter(
        this.shop.openingHours[day],
        (o) => o.allDayOpen
      )
      if (!selectedDay.length < 1) {
        this.shop.openingHours[day] = []
        this.shop.openingHours[day].push({
          open: '00:00',
          close: '00:00',
          allDayOpen: true,
        })
      }
    },
    removeOpeningTime(day, index) {
      this.shop.openingHours[day].splice(index, 1)
    },
    async uploadLogo(file, progress, error, options) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const imgLocal = await this.$axios.$post(`/api/media/logo`, formData)
        this.shop.logo = imgLocal
      } catch (err) {
        console.error(err)
        error(err)
      }
    },
    async uploadShopImg(file, progress, error, options) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const imgLocal = await this.$axios.$post(`/api/media/shop`, formData)
        this.shop.picture = imgLocal
      } catch (err) {
        console.error(err)
        error(err)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.tab {
  &-heading {
    @apply text-center font-bold text-light;
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
