<template>
  <div class="container max-w-md">
    <div class="animated settings md:flex">
      <img
        class="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
        src="/img/example_user.jpg"
      />
      <div class="text-center md:text-left">
        <h2
          class="text-lg font-semibold leading-none text-secondary mt-4 md:mt-0"
        >
          Erin Lindford
        </h2>
        <div class="text-info leading-snug text-sm">Customer Support</div>
        <div class="leading-snug mt-2 text-light">erinlindford@example.com</div>
        <div class="text-light">+491 76 765-4321</div>
      </div>
      <div class="animated-slow flex justify-end ml-auto settings-icon">
        <icon name="settings-outline" />
      </div>
    </div>
    <div class="flex justify-end">
      <button class="icon">Logout <icon name="log-out-outline" /></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data: () => ({}),
}
</script>

<style lang="scss" scoped>
.settings {
  @apply bg-white cursor-pointer shadow rounded p-6 mt-3;
  .settings-icon {
    @apply opacity-0 text-info;
  }
  &:hover {
    @apply shadow-lg;

    .settings-icon {
      @apply opacity-100;
    }
  }
}
</style>
