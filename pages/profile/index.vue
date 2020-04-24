<template>
  <div class="container max-w-md">
    <div
      class="animated settings md:flex"
      @click="$router.push('/profile/settings')"
    >
      <img
        class="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
        :src="user.picture.url"
      />
      <div class="text-center md:text-left">
        <h2
          class="text-lg font-semibold leading-none text-secondary mt-4 md:mt-0"
        >
          {{ user.name }}
        </h2>
        <!-- <div class="text-info leading-snug text-sm">{{user.location}}</div> -->
      </div>
      <div class="animated-slow flex justify-end ml-auto settings-icon">
        <icon name="settings-outline" />
      </div>
    </div>
    <div class="flex justify-end">
      <button class="icon" @click="logoutUser">
        Logout <icon name="log-out-outline" />
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
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.settings {
  @apply bg-white cursor-pointer shadow rounded p-6 mt-3;
  .settings-icon {
    @apply opacity-0 text-info;
  }
  &:hover {
    @apply shadow-lg;

    .settings-icon {
      @apply opacity-100;
    }
  }
}
</style>
