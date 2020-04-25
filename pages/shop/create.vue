<template>
  <div class="flex flex-col">
    <div class="flex mt-2 justify-between max-w-xs mx-auto">
      <button :class="{ secondary: openTab == 1 }" @click="toggleTab(1)">
        <icon :name="openTab == 1 ? 'radio-button-on' : 'radio-button-off'" />
      </button>
      <button :class="{ secondary: openTab == 2 }" @click="toggleTab(2)">
        <icon :name="openTab == 2 ? 'radio-button-on' : 'radio-button-off'" />
      </button>
      <button :class="{ secondary: openTab == 3 }" @click="toggleTab(3)">
        <icon :name="openTab == 3 ? 'radio-button-on' : 'radio-button-off'" />
      </button>
      <button :class="{ secondary: openTab == 4 }" @click="toggleTab(4)">
        <icon :name="openTab == 4 ? 'radio-button-on' : 'radio-button-off'" />
      </button>
    </div>
    <transition-group :key="openTab" name="fade">
      <div v-show="openTab === 1" :key="1" class="w-full max-w-md mt-5 mx-auto">
        <h3>Informationen</h3>
      </div>
      <div v-show="openTab === 2" :key="2" class="w-full max-w-md mt-5 mx-auto">
        <h3>Kontaktdaten</h3>
      </div>
      <div v-show="openTab === 3" :key="3" class="w-full max-w-md mt-5 mx-auto">
        <h3>Bilder</h3>
        <div class="mt-3 flex justify-center">
          <div class="max-w-sm p-3 w-40">
            <image-upload
              folder="logos"
              placeholder="Logo"
              :image="shop.logo"
              @target="selectLogo"
            />
          </div>
        </div>
        <div class="mt-3 flex justify-center">
          <div class="max-w-sm p-3 w-40">
            <image-upload
              folder="shops"
              placeholder="Shopbild"
              :image="shop.picture"
              @target="selectPicture"
            />
          </div>
        </div>
      </div>
      <div v-show="openTab === 4" :key="4" class="w-full max-w-md mt-5 mx-auto">
        <h3>Beschreibung</h3>
      </div>
    </transition-group>
  </div>
</template>

<script>
import imageUpload from '~/components/utils/ImageUpload'

export default {
  name: 'CreateShop',
  components: {
    imageUpload,
  },
  data: () => ({
    openTab: 1,
    shop: {
      picture: {},
      logo: {},
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
