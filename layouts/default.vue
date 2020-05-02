<template>
  <div class="flex flex-col min-h-screen">
    <toast />
    <navigation
      class="hidden md:block sticky top-0 py-2 container mx-auto px-2"
    />
    <nuxt class="container flex-1 mx-auto px-2 mb-20 md:mb-10" />
    <navbar class="block md:hidden fixed bottom-0 w-full" />
    <footer-bar class="px-8 pt-10 pb-20 md:pb-10" />
  </div>
</template>
<script>
import Navigation from '~/components/layout/Navigation'
import Navbar from '~/components/layout/Navbar'
import FooterBar from '~/components/layout/FooterBar'
import Toast from '~/components/elements/Toast'
export default {
  components: {
    Navigation,
    Navbar,
    FooterBar,
    Toast,
  },
}
</script>
