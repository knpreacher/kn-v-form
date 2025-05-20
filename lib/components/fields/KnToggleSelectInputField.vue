<script setup lang="ts" generic="T = any">

import { VBtnToggle, VBtn } from 'vuetify/components'

import type { DefaultSelectionOption, KnFormToggleSelectField } from '@/types'
import { useKnFormField } from '@/utils/fieldUtils'
import { IconValue } from 'vuetify/composables/icons'

const {fieldProps} = defineProps<{
  fieldProps: KnFormToggleSelectField
}>()
const _model = defineModel<T>()
const {model, inputProps} = useKnFormField(
    _model,
    fieldProps,
    []
)

function getBtnIcon(option: DefaultSelectionOption) {
  if (option.label) return undefined
  if (option.leftIcon) return option.leftIcon
  if (option.rightIcon) return option.rightIcon
  return undefined
}

function onOptionClick(option: DefaultSelectionOption) {
  model.value = option.value
}

</script>

<template>
  <v-btn-toggle v-bind="inputProps as any" v-model="model">
    <v-btn
        v-for="option in fieldProps.options"
        v-bind="fieldProps.btnProps"
        :key="`option__${option.value}`"
        :value="option.value" :class="option.cls"
        :text="option.label"
        :icon="getBtnIcon(option) as any"
        :prepend-icon="option.leftIcon as any"
        :append-icon="option.rightIcon as any"
        :disabled="option.disabled"
        :readonly="option.value === model"
        @click="onOptionClick(option)"
    >

    </v-btn>
  </v-btn-toggle>
</template>

<style scoped>

</style>