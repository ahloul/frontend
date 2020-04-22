<template>
  <div
    class="p-2 bg-primary items-center text-white leading-none rounded md:rounded-full flex md:inline-flex hover:bg-info transition duration-150 ease-in-out cursor-pointer"
    role="alert"
  >
    <span
      v-if="pill"
      class="flex rounded-full bg-info uppercase px-2 py-1 text-xs font-bold"
      >{{ pill }}</span
    >
    <span class="ml-2 text-left flex-auto"><slot /></span>
    <icon name="arrow-ios-forward-outline" class="ml-2" />
  </div>
</template>

<script>
export default {
  name: 'Notification',

  props: {
    // Optional pill element if exist
    pill: {
      type: String,
      default: null,
    },
  },
  data: () => ({}),
}
</script>

<style lang="css" scoped></style>
