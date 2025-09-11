<script setup lang="ts">
import { VDateInput } from 'vuetify/labs/VDateInput'
import type { KnFormDateField } from '@/types'
import { useKnFormField } from '@/utils/fieldUtils'
import SlotRenderer from '@/components/helpers/SlotRenderer.vue'
import { computed } from 'vue'

import { format, parse } from 'date-fns'

const { fieldProps } = defineProps<{
  fieldProps: KnFormDateField
}>()
const _model = defineModel<string | Date | number>()
const { model, inputProps, label, inputSlots } = useKnFormField(
  _model,
  fieldProps,
  [ 'append-inner', 'prepend-inner' ]
)

const DEFAULT_FORMAT = 'dd.MM.yyyy'

const valueTypeFormat = computed(() => fieldProps.valueType ?? 'string')
const dateFormat = fieldProps.format ?? DEFAULT_FORMAT

if (model.value && Number.isNaN(parse(model.value as string, dateFormat, new Date()).valueOf())) {
  model.value = undefined
}

const dateModel = computed({
  get: () => {
    if (!model.value) return undefined
    switch (valueTypeFormat.value) {
      case 'date':
        return model.value
      case 'string':
        return parse(model.value as string, dateFormat, new Date())
      case 'timestamp':
        return new Date(model.value as number)
    }

  },
  set: (value) => {
    if (!(value instanceof Date)) {
      model.value = undefined
    }
    switch (valueTypeFormat.value) {
      case 'date':
        model.value = value
        break
      case 'string':
        model.value = format(value as Date, dateFormat)
        break
      case 'timestamp':
        model.value = (value as Date).getTime()
        break
    }
  }
})


const bindProps = {
  prependIcon: null,
  // displayFormat: fieldProps.format ?? DEFAULT_FORMAT,
  inputFormat: dateFormat,
  firstDayOfWeek: 1,
  ...inputProps
}

</script>

<template>
  <v-date-input v-model="dateModel" v-bind="bindProps as any" :label="label">
    <template
      v-for="[slotName, s] in inputSlots"
      :key="slotName" #[slotName]
    >
      <slot-renderer
        :slot-data="s"
        v-model="model"
      />
    </template>
  </v-date-input>
</template>

<style scoped>

</style>