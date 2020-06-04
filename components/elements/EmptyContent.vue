<template>
  <div
    class="animated flex content-center flex-wrap justify-center h-full text-center w-full border-2 border-dark rounded-lg border-dashed text-warning mb-4"
    :class="[
      route || emit
        ? 'cursor-pointer hover:border-warning hover:text-warning'
        : '',
    ]"
    @click="action"
  >
    <div class="p-4">{{ content }}<slot /></div>
  </div>
</template>

<script>
export default {
  name: 'EmptyContent',
  props: {
    content: {
      type: String,
      default: null,
    },
    route: {
      type: String,
      default: null,
    },
    emit: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    action() {
      if (this.route) {
        this.$router.push(this.route)
      }
      if (this.emit) {
        this.$emit('action')
      }
    },
  },
}
</script>

<style lang="css" scoped></style>
