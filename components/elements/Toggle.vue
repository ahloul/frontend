<template>
  <div class="mt-1">
    <span
      :class="{
        'bg-grey': !isCheckedInternal,
        'bg-success': isCheckedInternal,
      }"
      class="relative inline-block flex-shrink-0 h-6 w-12 border rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
      role="checkbox"
      tabindex="0"
      :aria-checked="isCheckedInternal.toString()"
      @click="changeToggle()"
    >
      <span
        aria-hidden="true"
        :class="{
          'translate-x-5': isCheckedInternal,
          'translate-x-0': !isCheckedInternal,
        }"
        class="relative inline-block h-6 w-6 rounded-full bg-white shadow transform transition ease-in-out duration-200"
      >
        <span
          :class="{
            'opacity-0 ease-out duration-100': isCheckedInternal,
            'opacity-100 ease-in duration-200': !isCheckedInternal,
          }"
          class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
        >
          <icon name="close-outline" />
        </span>
        <span
          :class="{
            'opacity-100 ease-in duration-200': isCheckedInternal,
            'opacity-0 ease-out duration-100': !isCheckedInternal,
          }"
          class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
        >
          <icon name="checkmark-outline" fill="currentColor" width="16" />
        </span>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Toggle',
  props: {
    booleanValue: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return { isCheckedInternal: this.booleanValue }
  },
  methods: {
    changeToggle() {
      this.isCheckedInternal = !this.isCheckedInternal
      this.$emit('change', this.isCheckedInternal)
    },
  },
}
</script>

<style lang="css" scoped></style>
