<template>
  <div class="flex flex-col min-h-screen">
    <toast />
    <modal :show="showModal" centered></modal>
    <navigation
      v-if="haveToken"
      class="hidden md:block sticky top-0 py-2 container mx-auto px-2 z-30"
    />
    <div v-if="!haveToken" class="container mx-auto mt-10 px-2">
      <n-link to="/">{{ $t('back') }}</n-link>
    </div>
    <nuxt class="container flex-1 mx-auto px-2 mb-20 md:mb-10" />
    <navbar v-if="haveToken" class="block md:hidden fixed bottom-0 w-full" />
    <footer-bar
      class="px-8 pt-10 md:pb-10"
      :class="[haveToken ? 'pb-20 md:pb-10' : 'pb-10']"
    />
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
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
    }),
    ...mapState({
      haveToken: (state) => !!state.accessToken,
    }),
  },
}
</script>
