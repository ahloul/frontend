<template>
  <div>
    <div class="flex justify-end my-3">
      <n-link to="/category/create" class="button primary icon-r"
        ><icon name="plus" /> Hinzufügen</n-link
      >
    </div>
    <empty-state />

    <ul class="category-box">
      <li class="animated category-item" @click="goToDetail">
        <div class="flex items-center p-6">
          <div class="min-w-0 flex-1 flex items-center">
            <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <div class="text-xl leading-5 font-bold truncate">
                  Getränke
                </div>
                <div
                  class="mt-2 flex items-center text-sm leading-5 text-info inline-block align-middle"
                >
                  <icon name="cube-outline" width="15" />
                  <span class="ml-1">214 Artikel</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <icon name="chevron-right" />
          </div>
        </div>
      </li>
      <!-- Example -->
      <li class="animated category-item">
        <div class="flex items-center p-6">
          <div class="min-w-0 flex-1 flex items-center">
            <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <div class="text-xl leading-5 font-bold truncate">
                  Lebensmittel
                </div>
                <div
                  class="mt-2 flex items-center text-sm leading-5 text-info inline-block align-middle"
                >
                  <icon name="cube-outline" width="15" />
                  <span class="ml-1">911 Artikel</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <icon name="chevron-right" />
          </div>
        </div>
      </li>
      <li class="animated category-item">
        <div class="flex items-center p-6">
          <div class="min-w-0 flex-1 flex items-center">
            <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <div class="text-xl leading-5 font-bold truncate">
                  Textilwaren
                </div>
                <div
                  class="mt-2 flex items-center text-sm leading-5 text-info inline-block align-middle"
                >
                  <icon name="cube-outline" width="15" />
                  <span class="ml-1">154 Artikel</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <icon name="chevron-right" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import EmptyState from '~/components/elements/EmptyState'
export default {
  name: 'Categories',
  components: {
    EmptyState,
  },
  methods: {
    goToDetail() {
      this.$router.push('/category')
    },
  },
}
</script>

<style lang="scss" scoped>
.category {
  &-box {
    @apply max-w-md mx-auto;
  }

  &-item {
    @apply text-primary my-2 block bg-white shadow rounded cursor-pointer select-none;

    &:hover {
      @apply shadow-lg;
    }

    &:focus {
      @apply outline-none;
    }
  }
}
</style>
