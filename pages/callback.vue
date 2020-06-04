<template>
  <div class="min-h-screen flex flex-col justify-center">
    <div class="w-full m-auto text-center">
      <h1 class="text-2xl text-info font-bold">
        {{ $t('callback.logging_in') }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'notAuthenticated',
  name: 'Callback',
  layout: 'blank',
}
</script>
