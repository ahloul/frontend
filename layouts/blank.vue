<template>
  <div class="flex flex-col min-h-screen">
    <toast />
    <nuxt class="flex-1" />
    <footer-bar class="px-8 pt-10 pb-10" />
  </div>
</template>
<script>
import FooterBar from '~/components/layout/FooterBar'
import Toast from '~/components/elements/Toast'
export default {
  components: {
    FooterBar,
    Toast,
  },
}
</script>
