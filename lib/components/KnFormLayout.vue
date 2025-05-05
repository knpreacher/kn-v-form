<script setup lang="ts">

import { VForm, VExpansionPanels } from 'vuetify/components'

import type { KnFormData, KnFormFieldGroupData } from '@/types.ts'
// import KnFormFieldWrapper from '@/components/KnFormFieldWrapper.vue'
import KnFormFieldGroup from '@/components/KnFormFieldGroup.vue'
import { computed } from 'vue'
import { deepJoinObjects } from '@/utils/jsUtils.ts'

const {schema} = defineProps<{
  schema: KnFormData
}>()

const model = defineModel<Record<string, any>>({required: true})

const displayGroups = computed(
    () => schema.groups.filter(
        g=>g.showIf?.(model.value) ?? true
    ).map(
        g=>deepJoinObjects(g, schema.groupDefaults ?? {})
    ) as KnFormFieldGroupData[]
)
</script>

<template>
  <v-form>
    <v-expansion-panels>
      <kn-form-field-group
          v-for="group in displayGroups"
          :fields="group.fields"
          :group-data="group"
          v-model="model"
      />
    </v-expansion-panels>
  </v-form>
</template>

<style scoped>

</style>