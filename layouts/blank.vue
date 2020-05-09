<template>
  <div class="flex flex-col min-h-screen">
    <toast />
    <modal :show="showModal" centered></modal>
    <nuxt class="flex-1" />
    <footer-bar class="px-8 pt-10 pb-10" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import FooterBar from '~/components/layout/FooterBar'
import Toast from '~/components/elements/Toast'
import Modal from '~/components/elements/Modal'
export default {
  components: {
    FooterBar,
    Toast,
    Modal,
  },
  computed: {
    ...mapGetters('modal', {
      showModal: 'showModal',
    }),
  },
}
</script>
