<template>
  <div class="max-w-md mt-5">
    <div class="mt-3 flex justify-center">
      <div class="max-w-sm p-3 w-40">
        <image-upload
          folder="user"
          placeholder="Profilbild"
          :image="user.picture"
          @target="selectImage"
        />
      </div>
    </div>
    <ValidationObserver v-slot="{ handleSubmit }" slim>
      <form @submit.prevent="handleSubmit(updateUser)">
        <!-- INPUT Name -->
        <label class="block">
          <span>Name</span>
          <ValidationProvider v-slot="{ errors }" rules="min:2|required">
            <input
              id="userName"
              v-model="user.name"
              name="Username"
              type="text"
              class="form-input"
              placeholder="Tayfun Gülcan"
            />
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </label>

        <!-- INPUT User location -->
        <label class="block">
          <span>Wohnort</span>
          <autocomplete
            label="Wohnort"
            :value="userLocation"
            endpoint="maps/geocode"
            queryname="query"
            display-name="label"
            @selection="selectLocation"
          />
        </label>

        <!-- TEXTAREA Description -->
        <label class="block">
          <span>Profilbeschreibung</span>
          <ValidationProvider v-slot="{ errors }" name="Benutzertext">
            <wysiwyg
              :initial-content="user.description"
              @content="(data) => (user.description = data)"
            />
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </label>

        <div class="flex justify-end my-6">
          <button
            class="primary"
            :class="{ 'spinner-light': pending }"
            type="submit"
          >
            {{ $t('save') }}
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { clone } from 'lodash'
import { difference } from '~/utils/object'
import imageUpload from '~/components/utils/ImageUpload'
import Wysiwyg from '~/components/utils/Wysiwyg'
import Autocomplete from '~/components/elements/Autocomplete'

export default {
  name: 'ProfileSettings',
  middleware: 'authenticated',
  components: {
    imageUpload,
    Autocomplete,
    Wysiwyg,
  },
  async asyncData({ $axios }) {
    const coreUser = await $axios.$get('/api/users/me')
    return { user: clone(coreUser), coreUser }
  },
  data: () => ({
    pending: false,
  }),
  computed: {
    userLocation() {
      if (!this.user.location) return
      return this.user.location?.label
    },
  },
  methods: {
    ...mapActions(['getMe']),
    async updateUser() {
      try {
        // Set pending
        this.pending = true
        // Save new User
        await this.$axios.patch(
          `/api/users/${this.user._id}`,
          difference(this.user, this.coreUser)
        )
        // Update user in storage
        await this.getMe()

        // Set pending
        this.pending = false

        // Send toast
        this.$store.dispatch('toast/add', { message: `Profil gespeichert` })

        // Back to user
        this.$router.push('/profile')
      } catch (error) {
        // Error handling
        this.pending = false
      }
    },
    selectImage(target) {
      this.user.picture = target
    },
    selectLocation(data) {
      if (!data.locationId) return
      this.user.location = data
    },
  },
}
</script>

<style lang="css" scoped></style>
