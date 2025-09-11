<script setup lang="ts">
import { VMaskInput } from 'vuetify/labs/VMaskInput'
import { VDatePicker, VMenu, VBtn } from 'vuetify/components'
import type { KnFormDatetimeField } from '@/types'
import { useKnFormField } from '@/utils/fieldUtils'
import SlotRenderer from '@/components/helpers/SlotRenderer.vue'
import { computed } from 'vue'

import { format, parse } from 'date-fns'

const { fieldProps } = defineProps<{
  fieldProps: KnFormDatetimeField
}>()
const _model = defineModel<string | Date | number>()
const { model, inputProps, label, inputSlots } = useKnFormField(
  _model,
  fieldProps,
  [ 'append-inner', 'prepend-inner' ]
)

const tokenPatterns = [
  { pattern: 'yyyy', replacement: '####' },
  { pattern: 'YYYY', replacement: '####' },
  { pattern: 'yy', replacement: '##' },
  { pattern: 'YY', replacement: '##' },
  { pattern: 'MM', replacement: '##' },
  { pattern: 'dd', replacement: '##' },
  { pattern: 'DD', replacement: '##' },
  { pattern: 'HH', replacement: '##' },
  { pattern: 'hh', replacement: '##' },
  { pattern: 'mm', replacement: '##' },
  { pattern: 'ss', replacement: '##' },
  { pattern: 'M', replacement: '##' },   // single character tokens last
  { pattern: 'd', replacement: '##' },
  { pattern: 'D', replacement: '##' },
  { pattern: 'H', replacement: '##' },
  { pattern: 'h', replacement: '##' },
  { pattern: 'm', replacement: '##' },
  { pattern: 's', replacement: '##' }
]

function getDateMaskAdvanced(format: string) {


  let mask = format

  // Replace tokens in order (longest first)
  tokenPatterns.forEach(({ pattern, replacement }) => {
    mask = mask.split(pattern).join(replacement)
  })

  return mask
}

const DEFAULT_FORMAT = 'dd.MM.yyyy'

const valueTypeFormat = computed(() => fieldProps.valueType ?? 'string')
const dateFormat = fieldProps.format ?? DEFAULT_FORMAT

const mask = getDateMaskAdvanced(dateFormat)

// if (Number.isNaN(parse(model.value as string, dateFormat, new Date()).valueOf())) {
//   model.value = undefined
// }

const dateModel = computed({
  get: () => {
    if (!model.value) return undefined
    switch (valueTypeFormat.value) {
      case 'date':
        return model.value
      case 'string':
      case 'iso':
        return parse(model.value as string, dateFormat, new Date())
        // return parseISO(model.value as string)
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
      case 'iso':
        model.value = format(value as Date, dateFormat)
        break
      // case 'iso':
      //   model.value = formatISO(value as Date)
      //   break
      case 'timestamp':
        model.value = (value as Date).getTime()
        break
    }
  }
})


const bindProps = {
  placeholder: dateFormat,
  mask,
  ...inputProps
}

function onBlur() {
  if (model.value && Number.isNaN(parse(model.value as string, dateFormat, new Date()).valueOf())) {
    model.value = undefined
  }
}

</script>

<template>
  <v-mask-input
    v-model="model"
    return-masked-value
    v-bind="bindProps as any"
    :label="label"
    @blur="onBlur"
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
    <template #prepend-inner>
      <v-btn icon="calendar" flat variant="text">
        <v-menu activator="parent" :close-on-content-click="false">
          <v-date-picker v-model="dateModel"
                         show-adjacent-months
                         hide-title hide-header
                         :first-day-of-week="1"
          >

          </v-date-picker>
        </v-menu>
      </v-btn>
    </template>
  </v-mask-input>
</template>

<style scoped>

</style>