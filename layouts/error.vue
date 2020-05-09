<template>
  <div class="min-h-screen flex flex-col justify-center bg-primary">
    <div class="w-full m-auto text-center">
      <h1 class="text-3xl text-tertiary font-bold">
        {{ error.statusCode }}
      </h1>
      <h3 class="text-info mb-3">{{ error.message }}</h3>
      <n-link to="/" class="hover:text-white hover:no-underline">
        {{ $t('back_to_start') }}
      </n-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
  layout: 'blank',
}
</script>
