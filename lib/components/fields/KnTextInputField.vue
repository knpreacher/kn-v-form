<script setup lang="ts">
import { VTextarea } from 'vuetify/components'
import type { KnFormTextField } from '@/types'
import { useKnFormField } from '@/utils/fieldUtils'
import SlotRenderer from '@/components/helpers/SlotRenderer.vue'

const {fieldProps} = defineProps<{
  fieldProps: KnFormTextField
}>()
const _model = defineModel<string>()
const {model, inputProps, label, inputSlots} = useKnFormField(
    _model,
    fieldProps,
    [ 'append-inner', 'prepend-inner' ]
)

</script>

<template>
  <v-textarea v-model="model" v-bind="inputProps as any" :label="label">
    <template
        v-for="[slotName, s] in inputSlots"
        :key="slotName" #[slotName]
    >
      <slot-renderer
          :slot-data="s"
          v-model="model"
      />
    </template>
  </v-textarea>
</template>

<style scoped>

</style>