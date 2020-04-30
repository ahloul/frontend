<template>
  <div class="flex flex-col">
    <modal
      :show="showModal"
      centered
      dismiss="Schließen"
      @dismiss="showModal = false"
      >Bitte kontaktiere uns, wenn du dein Account löschen möchtest <br />
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
          Informationen
        </div>
      </button>
      <button
        :class="{ secondary: step == 2 }"
        class="tooltip"
        @click="step = 2"
      >
        <icon :name="step == 2 ? 'pin' : 'pin-outline'" />
        <div class="tooltip-content" :class="{ active: step == 2 }">
          Kontaktdaten
        </div>
      </button>
      <button
        :class="{ secondary: step == 3 }"
        class="tooltip"
        @click="step = 3"
      >
        <icon :name="step == 3 ? 'car' : 'car-outline'" />
        <div class="tooltip-content" :class="{ active: step == 3 }">
          Versandmöglichkeiten
        </div>
      </button>
      <button
        :class="{ secondary: step == 4 }"
        class="tooltip"
        @click="step = 4"
      >
        <icon :name="step == 4 ? 'camera' : 'camera-outline'" />
        <div class="tooltip-content" :class="{ active: step == 4 }">
          Bilder
        </div>
      </button>
      <button
        :class="{ secondary: step == 5 }"
        class="tooltip"
        @click="step = 5"
      >
        <icon :name="step == 5 ? 'edit' : 'edit-outline'" />
        <div class="tooltip-content" :class="{ active: step == 5 }">
          Beschreibung
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
              <span>Name des shops</span>
              <input
                v-model="shop.name"
                name="Shopname"
                type="text"
                class="form-input"
                placeholder="z.B. Sam & Partner GbR"
              />
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </label>

          <!-- companyType SELECT -->
          <label class="block" for="companyType">
            <span>Rechtsform</span>
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
                <option value="SS">Selbstständig</option>
                <option value="EU">Einzelunternehmer</option>
                <option value="PG"
                  >Personengesellschaft (z. B. GdbR, OHG, KG)</option
                >
                <option value="GN">Gemeinnützig / Verein</option>
                <option value="GP"
                  >Gesellschaft in privater Hand (z. B. GmbH, UG, Ltd.)</option
                >
                <option value="AG">Aktiengesellschaft</option>
              </select>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </label>

          <!-- companySize SELECT -->
          <label class="block" for="companySize">
            <span>Mitarbeiterzahl</span>
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
            <span>Vollständige Adresse</span>
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
            <span>Telefonnummer</span>
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

          <!-- Website INPUT -->
          <label class="form-label w-full" for="companyPhone">
            <span>Webseite</span>
            <ValidationProvider
              v-slot="{ errors }"
              rules="max:200|validUrl"
              name="Webseite"
            >
              <input
                id="companyPhone"
                v-model="shop.contact.website"
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
              <span class="ml-2"
                >Ich biete <b>{{ deliveryOption.name }}</b> an.
                {{ deliveryOption.description }}.</span
              >
            </label>
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
            Speichern
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { clone } from 'lodash'
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
        name: 'Lokale lieferung',
        value: 'LD',
        description:
          'Wir sorgen dafür, dass unsere Kunden Ihre ware Zeitnah erhalten',
      },
      {
        name: 'Post- und Paketversand',
        value: 'MU',
        description:
          'Auf wunsch versenden wir die Pakete auch per Brief und Post',
      },
      {
        name: 'Abholung',
        value: 'PU',
        description: 'Kunden können unsere Waren auch vorort abholen',
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
          difference(this.shop, this.coreShop)
        )
        // Update user in storage
        await this.getMe()
        // Todo: Get shop
        this.loadState.update = false
        this.$store.dispatch('toast/add', { message: `Shop geändert!` })
        this.$router.push('/shop')
      } catch (error) {
        this.loadState.update = false
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
  @apply relative mx-2 z-10;
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
