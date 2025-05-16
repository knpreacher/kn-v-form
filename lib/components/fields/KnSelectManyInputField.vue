<script setup lang="ts" generic="T = any">

import { type VListItem, VSelect } from 'vuetify/components'

import type { DefaultSelectionOption, KnFormSelectManyField } from '@/types'
import { useKnFormField } from '@/utils/fieldUtils'
import SlotRenderer from '@/components/helpers/SlotRenderer.vue'

const {fieldProps} = defineProps<{
  fieldProps: KnFormSelectManyField
}>()
const _model = defineModel<T[]>()
const {model, inputProps, label, inputSlots} = useKnFormField(
    _model,
    fieldProps,
    [ 'append-inner', 'prepend-inner' ]
)

function getItemProps(item: DefaultSelectionOption): VListItem['$props'] {
  return {
    disabled: item.disabled
  }
}

</script>

<template>
  <v-select
      v-model="model"
      v-bind="inputProps as any"
      :label="label"
      :items="fieldProps.options"
      item-title="label"
      item-value="value"
      :item-props="getItemProps"
      multiple
  >
    <template
        v-for="[slotName, s] in inputSlots"
        :key="slotName" #[slotName]
    >
      <slot-renderer
          :slot-data="s"
          v-model="model"
      />
    </template>
  </v-select>
</template>

<style scoped>

</style>