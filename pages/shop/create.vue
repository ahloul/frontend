<template>
  <div class="flex flex-col">
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
    <transition-group :key="openTab" name="fade" class="mt-5">
      <!-- Informationen -->
      <div v-show="openTab === 1" :key="1" class="tab-section">
        <p>
          Vielen Dank für deine Anmeldung! Mit ein paar wenigen Schritten helfen
          wir dir, dein Shop anzulegen. Los gehts!
        </p>
      </div>
      <!-- Kontaktdaten -->
      <div v-show="openTab === 2" :key="2" class="tab-section">
        <p>
          Gib die Addresse deines Shops an damit andere wissen, wo sie dich
          finden können.
        </p>
      </div>
      <!-- Bilder -->
      <div v-show="openTab === 3" :key="3" class="tab-section">
        <p>Zeig dein Shop mit einem Foto und deinem Logo.</p>

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
      </div>
      <!-- Beschreibung -->
      <div v-show="openTab === 4" :key="4" class="tab-section">
        <p>
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
      </div>
    </transition-group>
  </div>
</template>

<script>
import imageUpload from '~/components/utils/ImageUpload'
import Wysiwyg from '~/components/utils/Wysiwyg'

export default {
  name: 'CreateShop',
  components: {
    imageUpload,
    Wysiwyg,
  },
  data: () => ({
    openTab: 1,
    shop: {
      picture: {},
      logo: {},
      description: '',
    },
  }),
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
    selectLocation(data) {
      if (!data.locationId) return
      this.shop.address = data
    },
  },
}
</script>
<style lang="scss" scoped>
.tab {
  &-section {
    @apply w-full max-w-md mt-10 mx-auto text-center text-light;
  }
}
.tooltip {
  @apply relative mx-2;
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
