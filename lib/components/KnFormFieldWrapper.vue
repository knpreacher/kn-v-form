<script setup lang="ts" generic="DataType = any">

import type { KnFormAnyField } from '@/types'

import SlotRenderer from '@/components/helpers/SlotRenderer.vue'

import { VSpacer, VTooltip } from 'vuetify/components'
import { componentMap } from '@/utils/componentTypeMap'
import { computed } from 'vue'

const {fieldProps} = defineProps<{
  fieldProps: KnFormAnyField
}>()
const model = defineModel<DataType>({required: true})
const allData = defineModel('allData')

const bindComponent = componentMap[fieldProps.type]

const fieldSlots = fieldProps.slots ?? {}

const useOutLabelTooltip = computed<boolean>(() => {
  if (typeof fieldProps.outLabelTooltip === 'undefined') {
    return false
  }
  if (typeof fieldProps.outLabelTooltip === 'boolean') {
    return fieldProps.outLabelTooltip
  }
  if (!!fieldProps.outLabelTooltip?.call) {
    return fieldProps.outLabelTooltip(fieldProps.label)
  }
  return false
})
</script>

<template>
  <div class="kn-form-field__wrapper" :class="{'kn-form-field__wrapper_inline': fieldProps.inlineOutLabel}">
    <slot-renderer :slot-data="fieldSlots.header" v-if="fieldProps.outLabel">
      <div class="kn-form-field__header">
        <slot-renderer :slot-data="fieldSlots.header_before_label"/>
        <v-tooltip :text="fieldProps.label" :disabled="!useOutLabelTooltip" location="center">
          <template #activator="{props}">
            <div class="kn-form-field__label" v-bind="props" v-text="fieldProps.label"></div>
          </template>
        </v-tooltip>
        <slot-renderer :slot-data="fieldSlots.header_after_label"/>
        <v-spacer/>
        <slot-renderer :slot-data="fieldSlots.header_side"/>
      </div>
    </slot-renderer>
    <v-spacer v-if="fieldProps.inlineOutLabel"/>
    <div class="kn-form-field__inner">
      <component
          :is="bindComponent" :field-props="fieldProps"
          v-model="model" v-model:all-data="allData"
          v-if="bindComponent"
      />
      <div v-else>Unknown field type {{ fieldProps.type }}</div>
    </div>
    <slot-renderer :slot-data="fieldSlots.footer">
      <div class="kn-form-field__footer"></div>
    </slot-renderer>
  </div>
</template>
