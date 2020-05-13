<template>
  <div class="flex flex-col content-center justify-center p-2">
    <div class="card max-w-lg mx-auto">
      <!-- Headline -->
      <div class="w-full max-w-sm mx-auto">
        <img src="/img/logo.svg" width="150" class="mx-auto" alt="" />
      </div>

      <!-- Form -->
      <div class="w-full max-w-sm mx-auto">
        <ValidationObserver ref="form" v-slot="{ handleSubmit }" slim>
          <form @submit.prevent="handleSubmit(localLogin)">
            <!-- INPUT E-Mail -->
            <label class="block">
              <span>{{ $t('login.email') }}</span>
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
              <span>{{ $t('login.password') }}</span>
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

            <div class="mt-5 flex items-center justify-end">
              <div class="leading-5">
                <n-link to="/account/forgot">
                  {{ $t('login.help') }}
                </n-link>
              </div>
            </div>

            <div class="mt-5">
              <span class="block w-full">
                <button
                  class="cta bg-tertiary w-full"
                  :class="{ 'spinner-light': pending === 'local' }"
                  type="submit"
                >
                  {{ $t('login.login') }}
                </button>
              </span>
            </div>
            <div class="mt-3">
              <span class="block w-full">
                <button
                  type="button"
                  class="cta w-full"
                  @click.prevent="$router.push('/account/signup')"
                >
                  {{ $t('signup.register') }}
                </button>
              </span>
            </div>
          </form>
        </ValidationObserver>
        <!-- Bottom Social Area -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t"></div>
            </div>
            <div class="relative flex justify-center text-sm leading-5">
              <span class="px-2 bg-white text-primary">
                {{ $t('login.thirdparty') }}
              </span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <div>
              <button
                class="cta icon-r w-full"
                :class="{ 'spinner-dark': pending === 'facebook' }"
                @click="socialLogin('facebook')"
              >
                <icon name="facebook" /> {{ $t('login.facebook') }}
              </button>
            </div>

            <div>
              <button
                class="cta icon-r w-full"
                :class="{ 'spinner-dark': pending === 'google' }"
                @click="socialLogin('google')"
              >
                <icon name="google" /> {{ $t('login.google') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable camelcase */
/* access_token comes from external service */

import { mapActions } from 'vuex'
export default {
  name: 'Login',
  layout: 'blank',
  middleware: 'notAuthenticated',
  data: () => ({
    pending: null,
    guest: {
      email: '',
      password: '',
      token: process.env.VUE_APP_MASTER_KEY,
    },
  }),
  methods: {
    ...mapActions(['setLocalUser', 'getMe']),
    async localLogin(e) {
      try {
        // Set Loading
        this.pending = 'local'
        // Authenticate with local auth service
        const {
          data: { token },
        } = await this.$axios.post(`/api/auth`, this.guest)

        // Set local access token to store and cookie
        await this.setLocalUser(token)

        // Get user informations
        await this.getMe()

        // Unset Loading
        this.pending = null

        // Redirect on successfull authentication
        await this.$router.push('/')
      } catch ({ response: { data } }) {
        // TODO: Catch error
        this.pending = null
        this.$refs.form.setErrors({
          email: [data.message],
        })
      }
    },
    async socialLogin(provider) {
      try {
        // Set Loading
        this.pending = provider

        // Authenticate with external service
        const {
          authResponse: { access_token },
        } = await this.$socialLoginService(provider)

        // Post the access_token to login user on backend
        const {
          data: { token },
        } = await this.$axios.post(`/api/auth/${provider}`, {
          token: access_token,
        })

        // Set local access token to store and cookie
        await this.setLocalUser(token)

        // Get user informations
        await this.getMe()

        // Unset Loading
        this.pending = null

        // Redirect on successfull authentication
        await this.$router.push('/')
      } catch (error) {
        // Error handler
        // TODO: Catch error
        console.log(error)
        this.pending = null
      }
    },
  },
}
</script>
