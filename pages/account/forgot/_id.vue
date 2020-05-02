<template>
  <div class="min-h-screen flex flex-col justify-center p-2">
    <div class="w-full max-w-sm mx-auto">
      <h1 class="text-center font-bold text-secondary mb-5">
        get it!
      </h1>
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
      <ValidationObserver ref="newPassword" v-slot="{ handleSubmit }" slim>
        <form @submit.prevent="handleSubmit(localNewPassword)">
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
            <span>{{ $t('login.confirm_password') }}</span>
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
                :class="{ 'spinner-light': pending }"
                type="submit"
              >
                {{ $t('login.save_new_password') }}
              </button>
            </span>
          </div>
          <div class="mt-3">
            <span class="block w-full">
              <button
                type="button"
                class="border w-full"
                @click.prevent="$router.push(localePath('/'))"
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
        await this.$router.push(this.localePath('/'))
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
