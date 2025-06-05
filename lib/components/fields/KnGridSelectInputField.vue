<script setup lang="ts" generic="T = any">

import { VItemGroup, VIcon, VItem, VInput, VRow, VCol, VCard, VCardText } from 'vuetify/components'

import type { DefaultSelectionOption, KnFormGridSelectField } from '@/types'
import { useKnFormField, useSelectionOptions } from '@/utils/fieldUtils'

const {fieldProps} = defineProps<{
  fieldProps: KnFormGridSelectField
}>()
const _model = defineModel<T>()
const {model, inputProps} = useKnFormField(
    _model,
    fieldProps,
    []
)

const {options} = useSelectionOptions(fieldProps)

function getBtnIcon(option: DefaultSelectionOption) {
  if (option.leftIcon) return option.leftIcon?.icon
  if (option.rightIcon) return option.rightIcon?.icon
  return undefined
}

function bindSelectedCls(cls: boolean | (string | undefined)[] | undefined, selected: boolean | undefined) {
  if (typeof cls === 'boolean' || !cls) return {}
  if (Array.isArray(cls)) return cls.reduce((prev, current) => {
    if (current) {
      prev[current] = !!selected
    }
    return prev
  }, {} as Record<string, boolean>)
}

</script>

<template>
  <v-input v-model="model" v-bind="inputProps as any">
    <v-item-group v-model="model" :selectedClass="fieldProps.selectedCls">
      <v-row dense>
        <v-col
            v-for="option in options"
            v-bind="fieldProps.inputGridSize"
            :key="`option__${option.value}`"
        >
          <v-item #default="{isSelected, selectedClass, toggle}" :value="option.value" :disabled="option.disabled">
            <v-card
                v-bind="fieldProps.cardProps"
                @click="toggle"
                :class="bindSelectedCls(selectedClass, isSelected)"
                :disabled="option.disabled"
            >
              <v-card-text class="w-100 h-100 d-flex align-center justify-center">
                <div v-text="option.label"></div>
                <v-icon v-if="getBtnIcon(option)" :icon="getBtnIcon(option)"></v-icon>
              </v-card-text>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </v-input>
</template>

<style scoped>

</style>