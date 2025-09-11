<script setup lang="ts">

import { VSwitch } from 'vuetify/components'

import type { KnFormSwitchField } from '@/types'
import { useKnFormField } from '@/utils/fieldUtils'
import SlotRenderer from '@/components/helpers/SlotRenderer.vue'

const { fieldProps } = defineProps<{
  fieldProps: KnFormSwitchField
}>()
const _model = defineModel<boolean>()
const { model, inputProps, label, inputSlots } = useKnFormField(
  _model,
  fieldProps,
  [ 'append', 'prepend' ]
)

</script>

<template>
  <v-switch v-model="model" v-bind="inputProps as any" :label="label">
    <template
      v-for="[slotName, s] in inputSlots"
      :key="slotName" #[slotName]
    >
      <slot-renderer
        :slot-data="s"
        v-model="model"
      />
    </template>
  </v-switch>
</template>

<style scoped>

</style>