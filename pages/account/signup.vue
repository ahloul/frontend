<template>
  <div class="flex flex-col content-center justify-center p-2">
    <!-- Headline -->
    <div class="w-full max-w-sm mx-auto">
      <img src="/img/logo.svg" width="90" class="mx-auto" alt="" />
      <h2 class="text-center font-bold text-secondary">
        get it!
      </h2>
    </div>

    <!-- Form -->
    <div class="w-full max-w-sm mx-auto">
      <ValidationObserver ref="signup" v-slot="{ handleSubmit }" slim>
        <form autocomplete="__away" @submit.prevent="handleSubmit(localSignup)">
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
                placeholder="Max Mustermann"
                autocomplete="__away"
              />
              <span class="error">{{ errors[0] }}</span>
            </validation-provider>
          </label>

          <!-- INPUT E-Mail -->
          <label class="block">
            <span>E-Mail</span>
            <validation-provider
              v-slot="{ errors }"
              mode="lazy"
              name="Email"
              rules="email|required"
            >
              <input
                v-model="guest.email"
                class="form-input"
                placeholder="lothar@mustermail.com"
                autocomplete="__away"
              />
              <span class="error">{{ errors[0] }}</span>
            </validation-provider>
          </label>

          <!-- INPUT Password -->
          <label class="block">
            <span>{{ $t('login.password') }}</span>
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
                autocomplete="__away"
              />
              <span class="error">{{ errors[0] }}</span>
            </validation-provider>
          </label>

          <!-- INPUT Confirm password -->
          <label class="block">
            <span>{{ $t('login.confirm_password') }}</span>
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
                autocomplete="__away"
              />
              <span class="error">{{ errors[0] }}</span>
            </validation-provider>
          </label>

          <div class="mt-5 text-light text-sm">
            Indem du auf „Neu Registrieren“ klickst, stimmst du unseren
            <n-link to="/terms">Geschäftsbedingungen</n-link> zu. In unserer
            <n-link to="/privacy">Datenrichtlinie</n-link> erfährst du, wie wir
            deine Daten erfassen.
          </div>
          <div class="mt-5">
            <span class="block w-full">
              <button
                class="primary w-full"
                :class="{ 'spinner-light': pending }"
                type="submit"
              >
                {{ $t('signup.register') }}
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
import { mapMutations } from 'vuex'
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
    ...mapMutations('modal', { showModal: 'showModal' }),
    async localSignup(e) {
      try {
        // Set Loading
        this.pending = true
        // Sign up local user
        await this.$axios.post(`/api/users`, this.guest)

        // Unset Loading
        this.pending = false
        // Redirect on successfull authentication
        this.showModal({
          message: 'signup.successful_registration',
          confirmText: 'enter_login',
          onConfirm: this.goToLogin,
        })
      } catch ({ response: { data } }) {
        // TODO: Catch error
        this.pending = false
        this.$refs.signup.setErrors({
          Email: [data.message],
        })
      }
    },
    goToLogin() {
      this.showModal = false
      this.$router.push('/')
    },
  },
}
</script>
