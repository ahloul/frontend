<template>
  <div class="flex flex-col content-center justify-center p-2">
    <div class="card max-w-lg mx-auto">
      <div class="w-full max-w-sm mx-auto">
        <img src="/img/logo.svg" width="150" class="mx-auto" alt="" />
      </div>
      <div class="max-w-xs mx-auto">
        <img
          :src="user.picture.url"
          width="100"
          class="rounded-full mx-auto"
          :alt="user.name"
        />
        <p class="text-center text-lg text-primary mt-3 select-none">
          {{ user.name }}
        </p>
      </div>
      <div class="w-full max-w-sm mx-auto">
        <FormulateForm
          :errors="{ password: validationError }"
          @submit="localNewPassword"
        >
          <FormulateInput
            v-model="password"
            name="password"
            type="password"
            placeholder="******************"
            validation="bail|required|password"
            :label="$t('login.password')"
          />
          <FormulateInput
            name="confirmPassword"
            type="password"
            placeholder="******************"
            :validation-rules="{
              passwordMatch: ({ value }) => value === password,
            }"
            :validation-messages="{
              passwordMatch: $t('login.validation_errors.confirm_password'),
            }"
            validation="bail|required|passwordMatch"
            :label="$t('login.confirm_password')"
          />
          <FormulateInput
            type="submit"
            :label="$t('login.save_new_password')"
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
// TODO: Verify token
// const { data } = await this.$axios.get(`/api/password-resets/${token}`)
export default {
  name: 'Login',
  layout: 'blank',
  middleware: 'notAuthenticated',
  async asyncData({ params, store, redirect, $axios }) {
    try {
      const { id } = params
      const user = await $axios.$get(`/api/password-resets/${id}`)
      return { user, token: id }
    } catch (error) {
      console.log(error)
      redirect('/account/forgot')
    }
  },
  data: () => ({
    pending: false,
    password: '',
    confirmPassword: '',
    token: process.env.VUE_APP_MASTER_KEY,
    validationError: '',
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

        // Send Notification
        this.$store.dispatch('toast/add', {
          message: `Passwort wurde zurückgesetzt`,
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
