<script setup lang="ts">
import type { KnFormAnyField, KnFormGroup } from '@/types.ts'

import { VExpansionPanel, VRow, VCol } from 'vuetify/components'
import KnFormFieldWrapper from '@/components/KnFormFieldWrapper.vue'

const {fields, groupData} = defineProps<{
  groupData: KnFormGroup,
  fields: KnFormAnyField[]
}>()

const model = defineModel<Record<string, any>>({required: true})
</script>

<template>
  <v-expansion-panel static :title="groupData.label">
    <template #text>
      <v-row>
        <v-col v-for="field in fields" :key="field.name">
          <kn-form-field-wrapper
              :field-props="field"
              v-model="model[field.name]"
          />
        </v-col>
      </v-row>
    </template>
  </v-expansion-panel>
</template>

<style scoped>

</style>