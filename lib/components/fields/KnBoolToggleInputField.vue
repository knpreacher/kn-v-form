<script setup lang="ts">

import { VBtnGroup, VBtn, VInput } from 'vuetify/components'

import type { KnFormBoolToggleField } from '@/types'
import { useKnFormField } from '@/utils/fieldUtils'
import { computed } from 'vue'

const {fieldProps} = defineProps<{
  fieldProps: KnFormBoolToggleField
}>()
const _model = defineModel<boolean>()
const {model, inputProps} = useKnFormField(
    _model,
    fieldProps,
    []
)

const buttons = computed<VBtn['$props'][]>(() => {
  const result: VBtn['$props'][] = []
  if (!fieldProps.positiveBtn) {
    result.push({
      text: '+'
    })
  } else if (typeof fieldProps.positiveBtn === 'string') {
    result.push({
      text: fieldProps.positiveBtn
    })
  } else {
    result.push(fieldProps.positiveBtn)
  }
  if (!fieldProps.negativeBtn) {
    result.push({
      text: '-'
    })
  } else if (typeof fieldProps.negativeBtn === 'string') {
    result.push({
      text: fieldProps.negativeBtn
    })
  } else {
    result.push(fieldProps.negativeBtn)
  }
  return result
})

function onBtnClick(index: number) {
  if (index === 0) {
    model.value = true
  } else {
    model.value = fieldProps.emptyAsFalse ? undefined : false
  }
}

function isActive(index: number) {
  if (index === 0) {
    return model.value
  }
  return !model.value
}

</script>

<template>
  <v-input v-model="model" v-bind="inputProps as any">
    <v-btn-group v-bind="fieldProps.btnGroupProps as any">
      <v-btn
          v-for="(btn, ind) in buttons" :key="`t__${ind}`"
          v-bind="btn"
          :active="isActive(ind)"
          @click.prevent.stop="onBtnClick(ind)"
      >

      </v-btn>
    </v-btn-group>
  </v-input>
</template>

<style scoped>

</style>