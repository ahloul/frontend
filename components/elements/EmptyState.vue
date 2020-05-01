<template>
  <div class="flex items-center justify-center mt-8">
    <div class="text-center w-auto">
      <img :src="`/img/${image}.svg`" alt="" width="300" class="mx-auto" />
      <h3 class="text-tertiary mt-4 mb-2">{{ $t(emptyText) }}</h3>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    image: {
      type: String,
      default: 'coffee',
    },
    emptyText: {
      type: String,
      default: 'no_items',
    },
  },
  data: () => ({}),
}
</script>

<style lang="css" scoped></style>
