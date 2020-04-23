<template>
  <div>
    <navigation
      class="hidden md:block sticky top-0 py-2 container mx-auto px-2"
    />
    <nuxt class="container mx-auto px-2 mb-20 md:mb-10" />
    <navbar class="block md:hidden fixed bottom-0 w-full" />
  </div>
</template>
<script>
import Navigation from '~/components/layout/Navigation'
import Navbar from '~/components/layout/Navbar'
export default {
  components: {
    Navigation,
    Navbar,
  },
}
</script>
