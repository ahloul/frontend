<template>
  <div>
    <div v-show="!shop.components.length" class="mt-10">
      <change-type @changed="showComponent = false" />
    </div>
    <div v-if="shop.components.length">
      <div class="flex flex-wrap items-center my-3">
        <static-modal
          :show="showComponent"
          :dismiss="$t('dismiss')"
          @dismiss="showComponent = false"
        >
          <change-type @changed="showComponent = false" />
        </static-modal>
        <h1
          class="headline flex block cursor-pointer truncate"
          @click="showComponent = true"
        >
          {{ $t(`components.type.${shop.components[0]}`) }}
          <icon name="edit-outline" />
        </h1>
        <FormulateForm class="block w-full ml-auto md:max-w-sm mr-2">
          <FormulateInput
            v-if="!showEmpty"
            type="search"
            :placeholder="$t('search')"
            validation="max:100,length"
            @search="applySearch"
          />
        </FormulateForm>
      </div>
      <div class="flex">
        <n-link to="/category/create" class="ml-auto button primary icon-r"
          ><icon name="plus" /> {{ $t('add') }}</n-link
        >
      </div>
      <empty-state v-if="showEmpty" />
      <ul class="category-box">
        <li
          v-for="category in categories"
          :key="category._id"
          class="animated category-item"
          @click="goToDetail(category)"
        >
          <div class="flex items-center p-6">
            <div class="min-w-0 flex-1 flex items-center">
              <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <div class="text-xl leading-snug font-bold truncate">
                    {{ category.name }}
                  </div>
                  <div
                    class="mt-2 flex items-center text-sm leading-5 text-primary inline-block align-middle"
                  >
                    <icon name="keypad-outline" width="15" />
                    <span v-if="category.article_count" class="ml-1"
                      >{{ category.article_count }}
                      {{ $t('category.article') }}</span
                    >
                    <span v-else class="ml-1">{{ $t('article.empty') }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="right-icon text-dark">
              <icon name="chevron-right" />
            </div>
          </div>
        </li>
      </ul>
      <div class="flex justify-center">
        <n-link
          v-if="prevPage"
          :to="`?page=${prevPage}`"
          class="button icon-l mx-2"
          ><icon name="chevron-left-outline" />
          {{ $t('processes.previous') }}</n-link
        >
        <n-link
          v-if="nextPage"
          :to="`?page=${nextPage}`"
          class="button icon-r mx-2"
          >{{ $t('processes.next') }}<icon name="chevron-right-outline"
        /></n-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import StaticModal from '~/components/elements/StaticModal'
import EmptyState from '~/components/elements/EmptyState'
import ChangeType from '~/components/pageElements/category/ChangeType'
export default {
  name: 'Categories',
  middleware: 'authenticated',
  components: {
    EmptyState,
    StaticModal,
    ChangeType,
  },
  async asyncData({ $axios, query, redirect, store }) {
    try {
      const { rows, count, nextPage, prevPage } = await $axios.$get(
        '/api/categories',
        {
          params: query,
        }
      )
      return { categories: rows, showEmpty: !count, nextPage, prevPage }
    } catch (e) {
      store.commit('modal/showModal', {
        message: 'information.error_occurred',
        confirmText: 'refresh_now',
        onConfirm: () => {
          if (process.browser) location.reload()
        },
      })
      return { categories: [], showEmpty: true, nextPage: 0, prevPage: 0 }
    }
  },
  data: () => ({
    search: null,
    showComponent: false,
  }),
  watchQuery: ['page', 'search'],
  scrollToTop: true,
  computed: {
    ...mapGetters({
      shop: 'shop/shop',
    }),
  },
  methods: {
    goToDetail({ _id }) {
      this.$router.push(`/category/${_id}`)
    },
    applySearch(val) {
      this.$router.push({
        query: { ...this.$route.query, search: val, page: 1 },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.headline {
  @apply transition duration-300 ease-in-out;
  @apply text-dark;
  @apply text-4xl;
  i {
    @apply hidden;
  }
  &:hover {
    @apply text-primary;
    i {
      @apply inline-block;
    }
  }
}

.category {
  &-box {
    @apply max-w-xl mx-auto;
  }

  &-item {
    @apply text-dark my-2 block bg-white shadow rounded cursor-pointer select-none;

    &:hover {
      @apply shadow-lg;

      .right-icon {
        @apply transition ease-in-out duration-300;
        @apply text-primary;
        transform: translate(0.5em, 0);
      }
    }

    &:focus {
      @apply outline-none;
    }
  }
}
</style>
