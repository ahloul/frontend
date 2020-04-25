<template>
  <div class="flex flex-col">
    <div class="flex flex-wrap mt-2">
      <button
        class="w-full md:w-auto"
        :class="{ primary: openTab == 1 }"
        @click="toggleTab(1)"
      >
        Allgemeine Informationen
      </button>
      <button
        class="w-full md:w-auto"
        :class="{ primary: openTab == 2 }"
        @click="toggleTab(2)"
      >
        Kontaktdaten
      </button>
      <button
        class="w-full md:w-auto"
        :class="{ primary: openTab == 3 }"
        @click="toggleTab(3)"
      >
        Kontaktdaten
      </button>
      <button
        class="w-full md:w-auto"
        :class="{ primary: openTab == 4 }"
        @click="toggleTab(4)"
      >
        Bilder
      </button>
      <button
        class="w-full md:w-auto"
        :class="{ primary: openTab == 5 }"
        @click="toggleTab(5)"
      >
        Beschreibung
      </button>
    </div>
    <transition-group :key="openTab" name="fade">
      <div v-show="openTab === 1" :key="1" class="w-full max-w-md mt-5 mx-auto">
        1
      </div>
      <div v-show="openTab === 2" :key="2" class="w-full max-w-md mt-5 mx-auto">
        2
      </div>
      <div v-show="openTab === 3" :key="3" class="w-full max-w-md mt-5 mx-auto">
        3
      </div>
      <div v-show="openTab === 4" :key="4" class="w-full max-w-md mt-5 mx-auto">
        4
      </div>
      <div v-show="openTab === 5" :key="5" class="w-full max-w-md mt-5 mx-auto">
        5
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'CreateShop',
  data: () => ({
    openTab: 1,
  }),
  methods: {
    toggleTab(tabNumber) {
      this.openTab = tabNumber
    },
  },
}
</script>
