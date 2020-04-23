<template>
  <div class="min-h-screen flex flex-col justify-center">
    <div class="w-full max-w-sm mx-auto">
      <h1 class="text-center font-bold text-secondary">
        get it!
      </h1>
    </div>

    <div class="w-full max-w-sm mx-auto">
      <ValidationObserver ref="signup" v-slot="{ handleSubmit }" slim>
        <form @submit.prevent="handleSubmit(localSignup)">
          <!-- INPUT Name -->
          <label class="block">
            <span>Name</span>
            <validation-provider
              v-slot="{ errors }"
              mode="lazy"
              name="Name"
              rules="min:2|required"
            >
              <input
                v-model="guest.name"
                class="form-input"
                placeholder="Lothar Muster"
              />
              <span class="error-message">{{ errors[0] }}</span>
            </validation-provider>
          </label>

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
                v-model="guest.password"
                class="form-input"
                type="password"
                placeholder="******************"
              />
              <span class="error-message">{{ errors[0] }}</span>
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
                v-model="guest.confirmPassword"
                class="form-input"
                type="password"
                placeholder="******************"
              />
              <span class="error-message">{{ errors[0] }}</span>
            </validation-provider>
          </label>

          <div class="mt-3">
            <span class="block w-full">
              <button
                class="primary w-full"
                :class="{ 'spinner-dark': pending }"
                type="submit"
              >
                Anmelden
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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      token: process.env.VUE_APP_MASTER_KEY,
    },
  }),
  methods: {
    async localSignup(e) {
      try {
        // Set Loading
        this.pending = true
        // Sign up local user
        await this.$axios.post(`/api/users`, this.guest)

        // Unset Loading
        this.pending = false

        // Redirect on successfull authentication
        await this.$router.push('/')
      } catch ({ response: { data } }) {
        // TODO: Catch error
        this.pending = false
        this.$refs.signup.setErrors({
          email: [data.message],
        })
      }
    },
  },
}
</script>
