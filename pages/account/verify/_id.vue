<template>
  <div class="flex flex-col content-center justify-center p-2">
    <div class="card max-w-lg mx-auto">
      <div
        class="flex flex-col w-full max-w-sm mx-auto text-center text-primary"
      >
        <icon
          v-if="submitted"
          name="done-all-outline"
          width="80"
          height="80"
          class="mx-auto"
        />
        <icon
          v-else
          name="shield-outline"
          width="80"
          height="80"
          class="mx-auto"
        />
        <p class="my-5 font-bold">
          {{ $t('account.verify_content') }}
        </p>
        <div class="my-4">
          <n-link
            to="/login"
            class="button cta"
            :class="{ 'spinner-light': pending }"
            >{{ $t('login.back_to_login') }}</n-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Verify',
  layout: 'blank',
  data: () => ({
    pending: false,
    submitted: false,
  }),
  mounted() {
    this.verifyUser()
  },
  methods: {
    async verifyUser() {
      try {
        this.pending = true
        await this.$axios.$get(`/api/verification/${this.$route.params.id}`)
        this.pending = false
        this.submitted = true
        this.redirect()
      } catch (e) {
        this.error = true
        this.pending = false
      }
    },
  },
}
</script>
