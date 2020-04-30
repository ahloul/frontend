<template>
  <div class="min-h-screen flex flex-col justify-center p-2">
    <div class="w-full max-w-sm mx-auto">
      <h1 class="text-center font-bold text-secondary">
        get it!
      </h1>
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
                Neues Passwort anfordern
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
                Zurück zum login
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
          message: `Du hast Post bekommen ✉️!`,
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
