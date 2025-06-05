<script setup lang="ts" generic="T = any">

import { VBtnGroup, VBtn, VIcon, VInput } from 'vuetify/components'

import type { DefaultSelectionOption, KnFormToggleSelectField } from '@/types'
import { useKnFormField, useSelectionOptions } from '@/utils/fieldUtils'
import { isEmpty } from '@/utils/jsUtils.ts'

const {fieldProps} = defineProps<{
  fieldProps: KnFormToggleSelectField
}>()
const _model = defineModel<T>()
const {model, inputProps} = useKnFormField(
    _model,
    fieldProps,
    []
)

const {options} = useSelectionOptions(fieldProps)

function getBtnIcon(option: DefaultSelectionOption) {
  if (option.label) return undefined
  if (option.leftIcon) return option.leftIcon?.icon
  if (option.rightIcon) return option.rightIcon?.icon
  return undefined
}

function onOptionClick(option: DefaultSelectionOption) {
  model.value = option.value
}

</script>

<template>
  <v-input v-model="model" v-bind="inputProps as any">
    <v-btn-group v-bind="fieldProps.btnGroupProps as any" v-model="model">
      <v-btn
          v-for="option in options"
          v-bind="fieldProps.btnProps"
          :key="`option__${option.value}`"
          :value="option.value" :class="option.cls"
          :text="option.label"
          :prepend-icon="option.leftIcon?.icon"
          :append-icon="option.rightIcon?.icon"
          :disabled="option.disabled"
          :readonly="option.value === model"
          :active="option.value === model"
          @click.prevent.stop="onOptionClick(option)"
      >
        <template #default v-if="!option.label">
          <v-icon :icon="getBtnIcon(option)"></v-icon>
        </template>
      </v-btn>
      <v-btn v-if="fieldProps.clearable"
             @click.prevent.stop="model = undefined"
             v-bind="fieldProps.btnProps"
             :readonly="isEmpty(model)"
             :active="isEmpty(model)"
      >
        <v-icon v-if="fieldProps.clearIcon" v-bind="fieldProps.clearIcon"></v-icon>
        <span v-else>-</span>
      </v-btn>
    </v-btn-group>
  </v-input>
</template>

<style scoped>

</style>