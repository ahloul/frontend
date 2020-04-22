<template>
  <ValidationProvider
    v-slot="{ errors }"
    ref="provider"
    name="Bild"
    rules="ext:jpg,png,jpeg"
  >
    <!-- articlePicture FILE -->
    <div v-if="imgLocal.url">
      <img :src="imgLocal.url" alt="" class="rounded-lg mx-auto" />
      <button
        v-if="imgLocal.id"
        class="w-auto mx-auto"
        @click="removeImageAction"
      >
        Entfernen
      </button>
    </div>
    <div v-else class="dropbox">
      <div class="dropbox-content">
        <div>
          <icon v-if="!isUploading" name="image-outline" />
          <p :class="{ 'spinner-dark': isUploading }">
            {{ placeholder }}
          </p>
        </div>
        <span class="error-message">{{ errors[0] }}</span>
      </div>
      <input
        :ref="folder"
        type="file"
        multiple
        accept="image/*"
        class="input-file"
        @change="handleFileChange"
      />
    </div>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { mapActions } from 'vuex'
export default {
  name: 'ImageUpload',
  components: {
    ValidationProvider,
  },
  props: {
    folder: {
      type: String,
      default: null,
      required: true,
    },
    image: {
      type: Object,
      default: null,
    },
    placeholder: {
      type: String,
      default: 'Bild auswählen',
    },
  },

  data: () => ({
    isUploading: false,
  }),
  computed: {
    imgLocal: {
      get() {
        return this.image
      },
      set(value) {
        this.$emit('target', value)
        return value
      },
    },
  },
  methods: {
    ...mapActions({
      uploadImage: 'filehandler/imageUpload',
      removeImage: 'filehandler/imageRemove',
    }),
    async handleFileChange(e) {
      this.file = this.$refs[this.folder].files[0]
      const formData = new FormData()
      formData.append('file', this.file)
      try {
        this.isUploading = true
        await this.$refs.provider.validate(e)
        this.imgLocal = await this.uploadImage({
          formData,
          folder: this.folder,
          user: this.user,
        })
        this.isUploading = false
      } catch (error) {
        this.isUploading = false
        console.log(error)
      }
    },
    async removeImageAction() {
      if (this.imgLocal.public_id)
        await this.removeImage(this.imgLocal.public_id)
      this.$emit('target', {})
    },
  },
}
</script>

<style lang="scss" scoped>
// File Input
//
.dropbox {
  @apply transition-all duration-100 ease-in-out;
  @apply flex content-center justify-center flex-wrap;
  @apply bg-white text-primary border-2 border-dashed border-2 rounded text-center h-40 cursor-pointer;
  &:hover {
    @apply bg-grey;
  }
  &-content {
    @apply absolute mt-16;
  }
}
.input-file {
  @apply opacity-0 w-full h-full cursor-pointer bg-primary inline-block;
}
</style>
