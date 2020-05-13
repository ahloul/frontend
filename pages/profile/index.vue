<template>
  <div class="container max-w-lg">
    <div
      class="animated card hover:shadow-lg settings flex flex-col"
      @click="$router.push('/profile/settings')"
    >
      <div class="animated-slow absolute settings-icon">
        <icon name="settings-outline" />
      </div>
      <div class="w-24 mx-auto">
        <img
          class="rounded-full mx-auto"
          :src="user.picture.url"
          @error="(e) => (e.target.src = '/img/placeholder.png')"
        />
      </div>

      <div class="text-center my-3">
        <h2 class="text-lg font-semibold leading-none text-light mt-4 md:mt-0">
          {{ user.name }}
        </h2>
        <div v-if="user.location" class="text-info leading-snug text-sm">
          {{ user.location.label }}
        </div>
        <hr v-if="user.description" class="my-5 w-32 mx-auto" />
        <div
          v-if="user.description"
          class="break-words mt-3 text-light"
          v-html="user.description"
        />
      </div>
    </div>
    <div class="flex justify-end">
      <button class="icon" @click="logoutUser">
        {{ $t('profile.logout') }} <icon name="log-out-outline" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Profile',
  middleware: 'authenticated',
  data: () => ({}),
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions(['resetUser']),
    async logoutUser() {
      try {
        await this.$axios.post(`/api/auth/logout`)
        await this.resetUser()
        await this.$router.push('/')
        // Send toast
        this.$store.dispatch('toast/add', { message: `toast.logout` })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.settings {
  @apply cursor-pointer rounded px-6 py-4 mt-3;
  .settings-icon {
    @apply opacity-0 text-info;
  }
  &:hover {
    .settings-icon {
      @apply opacity-100;
    }
  }
}
</style>
