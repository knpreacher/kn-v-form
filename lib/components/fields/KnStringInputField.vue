<script setup lang="ts">
import { VTextField } from 'vuetify/components'
import { VMaskInput } from 'vuetify/labs/VMaskInput'
import type { KnFormStringField } from '@/types'
import { useKnFormField } from '@/utils/fieldUtils'
import SlotRenderer from '@/components/helpers/SlotRenderer.vue'

const {fieldProps} = defineProps<{
  fieldProps: KnFormStringField
}>()
const _model = defineModel<string>()
const {model, inputProps, label, inputSlots} = useKnFormField(
    _model,
    fieldProps,
    [ 'append-inner', 'prepend-inner' ]
)

const isMaskUsed = !!fieldProps.mask

const bindComponent = isMaskUsed ? VMaskInput : VTextField

const bindProps = {
  ...inputProps,
  mask: fieldProps.mask
}

</script>

<template>
  <component :is="bindComponent" v-model="model" v-bind="bindProps as any" :label="label">
    <template
        v-for="[slotName, s] in inputSlots"
        :key="slotName" #[slotName]
    >
      <slot-renderer
          :slot-data="s"
          v-model="model"
      />
    </template>
  </component>
</template>

<style scoped>

</style>