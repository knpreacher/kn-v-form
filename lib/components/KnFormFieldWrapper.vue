<script setup lang="ts" generic="DataType = any">

import type { FieldDataType, KnFormAnyField } from '@/types.ts'

import * as fields from '@/components/fields'

const {fieldProps} = defineProps<{
  fieldProps: KnFormAnyField
}>()
const model = defineModel<DataType>({required: true})

const componentMap: Partial<Record<FieldDataType, any>> = {
  string: fields.KnStringInputField,
  int: fields.KnIntInputField,
  float: fields.KnFloatInputField
}

const bindComponent = componentMap[fieldProps.type]
</script>

<template>
  <div class="kn-form-field__wrapper">
    <component :is="bindComponent" :field-props="fieldProps" v-model="model" v-if="bindComponent"/>
    <div v-else>Unknown field type {{ fieldProps.type }}</div>
  </div>
</template>

<style scoped>

</style>