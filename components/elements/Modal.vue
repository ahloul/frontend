<template>
  <div>
    <div
      v-show="show"
      class="modal-bg"
      @click="$emit('dismiss')"
      @keyup.esc="$emit('dismiss')"
    ></div>
    <transition name="modalAnimation">
      <div v-show="show" class="modal-wrapper">
        <div class="modal">
          <div
            class="modal-body p-6 sm:p-8 w-full max-w-xl"
            :class="[{ 'text-center': centered }]"
          >
            <div>
              <slot name="header"></slot>
            </div>
            <div class="mb-6 mt-3">
              {{ $t(message) }}
              <slot />
            </div>
            <div
              class="flex justify-end"
              :class="{ 'justify-center': centered }"
            >
              <button v-if="dismissText" class="w-auto border" @click="dismiss">
                {{ $t(dismissText) }}
              </button>
              <button
                v-if="confirmText"
                class="primary w-auto ml-4"
                @click="confirm"
              >
                {{ $t(confirmText) }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'Modal',
  props: {
    centered: {
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters('modal', {
      showModal: 'showModal',
      message: 'message',
      confirmText: 'confirmText',
      dismissText: 'dismissText',
    }),
  },

  watch: {
    show(newValue, oldValue) {
      const rootBody = document.getElementsByTagName('body')[0]
      if (newValue) rootBody.classList.add('overflow-hidden')
      else rootBody.classList.remove('overflow-hidden')
    },
  },
  beforeDestroy() {
    const rootBody = document.getElementsByTagName('body')[0]
    rootBody.classList.remove('overflow-hidden')
  },
  methods: {
    ...mapMutations('modal', {
      confirm: 'confirm',
      dismiss: 'dismiss',
    }),
  },
}
</script>

<style lang="scss" scoped>
/*
 * Top Modal Item Animation
 */
.modalAnimation-item {
  display: inline-block;
}

.modalAnimation-enter-active,
.modalAnimation-leave-active {
  transition: all 0.5s;
}

.modalAnimation-enter,
.modalAnimation-leave-to {
  opacity: 0;
  transform: translateY(-2rem);
}

.modal {
  @apply h-screen w-full absolute flex items-center justify-center;
  &-wrapper {
    @apply z-50 fixed top-0 left-0 bottom-0 right-0 bg-transparent shadow;
  }
  &-bg {
    @apply z-50 fixed top-0 left-0 h-screen w-full bg-light opacity-75;
  }
  &-body {
    @apply bg-white m-3 max-h-full text-secondary rounded-lg;
  }
}
</style>
