<template>
  <div class="bg-primary">
    <div class="container flex flex-row">
      <ul class="bar text-left content-end mr-auto sm:mx-0">
        <li v-if="isAdmin">
          <n-link
            to="/admin"
            class="text-warning hover:text-tertiary items-center flex"
          >
            <icon name="shield-outline" /> <span class="ml-1">Admin</span>
          </n-link>
        </li>
        <li>
          <n-link class="text-white hover:text-tertiary" to="/imprint">{{
            $t('navbar.imprint')
          }}</n-link>
        </li>
        <li>
          <n-link class="text-white hover:text-tertiary" to="/privacy">{{
            $t('navbar.privacy_policy')
          }}</n-link>
        </li>
      </ul>
      <ul class="flex flex-col md:flex-row content-end sm:ml-auto opacity-75">
        <li
          v-for="el in locales"
          :key="el.code"
          class="ml-2 mt-2"
          :class="{ active: el.code === locale }"
        >
          <a
            href
            class="text-white hover:text-tertiary"
            @click="switchLanguage(el.code)"
          >
            {{ el.name }}
          </a>
        </li>
      </ul>
      <ul class="flex flex-wrap content-end ml-auto">
        <li class="mx-5">
          <a
            href="https://www.facebook.com/Get-It-103751584615828/"
            target="_blank"
            class="text-white hover:text-tertiary"
            ><icon name="facebook-outline"
          /></a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/getit.habenbrauchenbringen/"
            target="_blank"
            class="text-white hover:text-tertiary"
            ><svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
              /></svg
          ></a>
        </li>
      </ul>
    </div>
    <div class="container">
      <div class="mx-auto text-info select-none text-xs opacity-50 md:mt-5">
        {{ $t('footer_bar.copyright') }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FooterBar',

  data() {
    return {}
  },
  computed: {
    locales() {
      return this.$store.state.locales
    },
    locale() {
      return this.$store.state.locale
    },
    ...mapGetters(['isAdmin']),
  },
  methods: {
    switchLanguage(localeCode) {
      this.$cookies.set('locale', localeCode)
      location.reload()
    },
  },
}
</script>

<style lang="scss" scoped>
.bar {
  @apply flex flex-col;

  li {
    @apply mt-2;
  }
}
</style>
