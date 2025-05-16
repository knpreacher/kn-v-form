<script setup lang="ts">

import type { SubmitEventPromise } from 'vuetify/framework'

import {VForm, VExpansionPanels} from 'vuetify/components'

import type { KnFormData, KnFormFieldGroupData } from '@/types'
import KnFormFieldGroup from '@/components/KnFormFieldGroup.vue'
import { computed } from 'vue'
import { deepJoinObjects } from '@/utils/jsUtils'

const {schema} = defineProps<{
  schema: KnFormData
}>()

const model = defineModel<Record<string, any>>({required: true})

const emit = defineEmits<{
  onSubmit: [ value: SubmitEventPromise ],
  onSubmitValidated: [],
}>()

const displayGroups = computed(
    () => schema.groups.filter(
        g => g.showIf?.(model.value) ?? true
    ).map(
        g => deepJoinObjects(g, schema.groupDefaults ?? {})
    ) as KnFormFieldGroupData[]
)

function onFormSubmit(se: SubmitEventPromise) {
  emit('onSubmit', se)
  se.then(value => {
    if (value.valid) {
      emit('onSubmitValidated')
    }
  })
}
</script>

<template>
  <v-form @submit.prevent="onFormSubmit">
    <v-expansion-panels>
      <kn-form-field-group
          v-for="group in displayGroups"
          :fields="group.fields"
          :group-data="group"
          v-model="model"
      />
    </v-expansion-panels>
    <button type="submit" v-if="!schema.disableHiddenSubmit" style="display: none; position: absolute;"></button>
  </v-form>
</template>

<style scoped>

</style>