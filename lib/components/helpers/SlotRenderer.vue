<script setup lang="ts">
import type { KnFieldSlotData, KnFieldSlotDataObject } from '@/types.ts'
import { computed } from 'vue'
import {VIcon} from 'vuetify/components'

const props = defineProps<{
  slotData?: KnFieldSlotData | string
}>()

const model = defineModel<any | undefined>()
const allData = defineModel<Record<string, any> | undefined>('allData')

const slotData = computed<KnFieldSlotDataObject | undefined>(() => {
  if (typeof props.slotData === 'string') {
    return {
      text: props.slotData
    }
  }
  if (typeof props.slotData?.icon === 'string') {
    return {
      icon: {
        icon: props.slotData.icon
      }
    }
  }
  if (props.slotData?.computedString) {
    const result = props.slotData.computedString({
      value: model.value,
      allData: allData.value
    })
    if (result.html) {
      return {
        html: result.content
      }
    } else {
      return {
        text: result.content
      }
    }
  }
  return props.slotData as KnFieldSlotDataObject
})
</script>

<template>
  <slot v-if="!slotData"></slot>
  <v-icon v-else-if="slotData.icon" v-bind="slotData.icon" :class="slotData.cls"/>
  <div v-else-if="slotData.text" v-text="slotData.text" :class="slotData.cls"></div>
  <div v-else-if="slotData.html" v-html="slotData.html" :class="slotData.cls"></div>
  <component
      v-else-if="slotData.component"
      :is="slotData.component"
      v-bind="slotData.componentProps"
      v-model="model"
      v-model:all-data="allData"
      :class="slotData.cls"
  />
</template>

<style scoped>

</style>
