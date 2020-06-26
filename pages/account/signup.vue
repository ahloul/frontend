<template>
  <div class="flex flex-col content-center justify-center p-2 my-5">
    <div class="card max-w-lg mx-auto">
      <!-- Headline -->
      <div class="w-full max-w-sm mx-auto">
        <img src="/img/logo.svg" width="150" class="mx-auto" alt="" />
      </div>

      <!-- Form -->
      <div class="w-full max-w-sm mx-auto">
        <FormulateForm v-model="guest" @submit="localSignup">
          <FormulateInput
            name="name"
            type="text"
            :label="$t('signup.name')"
            validation="bail|required|min:2,length"
            placeholder="Max Mustermann"
          />
          <FormulateInput
            name="email"
            type="text"
            :label="$t('signup.email')"
            validation="bail|required|email"
            placeholder="lothar@mustermail.com"
          />
          <FormulateInput
            name="password"
            type="password"
            :label="$t('login.password')"
            validation="bail|required|password"
            placeholder="******************"
          />
          <FormulateInput
            name="confirmPassword"
            type="password"
            :label="$t('login.confirm_password')"
            :validation-rules="{
              passwordMatch: ({ value }) => value === guest.password,
            }"
            :validation-messages="{
              passwordMatch: $t('login.validation_errors.confirm_password'),
            }"
            validation="bail|required|passwordMatch"
            placeholder="******************"
          />
          <FormulateInput type="checkbox" validation="required" />
          <div class="mt-1">
            <span
              >{{ $t('signup.registration_info') }} .
              {{ $t('signup.privacy_policy_info') }}
              <n-link to="/privacy">{{ $t('signup.privacy_policy') }}</n-link>
              .
            </span>
          </div>
          <FormulateInput type="submit" :label="$t('signup.register')" />
        </FormulateForm>
        <div class="mt-3">
          <span class="block w-full">
            <button
              type="button"
              class="cta w-full"
              :disable="legalCheck"
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
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  layout: 'blank',
  middleware: 'notAuthenticated',

  data: () => ({
    legalCheck: false,
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
