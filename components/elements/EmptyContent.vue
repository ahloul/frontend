<template>
  <div
    class="animated flex content-center flex-wrap justify-center h-full text-center w-full border-2 rounded-lg border-dashed text-dark mb-4"
    :class="{ 'cursor-pointer hover:border-light hover:text-light': route }"
    @click="goToRoute"
  >
    <div class="p-4">{{ content }}</div>
  </div>
</template>

<script>
export default {
  name: 'EmptyContent',
  props: {
    content: {
      type: String,
      default: 'Kein Content vorhanden',
    },
    route: {
      type: String,
      default: null,
    },
  },
  methods: {
    goToRoute() {
      if (!this.route) return
      this.$router.push(this.route)
    },
  },
}
</script>

<style lang="css" scoped></style>
