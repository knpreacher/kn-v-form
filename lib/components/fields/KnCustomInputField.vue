<script setup lang="ts">
import { VInput } from 'vuetify/components'
import type { KnFormCustomField } from '@/types'
import { useKnFormField } from '@/utils/fieldUtils'
import SlotRenderer from '@/components/helpers/SlotRenderer.vue'

const {fieldProps} = defineProps<{
  fieldProps: KnFormCustomField
}>()
const _model = defineModel<any>()
const allData = defineModel<any>('allData')
const {model, inputProps, label, inputSlots} = useKnFormField(
    _model,
    fieldProps,
    []
)

const innerSlots = Object.entries(fieldProps.innerSlots ?? {})

</script>

<template>
  <v-input v-model="model" v-bind="inputProps as any" :label="label" v-if="fieldProps.wrapVInput">
    <component
        :is="fieldProps.component"
        v-bind="fieldProps.componentProps"
        v-model="model"
        v-model:all-data="allData"
    >
      <template
          v-for="[slotName, s] in innerSlots"
          :key="slotName" #[slotName]
      >
        <slot-renderer
            :slot-data="s"
            v-model="model"
        />
      </template>
    </component>
    <template
        v-for="[slotName, s] in inputSlots"
        :key="slotName" #[slotName]
    >
      <slot-renderer
          :slot-data="s"
          v-model="model"
      />
    </template>
  </v-input>
  <component
      v-else
      :is="fieldProps.component"
      v-bind="fieldProps.componentProps"
      v-model="model"
      v-model:all-data="allData"
  >
    <template
        v-for="[slotName, s] in innerSlots"
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