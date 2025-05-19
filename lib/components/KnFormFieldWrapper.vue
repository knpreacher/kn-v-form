<script setup lang="ts" generic="DataType = any">

import type { KnFormAnyField } from '@/types'

import SlotRenderer from '@/components/helpers/SlotRenderer.vue'

import { VSpacer } from 'vuetify/components'
import { componentMap } from '@/utils/componentTypeMap'

const {fieldProps} = defineProps<{
  fieldProps: KnFormAnyField
}>()
const model = defineModel<DataType>({required: true})
const allData = defineModel('allData')

const bindComponent = componentMap[fieldProps.type]

const fieldSlots = fieldProps.slots ?? {}
</script>

<template>
  <div class="kn-form-field__wrapper">
    <slot-renderer :slot-data="fieldSlots.header" v-if="fieldProps.outLabel">
      <div class="kn-form-field__header">
        <slot-renderer :slot-data="fieldSlots.header_before_label"/>
        <div class="kn-form-field__label" v-text="fieldProps.label"></div>
        <slot-renderer :slot-data="fieldSlots.header_after_label"/>
        <v-spacer/>
        <slot-renderer :slot-data="fieldSlots.header_side"/>
      </div>
    </slot-renderer>
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
