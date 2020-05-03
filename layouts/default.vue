<template>
  <div class="flex flex-col min-h-screen">
    <toast />
    <modal
      :show="showModal"
      :dismiss="null"
      confirm="Okay"
      centered
      @confirm="hideModal"
      >{{ $t(message) }}</modal
    >
    <navigation
      class="hidden md:block sticky top-0 py-2 container mx-auto px-2"
    />
    <nuxt class="container flex-1 mx-auto px-2 mb-20 md:mb-10" />
    <navbar class="block md:hidden fixed bottom-0 w-full" />
    <footer-bar class="px-8 pt-10 pb-20 md:pb-10" />
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import Navigation from '~/components/layout/Navigation'
import Navbar from '~/components/layout/Navbar'
import FooterBar from '~/components/layout/FooterBar'
import Toast from '~/components/elements/Toast'
import Modal from '~/components/elements/Modal'

export default {
  components: {
    Navigation,
    Navbar,
    FooterBar,
    Toast,
    Modal,
  },
  computed: {
    ...mapGetters('modal', {
      showModal: 'showModal',
      message: 'message',
    }),
  },
  methods: {
    ...mapMutations('modal', {
      hideModal: 'hideModal',
    }),
  },
}
</script>
