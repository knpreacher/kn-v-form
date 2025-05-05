<script setup lang="ts" generic="DataType = any">

import type { FieldDataType, KnFormAnyField } from '@/types.ts'

import * as fields from '@/components/fields'
import SlotRenderer from '@/components/helpers/SlotRenderer.vue'

import { VSpacer } from 'vuetify/components'

const {fieldProps} = defineProps<{
  fieldProps: KnFormAnyField
}>()
const model = defineModel<DataType>({required: true})
const allData = defineModel('allData')

const componentMap: Partial<Record<FieldDataType, any>> = {
  computed: fields.KnComputedInputField,
  custom: fields.KnCustomInputField,
  string: fields.KnStringInputField,
  int: fields.KnIntInputField,
  float: fields.KnFloatInputField,
  select: fields.KnSelectInputField,
  select_many: fields.KnSelectManyInputField
}

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
  </div>
</template>
