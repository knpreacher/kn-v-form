<script setup lang="ts">
import { VTextField } from 'vuetify/components'
import type { KnFormStringField } from '@/types'
import { useKnFormField } from '@/utils/fieldUtils'
import SlotRenderer from '@/components/helpers/SlotRenderer.vue'
import { computed } from 'vue'

const { fieldProps } = defineProps<{
  fieldProps: KnFormStringField
}>()
const _model = defineModel<number>()
const { model, inputProps, label, inputSlots } = useKnFormField(
  _model,
  fieldProps,
  [ 'append-inner', 'prepend-inner' ]
)

const numberModel = computed({
  get() {
    if (typeof model.value === 'number') {
      return model.value
    }
    const n = Number(model.value)
    if (!isFinite(n)) {
      return undefined
    }
    return n
  },
  set(value) {
    if (!value) {
      model.value = undefined
      return
    }
    const _v = Number(value)
    if (Number.isInteger(_v)) {
      model.value = _v
    } else {
      model.value = Math.round(_v)
    }
  }
})

</script>

<template>
  <v-text-field
    v-model="numberModel" v-bind="inputProps as any"
    :label="label" type="number" hide-spin-buttons
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
  </v-text-field>
</template>

<style scoped>

</style>