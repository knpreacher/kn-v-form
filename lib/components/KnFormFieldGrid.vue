<script setup lang="ts">
import type { KnFormAnyField, KnFormGroup } from '@/types'
import {VRow, VCol} from 'vuetify/components'
import KnFormFieldWrapper from '@/components/KnFormFieldWrapper.vue'
import { getItemGridProps } from '@/utils/gridUtils'
import { computed } from 'vue'
import { deepJoinObjects } from '@/utils/jsUtils'

const {fields, groupData} = defineProps<{
  groupData: KnFormGroup,
  fields: KnFormAnyField[]
}>()

const model = defineModel<Record<string, any>>({required: true})

const displayFields = computed(
    () => fields.filter(
        f => f.showIf ? f.showIf(model.value) : true
    ).map(
        f => deepJoinObjects(groupData.fieldDefaults ?? {}, f)
    ) as KnFormAnyField[]
)

</script>

<template>
  <v-row v-bind="groupData.rowOptions">
    <v-col
        v-for="field in displayFields"
        :key="field.name"
        v-bind="getItemGridProps(groupData.gridSize, field.gridSize)"
    >
      <kn-form-field-wrapper
          :field-props="field"
          v-model="model[field.name]"
          v-model:all-data="model"
      />
    </v-col>
  </v-row>
</template>

<style scoped>

</style>