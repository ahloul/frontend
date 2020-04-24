<template>
  <div class="min-h-screen flex flex-col justify-center p-2">
    <div class="w-full max-w-sm mx-auto">
      <h1 class="text-center font-bold text-secondary">
        get it!
      </h1>
    </div>

    <div class="w-full max-w-sm mx-auto">
      <ValidationObserver ref="newPassword" v-slot="{ handleSubmit }" slim>
        <form @submit.prevent="handleSubmit(localNewPassword)">
          <!-- INPUT Password -->
          <label class="block">
            <span>Passwort</span>
            <validation-provider
              id="password"
              v-slot="{ errors }"
              name="Passwort"
              mode="lazy"
              rules="required|verify_password"
            >
              <input
                v-model="password"
                class="form-input"
                type="password"
                placeholder="******************"
              />
              <span class="error">{{ errors[0] }}</span>
            </validation-provider>
          </label>

          <!-- INPUT Confirm password -->
          <label class="block">
            <span>Passwort wiederholen</span>
            <validation-provider
              v-slot="{ errors }"
              name="Password wiederholen"
              mode="lazy"
              rules="required|password:@Passwort"
            >
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                class="form-input"
                type="password"
                placeholder="******************"
              />
              <span class="error">{{ errors[0] }}</span>
            </validation-provider>
          </label>

          <div class="mt-5">
            <span class="block w-full">
              <button
                class="primary w-full"
                :class="{ 'spinner-dark': pending }"
                type="submit"
              >
                Neues Passwort speichern
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
// TODO: Verify token
// const { data } = await this.$axios.get(`/api/password-resets/${token}`)
export default {
  name: 'Login',
  layout: 'blank',
  middleware: 'notAuthenticated',

  data: () => ({
    pending: false,
    password: '',
    confirmPassword: '',
    token: process.env.VUE_APP_MASTER_KEY,
  }),
  methods: {
    async localNewPassword(e) {
      try {
        // Set Loading
        this.pending = true

        // TODO: I will move that away
        await this.$axios.patch(`/api/password-resets/${this.token}`, {
          password: this.password,
        })

        // Unset Loading
        this.pending = false

        // Redirect on successfull authentication
        await this.$router.push('/')
      } catch ({ response: { data } }) {
        // TODO: Catch error
        this.pending = null
        this.$refs.newPassword.setErrors({
          password: [data.message],
        })
      }
    },
  },
}
</script>
