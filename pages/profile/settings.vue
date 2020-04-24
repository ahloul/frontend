<template>
  <div class="max-w-md mt-5">
    <!-- <pre>{{ user }}</pre> -->
    <div class="mt-3 flex justify-center">
      <div class="max-w-sm p-3">
        <image-upload
          folder="profilepictures"
          placeholder="Profilbild Hochladen"
          :image="user.picture"
          @target="setImage"
        />
      </div>
    </div>
    <ValidationObserver v-slot="{ handleSubmit }" slim>
      <form @submit.prevent="handleSubmit(updateUser)">
        <ValidationProvider v-slot="{ errors }" rules="min:2|required">
          <!-- categoryName INPUT -->
          <div class="form-content" :class="{ error: errors[0] }">
            <label for="userName">
              <span>Name</span>
              <input
                id="userName"
                v-model="user.name"
                name="Username"
                type="text"
                class="form-input"
                placeholder="Tayfun Gülcan"
              />
              <div class="error">{{ errors[0] }}</div>
            </label>
          </div>
        </ValidationProvider>
        <div class="flex justify-end my-3">
          <button
            class="primary"
            :class="{ 'spinner-light': pending }"
            type="submit"
          >
            Speichern
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import imageUpload from '~/components/utils/imageUpload'

export default {
  name: 'ProfileSettings',
  middleware: 'authenticated',
  components: {
    imageUpload,
  },
  async asyncData({ $axios }) {
    const user = await $axios.$get('/api/users/me')
    return { user }
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
        await this.$axios.patch(`/api/users/${this.user._id}`, this.user)

        // Update user in storage
        await this.getMe()

        // Set pending
        this.pending = false
      } catch (error) {
        // Error handling
        this.pending = false
        console.log(error)
      }
    },
    setImage(target) {
      console.log(target)
      this.user.picture = target
    },
  },
}
</script>

<style lang="css" scoped></style>
