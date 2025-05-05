<script setup lang="ts">
import { VTextField } from 'vuetify/components'

import type { KnFormComputedField } from '@/types.ts'
import { useKnFormField } from '@/utils/fieldUtils.ts'
import SlotRenderer from '@/components/helpers/SlotRenderer.vue'
import { computed, watch } from 'vue'

const {fieldProps} = defineProps<{
  fieldProps: KnFormComputedField
}>()
const _model = defineModel<any>()
const allData = defineModel<any>('allData')
const {model, inputProps, label, inputSlots} = useKnFormField(
    _model,
    fieldProps,
    [ 'append-inner', 'prepend-inner' ]
)

const computedValue = computed(() => fieldProps.valueGetter(allData.value))

if (fieldProps.emitToModel) {
  model.value = computedValue.value
  watch(computedValue, () => {
    model.value = computedValue.value
  }, {deep: true})
}

</script>

<template>
  <v-text-field :model-value="computedValue" v-bind="inputProps as any" :label="label" readonly :clearable="false">
    <template
        v-for="[slotName, s] in inputSlots"
        :key="slotName" #[slotName]
    >
      <slot-renderer
          :slot-data="s"
          :model-value="computedValue"
      />
    </template>
  </v-text-field>
</template>

<style scoped>

</style>