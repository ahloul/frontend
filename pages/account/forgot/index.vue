<template>
  <div class="flex flex-col content-center justify-center p-2">
    <div class="card max-w-lg mx-auto">
      <div class="w-full max-w-sm mx-auto">
        <img src="/img/logo.svg" width="150" class="mx-auto" alt="" />
      </div>

      <div class="w-full max-w-sm mx-auto">
        <FormulateForm
          v-model="guest"
          :errors="{ email: validationError }"
          @submit="localForgot"
        >
          <FormulateInput
            :label="$t('signup.email')"
            name="email"
            type="text"
            placeholder="max@mustermail.com"
            validation="bail|email|required"
          />
          <FormulateInput
            type="submit"
            :label="$t('login.request_new_password')"
          />
        </FormulateForm>

        <div class="mt-3">
          <span class="block w-full">
            <button
              type="button"
              class="cta w-full"
              @click.prevent="$router.push('/')"
            >
              {{ $t('login.back_to_login') }}
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  layout: 'blank',
  middleware: 'notAuthenticated',

  data: () => ({
    pending: false,
    guest: {
      email: '',
      link: `${process.env.VUE_APP_URL}/account/forgot`,
      token: process.env.VUE_APP_MASTER_KEY,
    },
    validationError: '',
  }),
  methods: {
    async localForgot(e) {
      try {
        // Set Loading
        this.pending = true

        // Post forgot api endpoint
        await this.$axios.post(`/api/password-resets`, this.guest)

        // Send Notification
        this.$store.dispatch('toast/add', {
          message: `you_got_mail`,
        })
        // Unset Loading
        this.pending = false

        // Redirect on successfull authentication
        await this.$router.push('/')
      } catch ({ response: { data } }) {
        // TODO: Catch error
        this.pending = null
        this.validationError = data.message
      }
    },
  },
}
</script>
