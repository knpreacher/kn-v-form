<script setup lang="ts">
import type { KnFormAnyField, KnFormGroup } from '@/types'
import { VExpansionPanel } from 'vuetify/components'
import KnFormFieldGrid from '@/components/KnFormFieldGrid.vue'

const {fields, groupData} = defineProps<{
  groupData: KnFormGroup,
  fields: KnFormAnyField[]
}>()

const model = defineModel<Record<string, any>>({required: true})

</script>

<template>
  <v-expansion-panel static :title="groupData.label" v-if="groupData.expandable">
    <template #text>
      <kn-form-field-grid
          :fields="fields"
          :group-data="groupData"
          v-model="model"
      />
    </template>
  </v-expansion-panel>
  <div v-else class="kn-form-field-group">
    <div class="kn-form-field-group__header" v-if="groupData.label">
      <div class="kn-form-field-group__label" v-text="groupData.label"></div>
    </div>
    <kn-form-field-grid
        :fields="fields"
        :group-data="groupData"
        v-model="model"
    />
  </div>
</template>

<style scoped>
</style>