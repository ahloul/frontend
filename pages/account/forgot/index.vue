<template>
  <div class="flex flex-col content-center justify-center p-2">
    <div class="w-full max-w-sm mx-auto">
      <img src="/img/logo.svg" width="90" class="mx-auto" alt="" />
      <h2 class="text-center font-bold text-secondary">
        get it!
      </h2>
    </div>

    <div class="w-full max-w-sm mx-auto">
      <ValidationObserver ref="forgot" v-slot="{ handleSubmit }" slim>
        <form @submit.prevent="handleSubmit(localForgot)">
          <!-- INPUT E-Mail -->
          <label class="block">
            <span>E-Mail</span>
            <validation-provider
              v-slot="{ errors }"
              mode="lazy"
              name="email"
              rules="email|required"
            >
              <input
                v-model="guest.email"
                class="form-input"
                placeholder="lothar@mustermail.com"
              />
              <span class="error">{{ errors[0] }}</span>
            </validation-provider>
          </label>

          <div class="mt-5">
            <span class="block w-full">
              <button
                class="primary w-full"
                :class="{ 'spinner-light': pending }"
                type="submit"
              >
                {{ $t('login.request_new_password') }}
              </button>
            </span>
          </div>
          <div class="mt-3">
            <span class="block w-full">
              <button
                type="button"
                class="border w-full"
                @click.prevent="$router.push('/')"
              >
                {{ $t('login.back_to_login') }}
              </button>
            </span>
          </div>
        </form>
      </ValidationObserver>
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
        this.$refs.forgot.setErrors({
          email: [data.message],
        })
      }
    },
  },
}
</script>
