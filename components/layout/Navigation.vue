<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <nav class="bg-white shadow">
        <div class="container navigation">
          <div class="brand">
            <n-link to="/" exact>
              <img src="/img/logo.svg" alt="" width="110" />
            </n-link>
          </div>
          <div class="ml-3">
            <ul v-if="!haveShop">
              <li>
                <n-link to="/shop/create">
                  {{ $t('navbar.create_shop') }}
                </n-link>
              </li>
            </ul>
            <ul v-if="haveShop">
              <li>
                <n-link to="/" exact>
                  {{ $t('navbar.processes') }}
                </n-link>
              </li>
              <li>
                <n-link to="/category">
                  {{ $t('navbar.stock') }}
                </n-link>
              </li>
              <li>
                <n-link to="/shop">{{ $t('navbar.shop') }}</n-link>
              </li>
            </ul>
          </div>
          <div class="ml-auto">
            <ul>
              <li>
                <n-link to="/profile">
                  <icon name="person-outline" />
                </n-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
/**
 * Default top navigation for desktop view.
 */
import { mapGetters } from 'vuex'

export default {
  name: 'Navigation',
  data() {
    return {
      menuShow: false,
    }
  },
  computed: {
    ...mapGetters(['haveShop']),
  },
}
</script>
<style lang="scss">
.navigation {
  @apply relative flex items-center text-black antialiased px-2 py-5;

  @screen sm {
    @apply px-3;
  }

  .brand {
    @apply font-bold text-xl px-1 hidden;

    @screen sm {
      @apply inline-block;
    }

    a {
      @apply text-primary no-underline;

      &:hover {
        @apply text-info;
      }
    }

    @screen sm {
      @apply px-3;
    }
  }

  ul {
    @apply list-none overflow-hidden;
  }

  li {
    @apply float-left;

    a {
      @apply flex items-center;
      @apply text-light px-3 py-2 mx-0 rounded-md uppercase text-xs font-bold tracking-wider no-underline;
      @apply transition duration-200 ease-in-out;

      &:hover {
        @apply text-secondary;
      }

      @screen sm {
        @apply mx-2 text-sm;
      }
    }
    .nuxt-link-active {
      @apply text-primary no-underline;
    }
  }
}
</style>
