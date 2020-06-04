<template>
  <div class="z-50">
    <nav class="navbar">
      <ul>
        <li v-if="haveShop">
          <n-link to="/#1" exact
            ><icon name="layers-outline" width="20"
          /></n-link>
        </li>
        <li v-if="haveShop">
          <n-link to="/category"
            ><icon name="cube-outline" width="20"
          /></n-link>
        </li>
        <li v-if="haveShop">
          <n-link to="/shop">
            <icon name="home-outline" width="20" />
          </n-link>
        </li>
        <li v-if="!haveShop" class="mr-auto">
          <n-link to="/shop/create" class="font-bold"
            ><icon name="plus-outline" width="20" /><span class="text-xs">
              {{ $t('navbar.create_shop') }}
            </span></n-link
          >
        </li>
        <li>
          <n-link to="/profile"
            ><icon name="person-outline" width="20"
          /></n-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
/**
 * Default top navigation for mobile view.
 */
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(['haveShop']),
    ...mapState({
      // arrow functions can make the code very succinct!
      shop: (state) => state.shop.shop,
    }),
  },
  methods: {
    toggleNavbar() {
      this.menuShow = !this.menuShow
    },
  },
}
</script>
<style lang="scss">
.navbar {
  @apply bg-white antialiased shadow-lg p-2;

  ul {
    @apply list-none overflow-hidden flex justify-between w-full max-w-sm mx-auto;
  }

  li {
    a {
      @apply flex items-center;
      @apply p-3 mx-0;
      color: #7e7577;
      @apply transition duration-300 ease-in-out;

      &:hover {
        @apply text-primary no-underline;
      }
    }
    .nuxt-link-active {
      @apply text-primary no-underline;
    }
  }
}
</style>
