<script setup lang="ts" generic="T extends {} = {}">
defineProps<{
  bindProps: T
}>()

defineSlots<{
  default: (props: T) => any
}>()
</script>

<template>
  <slot v-bind="bindProps"></slot>
</template>

<style scoped>

</style>