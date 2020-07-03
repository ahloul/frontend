<template>
  <div class="max-w-md mt-5">
    <FormulateInput
      type="image"
      upload-behavior="live"
      validation="mime:image/jpeg,image/png,image/jpg"
      :value="[{ url: user.picture.url }]"
      name="user_picture"
      :uploader="uploadImage"
    />
    <FormulateForm @submit="updateUser">
      <FormulateInput
        v-model="user.name"
        name="Username"
        type="text"
        :label="$t('profile.name')"
        validation="bail|min:2,length|required"
      />
      <FormulateInput
        v-model="user.location"
        type="autocomplete"
        name="location"
        endpoint="maps/geocode"
        :label="$t('profile.city')"
        placeholder="Sesamstrasse 12"
        validation="bail|address"
      />
      <FormulateInput
        v-model="user.description"
        :label="$t('profile.description')"
        type="wysiwyg"
        name="description"
      />
      <FormulateInput type="submit" :label="$t('save')" />
    </FormulateForm>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { clone } from 'lodash'
import { difference } from '~/utils/object'

export default {
  name: 'ProfileSettings',
  middleware: 'authenticated',
  async asyncData({ $axios }) {
    const coreUser = await $axios.$get('/api/users/me')
    return { user: clone(coreUser), coreUser }
  },
  data: () => ({
    pending: false,
  }),
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
        this.$store.dispatch('toast/add', { message: `toast.saved_profile` })

        // Back to user
        this.$router.push('/profile')
      } catch (error) {
        // Error handling
        this.pending = false
      }
    },
    async uploadImage(file, progress, error, options) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const imgLocal = await this.$axios.$post(`/api/media/user`, formData)
        this.user.picture = imgLocal
      } catch (err) {
        console.error(err)
        error(err)
      }
    },
  },
}
</script>

<style lang="css" scoped></style>
