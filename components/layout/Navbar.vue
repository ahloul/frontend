<template>
  <div class="p-2 md:p-3">
    <nav class="navbar">
      <ul>
        <li>
          <n-link to="/#1" exact
            ><icon name="layers-outline" width="20"
          /></n-link>
        </li>
        <li>
          <n-link to="/category"
            ><icon name="cube-outline" width="20"
          /></n-link>
        </li>
        <li>
          <n-link to="/shop"><icon name="home-outline" width="20" /></n-link>
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
 * Default top navigation for desktop view.
 */
export default {
  name: 'Navigation',
  data() {
    return {
      menuShow: false,
    }
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
  @apply bg-white rounded-lg antialiased shadow p-2;

  ul {
    @apply list-none overflow-hidden flex justify-between w-full max-w-sm mx-auto;
  }

  li {
    a {
      @apply flex items-center;
      @apply p-3 mx-0 rounded-lg;
      color: #7e7577;
      @apply transition duration-300 ease-in-out;

      &:hover {
        @apply bg-secondary text-white no-underline;
      }
    }
    .nuxt-link-active {
      @apply bg-secondary text-white no-underline;
    }
  }
}
</style>
