<template>
  <div class="flex flex-col">
    <!-- Modal -->
    <modal
      :show="showModal"
      :dismiss="null"
      confirm="Zum shop"
      centered
      @confirm="$router.push('/')"
      >Du hast erfogreich ein Shop erstellt! <br />
      Du kannst jetzt loslegen.
    </modal>
    <div class="flex mt-2 justify-between max-w-xs mx-auto">
      <button
        :class="{ secondary: openTab == 1 }"
        class="tooltip"
        @click="toggleTab(1)"
      >
        <icon :name="openTab == 1 ? 'radio-button-on' : 'radio-button-off'" />
        <div class="tooltip-content" :class="{ active: openTab == 1 }">
          Informationen
        </div>
      </button>
      <button
        :class="{ secondary: openTab == 2 }"
        class="tooltip"
        @click="toggleTab(2)"
      >
        <icon :name="openTab == 2 ? 'radio-button-on' : 'radio-button-off'" />
        <div class="tooltip-content" :class="{ active: openTab == 2 }">
          Kontaktdaten
        </div>
      </button>
      <button
        :class="{ secondary: openTab == 3 }"
        class="tooltip"
        @click="toggleTab(3)"
      >
        <icon :name="openTab == 3 ? 'radio-button-on' : 'radio-button-off'" />
        <div class="tooltip-content" :class="{ active: openTab == 3 }">
          Bilder
        </div>
      </button>
      <button
        :class="{ secondary: openTab == 4 }"
        class="tooltip"
        @click="toggleTab(4)"
      >
        <icon :name="openTab == 4 ? 'radio-button-on' : 'radio-button-off'" />
        <div class="tooltip-content" :class="{ active: openTab == 4 }">
          Beschreibung
        </div>
      </button>
    </div>
    <ValidationObserver v-slot="{ handleSubmit }" class="mt-10" slim>
      <form @submit.prevent="handleSubmit(createShop)">
        <!-- Informationen -->
        <div v-show="openTab === 1" :key="1" class="tab-section">
          <p class="tab-heading">
            Vielen Dank für deine Anmeldung! Mit ein paar wenigen Schritten
            helfen wir dir, dein Shop anzulegen. Los gehts!
          </p>
          <!-- shopName INPUT -->
          <label class="block">
            <ValidationProvider
              v-slot="{ errors }"
              :rules="{ required: true, max: 20 }"
              :mode="validationMode"
            >
              <span>Name des shops</span>
              <input
                id="shopName"
                v-model="shop.name"
                name="Shopname"
                type="text"
                class="form-input"
                placeholder="z.B. Sam & Partner GbR"
                @input="checkName"
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
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
          </label>

          <!-- Next BUTTON -->
          <div class="flex justify-end">
            <button type="button" class="border my-10" @click="openTab = 2">
              Weiter
            </button>
          </div>
        </div>
        <!-- Kontaktdaten -->
        <div v-show="openTab === 2" :key="2" class="tab-section">
          <p class="tab-heading">
            Gib die Addresse deines Shops an damit andere wissen, wo sie dich
            finden können.
          </p>

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
              :rules="{ required: true, address: { address: shop.address } }"
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
                placeholder="+49 123 45678"
              />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </label>

          <!-- Website INPUT -->
          <label class="form-label w-full" for="companyPhone">
            <span>Webseite</span>
            <ValidationProvider
              v-slot="{ errors }"
              rules="max:200"
              name="Webseite"
            >
              <input
                id="companyPhone"
                v-model="shop.contact.website"
                type="text"
                class="form-input mt-1 block w-full"
                placeholder="https://getit.social"
              />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </label>

          <!-- Next Back BUTTON -->
          <div class="flex justify-between">
            <button type="button" class="border my-10" @click="openTab = 1">
              Zurück
            </button>
            <button type="button" class="border my-10" @click="openTab = 3">
              Weiter
            </button>
          </div>
        </div>
        <!-- Bilder -->
        <div v-show="openTab === 3" :key="3" class="tab-section">
          <p class="tab-heading">
            Zeig dein Shop mit einem Foto und deinem Logo.
          </p>

          <div class="mt-5 flex justify-center">
            <image-upload
              folder="logos"
              placeholder="Logo"
              :image="shop.logo"
              @target="selectLogo"
            />
          </div>
          <div class="mt-5 flex justify-center">
            <image-upload
              folder="shops"
              placeholder="Shopbild"
              :image="shop.picture"
              @target="selectPicture"
            />
          </div>
          <!-- Next Back BUTTON -->
          <div class="flex justify-between">
            <button type="button" class="border my-10" @click="openTab = 2">
              Zurück
            </button>
            <button type="button" class="border my-10" @click="openTab = 4">
              Weiter
            </button>
          </div>
        </div>
        <!-- Beschreibung -->
        <div v-show="openTab === 4" :key="4" class="tab-section">
          <p class="tab-heading">
            Wenn du möchtest, beschreib dein Geschäft mit ein paar Sätzen. Lass
            deiner Kreativität freien lauf!
          </p>
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
          <div class="flex justify-between">
            <button type="button" class="border my-10" @click="openTab = 3">
              Zurück
            </button>
            <button
              type="submit"
              class="primary my-10"
              :class="{ 'spinner-light': loadState.create }"
            >
              Erstellen
            </button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import Autocomplete from '~/components/elements/Autocomplete'
import imageUpload from '~/components/utils/ImageUpload'
import Wysiwyg from '~/components/utils/Wysiwyg'

export default {
  name: 'CreateShop',
  components: {
    Autocomplete,
    imageUpload,
    Wysiwyg,
  },
  data: () => ({
    openTab: 1,
    showModal: false,
    loadState: {
      create: false,
    },
    // http://vee-validate.logaretm.com/v2/guide/interaction.html
    validationMode: 'eager',
    shop: {
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
    },
  }),
  computed: {
    companyLocation(e) {
      // if (!this.myUser.location) return
      return this.shop.address?.label
    },
  },
  methods: {
    toggleTab(tabNumber) {
      this.openTab = tabNumber
    },
    selectLogo(target) {
      this.shop.logo = target
    },
    selectPicture(target) {
      this.shop.picture = target
    },
    selectLocation({ address, locationId, label }) {
      this.shop.address = { ...address, label, locationId }
    },
    checkName: debounce(async function (e) {
      try {
        await this.$axios.$post(`/api/shops/checkName`, {
          name: this.shop.name,
        })
      } catch ({ response: { data } }) {
        this.$refs.start.setErrors({
          Shopname: ['Shopname existiert bereits'],
        })
      }
    }, 500),
    async createShop() {
      try {
        this.loadState.create = true

        await this.$axios.post(`/api/shops`, this.shop)
        this.loadState.create = false
        this.showModal = true
      } catch (error) {
        this.loadState.create = false
        console.log(error)
      }
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
