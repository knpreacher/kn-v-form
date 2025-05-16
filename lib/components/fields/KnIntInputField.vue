<script setup lang="ts">
import { VNumberInput } from 'vuetify/components'
import type { KnFormStringField } from '@/types'
import { useKnFormField } from '@/utils/fieldUtils'
import SlotRenderer from '@/components/helpers/SlotRenderer.vue'

const {fieldProps} = defineProps<{
  fieldProps: KnFormStringField
}>()
const _model = defineModel<number>()
const {model, inputProps, label, inputSlots} = useKnFormField(
    _model,
    fieldProps,
    ['append-inner', 'prepend-inner']
)

</script>

<template>
  <v-number-input
      v-model="model" v-bind="inputProps as any"
      :label="label" :precision="0"
      control-variant="hidden"
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
  </v-number-input>
</template>

<style scoped>

</style>