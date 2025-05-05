<script setup lang="ts">
import { VSlider } from 'vuetify/components'

const model = defineModel<number>()
const allData = defineModel('allData')
const {sliderProps} = defineProps<{
  sliderProps?: Partial<VSlider['$props']>
}>()
</script>

<template>
  <div>
    <v-slider v-bind="sliderProps" v-model="allData.age"></v-slider>
  </div>
</template>

<style scoped>

</style>