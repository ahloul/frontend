<template>
  <div class="min-h-screen flex flex-col justify-center">
    <div class="w-full max-w-sm mx-auto">
      <h1 class="text-center font-bold text-secondary">
        get it!
      </h1>
    </div>

    <div class="w-full max-w-sm mx-auto">
      <ValidationObserver ref="form" v-slot="{ handleSubmit }" slim>
        <form @submit.prevent="handleSubmit(submit)">
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

          <label class="block">
            <span>Passwort</span>
            <validation-provider
              v-slot="{ errors }"
              name="password"
              mode="lazy"
              rules="required|verify_password"
            >
              <input
                v-model="guest.password"
                class="form-input"
                type="password"
                placeholder="******************"
              />
              <span class="error">{{ errors[0] }}</span>
            </validation-provider>
          </label>

          <div class="mt-3 flex items-center justify-end">
            <div class="leading-5">
              <n-link to="/">
                Hilfe bei der Anmeldung?
              </n-link>
            </div>
          </div>

          <div class="mt-3">
            <span class="block w-full">
              <button
                class="primary w-full"
                :class="{ 'spinner-dark': pending === 'local' }"
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
                @click.prevent="$router.push('/signup')"
              >
                Neu registrieren
              </button>
            </span>
          </div>
        </form>
      </ValidationObserver>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t"></div>
          </div>
          <div class="relative flex justify-center text-sm leading-5">
            <span class="px-2 bg-white text-primary">
              Oder melde dich an mit
            </span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-3">
          <div>
            <button
              class="bordered icon-r w-full"
              :class="{ 'spinner-dark': pending === 'facebook' }"
              @click="socialLogin('facebook')"
            >
              <icon name="facebook" /> Facebook
            </button>
          </div>

          <div>
            <button
              class="bordered icon-r w-full"
              :class="{ 'spinner-dark': pending === 'google' }"
              @click="socialLogin('google')"
            >
              <icon name="google" /> Google
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  layout: 'blank',
  middleware: 'notAuthenticated',

  data: () => ({
    pending: null,
    shadow: 'shadow-0',
    guest: {
      email: '',
      password: '',
      token: process.env.VUE_APP_MASTER_KEY,
    },
  }),
  methods: {
    ...mapActions(['setLocalUser', 'getMe']),
    async submit(e) {
      try {
        this.pending = 'local'
        // Login
        const {
          data: { token },
        } = await this.$axios.post(`/api/auth`, this.guest)
        await this.setLocalUser(token)
        await this.getMe()
        this.pending = null
        await this.$router.push('/')
      } catch ({ response: { data } }) {
        this.pending = null
        this.$refs.form.setErrors({
          email: [data.message],
        })
      }
    },
    async socialLogin(provider) {
      try {
        this.pending = provider
        const {
          authResponse: { access_token },
        } = await this.$socialLoginService(provider)
        const {
          data: { token },
        } = await this.$axios.post(`/api/auth/${provider}`, {
          token: access_token,
        })
        await this.setLocalUser(token)
        await this.getMe()
        this.pending = null
        await this.$router.push('/')
      } catch (error) {
        console.log(error)
        this.pending = null
      }
    },
  },
}
</script>

<style lang="css" scoped></style>
