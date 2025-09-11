<script setup lang="ts">
import { VMaskInput } from 'vuetify/labs/VMaskInput'
import type { KnFormTimeField } from '@/types'
import { useKnFormField } from '@/utils/fieldUtils'
import SlotRenderer from '@/components/helpers/SlotRenderer.vue'
import { computed } from 'vue'

// import { format, parse } from 'date-fns'
const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/

const { fieldProps } = defineProps<{
  fieldProps: KnFormTimeField
}>()
const _model = defineModel<string | Date | number>()
const { model, inputProps, label, inputSlots } = useKnFormField(
  _model,
  fieldProps,
  [ 'append-inner', 'prepend-inner' ]
)

const timeModel = computed({
  get: () => {
    const _v = model.value
    if (typeof _v === 'string' && timeRegex.test(_v)) {
      return _v
    }
    return undefined
  },
  set: (_v) => {
    if (typeof _v === 'string' && timeRegex.test(_v)) {
      model.value = _v
    } else {
      model.value = undefined
    }

  }
})

const bindProps = {
  ...inputProps
}

const mask = computed(
  () => fieldProps.seconds ? '##:##:##' : '##:##'
)

</script>

<template>
  <v-mask-input v-model="timeModel" return-masked-value v-bind="bindProps as any" :mask="mask" :label="label">
    <template
      v-for="[slotName, s] in inputSlots"
      :key="slotName" #[slotName]
    >
      <slot-renderer
        :slot-data="s"
        v-model="model"
      />
    </template>
  </v-mask-input>
</template>

<style scoped>

</style>