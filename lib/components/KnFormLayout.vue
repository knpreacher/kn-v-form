<script setup lang="ts">

import { VForm, VExpansionPanels } from 'vuetify/components'

import type { KnFormData } from '@/types.ts'
// import KnFormFieldWrapper from '@/components/KnFormFieldWrapper.vue'
import KnFormFieldGroup from '@/components/KnFormFieldGroup.vue'

defineProps<{
  schema: KnFormData
}>()

const model = defineModel<Record<string, any>>({required: true})
</script>

<template>
  <v-form>
    <v-expansion-panels>
      <kn-form-field-group
          v-for="group in schema.groups"
          :fields="group.fields"
          :group-data="group"
          v-model="model"
      />
    </v-expansion-panels>
  </v-form>
</template>

<style scoped>

</style>